document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatArea = document.getElementById('chatArea');

    if(userInput.trim() === '') return;

    chatArea.innerHTML += `<div style="clear: both;"><div class="userMessage">User: ${userInput}</div></div>`;

    const url = 'https://hngxgdvlhrpucxqq2wrcrdqv4e0ycemc.lambda-url.ap-northeast-1.on.aws/';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: userInput })
        });

        const data = await response.json();
        chatArea.innerHTML += `<div style="clear: both;"><div class="assistantMessage">Assistant: ${data.message}</div></div>`;

    } catch (error) {
        console.error('Error:', error);
    }

    document.getElementById('userInput').value = '';
}
