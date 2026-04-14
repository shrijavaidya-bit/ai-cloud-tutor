window.onload = function () {
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
        document.getElementById("chatBox").innerHTML = savedChats;
    }
};
async function sendMessage() {
    const input = document.getElementById("termInput");
    const question = input.value.trim();
    if (!question) return;

    const chatBox = document.getElementById("chatBox");

    chatBox.innerHTML += `<div class="user-msg">🧑 ${question}</div>`;
    input.value = "";

    chatBox.innerHTML += `<div class="ai-msg" id="loadingMsg">🤖 Thinking...</div>`;

    try {
        const response = await fetch(
            "https://9j65ujd57j.execute-api.us-east-1.amazonaws.com/prod/ai-explain?term=" +
            encodeURIComponent(question)
        );

        const result = await response.json();
        const data = result;

        document.getElementById("loadingMsg")?.remove();

        chatBox.innerHTML += `<div class="ai-msg">🤖 ${
            data.aiExplanation || data.error || "No response"
        }</div>`;
    } catch (error) {
        document.getElementById("loadingMsg")?.remove();
        chatBox.innerHTML += `<div class="ai-msg">⚠️ ${error.message}</div>`;
    }
}