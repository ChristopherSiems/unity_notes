// Extract all text from the page
function extractPageText() {
  return document.body.innerText;
}

// Chunk text into smaller pieces
function chunkText(text, maxLength = 1000) {
  const chunks = [];
  let start = 0;
  
  while (start < text.length) {
    let end = start + maxLength;
    if (end < text.length) {
      const lastPeriod = text.lastIndexOf('.', end);
      if (lastPeriod > start) end = lastPeriod + 1;
    }
    chunks.push(text.substring(start, end).trim());
    start = end;
  }
  
  return chunks;
}

// Highlight facts
function highlightFacts(facts) {
  facts.forEach(fact => {
    const regex = new RegExp(fact.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodesToReplace = [];
    
    let node;
    while (node = walker.nextNode()) {
      if (regex.test(node.textContent)) {
        nodesToReplace.push(node);
      }
    }
    
    nodesToReplace.forEach(node => {
      const span = document.createElement('span');
      span.innerHTML = node.textContent.replace(regex, '<mark style="background: yellow;">$&</mark>');
      node.parentNode.replaceChild(span, node);
    });
  });
}

// Process page
async function processPage() {
  console.log('[Content] Processing page...');
  
  const text = extractPageText();
  console.log(`[Content] Extracted ${text.length} characters`);
  
  const chunks = chunkText(text);
  console.log(`[Content] Created ${chunks.length} chunks`);
  
  console.log('[Content] Sending to background...');
  const response = await chrome.runtime.sendMessage({
    type: 'IDENTIFY_FACTS',
    chunks: chunks
  });
  
  console.log('[Content] Received response:', response);
  
  if (response?.facts) {
    console.log(`[Content] Highlighting ${response.facts.length} facts`);
    highlightFacts(response.facts);
    console.log('[Content] Highlighting complete');
  } else {
    console.log('[Content] No facts to highlight');
  }
  
}



// Run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', processPage);
} else {
  processPage();
}

