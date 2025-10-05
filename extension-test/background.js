// ============================================
// background.js - FACT HIGHLIGHTER
// ============================================


// Handle messages
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'OFFSCREEN_READY') {
    console.log('[Background] Offscreen document ready');
    return false;
  }
  
  if (msg.type === 'MODEL_PROGRESS') {
    // Just log, don't respond
    return false;
  }
  
  if (msg.type === 'IDENTIFY_FACTS') {
    handleFactIdentification(msg.chunks, sendResponse);
    return true;
  }
});


async function handleFactIdentification(chunks, sendResponse) {
  try {
    console.log(`[Background] Received ${chunks.length} chunks to process`);
    
    const allFacts = [];
    const fullText = chunks.join(' ');
    const words = fullText.split(/\s+/);
    
    const chunkSize = 300;
    const numChunks = Math.ceil(words.length / chunkSize);
    
    console.log(`[Background] Processing ${numChunks} chunks...`);
    
    const GEMINI_API_KEY = 'AIzaSyDr0dv87_vdD2KlQO5OoAHtgTyrsZY7oz4';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    for (let i = 0; i < numChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, words.length);
      const chunkWords = words.slice(start, end).join(' ');
      
      const prompt = `You are a statement parser. 
Your role is to take text and return all statements from that text which could be defended with evidence. 
The facts should be taken word for word from the text. 
Do not return facts which are not exactly in the text.
Return exact statements from the text as a JSON array. 

Process this text:
${chunkWords}

Return format: ["fact 1", "fact 2", "fact 3", ...]`;
      
      try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 500 }
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          
          let facts = [];
          try {
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            if (jsonMatch) facts = JSON.parse(jsonMatch[0]);
          } catch (e) {
            facts = text.split('\n')
              .map(line => line.replace(/^[-•*\d.)\s"]+/, '').replace(/["]+$/, '').trim())
              .filter(f => f.length > 20 && f.length < 200);
          }
          
          const verifiedFacts = facts.filter(fact => 
            chunkWords.toLowerCase().includes(fact.toLowerCase().substring(0, 30))
          );
          
          allFacts.push(...verifiedFacts);
        }
      } catch (err) {
        console.error(`[Background] Error chunk ${i + 1}:`, err);
      }
    }
    
    console.log(`[Background] Total: ${allFacts.length} facts`);
    sendResponse({ facts: allFacts });
  } catch (err) {
    console.error('[Background] Error:', err);
    sendResponse({ facts: [] });
  }
}

