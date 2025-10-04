const inputText = document.getElementById('inputText');
const defineBtn = document.getElementById('defineBtn');
const resultDiv = document.getElementById('result');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const statusDiv = document.getElementById('status');

// Listen for progress updates
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "MODEL_PROGRESS" && msg.progress) {
    updateProgress(msg.progress);
  }
});

function updateProgress(progress) {
  if (progress.progress > 0) {
    progressBar.classList.add('visible');
    progressFill.style.width = progress.progress + '%';
    statusDiv.textContent = progress.status || 'Loading model...';
  }
  
  if (progress.progress >= 100) {
    setTimeout(() => {
      progressBar.classList.remove('visible');
      statusDiv.textContent = 'Model ready!';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 2000);
    }, 500);
  }
}

defineBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();
  
  if (!text) {
    showResult('Please enter some text to define.', true);
    return;
  }
  
  if (text.length > 200) {
    showResult('Text too long. Please keep it under 200 characters.', true);
    return;
  }
  
  defineBtn.disabled = true;
  defineBtn.textContent = 'Generating...';
  showResult('Generating definition...', false, true);
  
  chrome.runtime.sendMessage({
    type: "GET_DEFINITION",
    text: text
  }, (response) => {
    defineBtn.disabled = false;
    defineBtn.textContent = 'Define Text';
    
    if (!response) {
      showResult('Error: No response received', true);
      return;
    }
    
    if (response.error) {
      showResult(`Error: ${response.error}`, true);
    } else {
      showResult(response.response, false);
    }
  });
});

function showResult(text, isError = false, isLoading = false) {
  resultDiv.classList.add('visible');
  resultDiv.textContent = text;
  resultDiv.className = 'visible' + (isError ? ' error' : '') + (isLoading ? ' loading' : '');
}

// Initialize model on popup open
chrome.runtime.sendMessage({ type: "INIT_MODEL" }, (response) => {
  if (response && response.error) {
    console.error('Failed to initialize model:', response.error);
  }
});