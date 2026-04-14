function setPrompt(text) {
    document.getElementById("termInput").value = text;
    sendMessage();
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const userText = input.value.trim();
    if (!userText) return;

    chatBox.innerHTML += `<div class="user-msg">🧑 ${userText}</div>`;
    input.value = "";

    try {
        const response = await fetch(
            `https://9j65ujd57j.execute-api.us-east-1.amazonaws.com/prod/ai-explain?term=${encodeURIComponent(userText)}`
        );

        const data = await response.json();
        console.log("API DATA:", data);

        chatBox.innerHTML += `<div class="bot-msg">🤖 ${data.aiExplanation}</div>`;
    } catch (error) {
        console.error(error);
        chatBox.innerHTML += `<div class="bot-msg">⚠️ Failed to fetch</div>`;
    }
}