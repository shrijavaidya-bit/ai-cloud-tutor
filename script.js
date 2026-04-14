function setPrompt(text) {
    document.getElementById("termInput").value = text;
    sendMessage();
}

async function sendMessage() {
    const input = document.getElementById("termInput");
    const chatBox = document.getElementById("chatBox");

    const question = input.value.trim();
    if (!question) return;

    chatBox.innerHTML += `<div class="user-msg">🧑 ${question}</div>`;
    input.value = "";

    chatBox.innerHTML += `<div class="ai-msg" id="loadingMsg">🤖 Thinking...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(
            "https://9j65ujd57j.execute-api.us-east-1.amazonaws.com/prod/ai-explain?term=" +
            encodeURIComponent(question)
        );

        const result = await response.json();

        document.getElementById("loadingMsg")?.remove();

        let answer = "";

        if (result.aiExplanation) {
            answer = result.aiExplanation;
        } else if (result.body) {
            const parsed =
                typeof result.body === "string"
                    ? JSON.parse(result.body)
                    : result.body;
            answer = parsed.aiExplanation || parsed.error || "No response";
        } else {
            answer = "No response";
        }

        chatBox.innerHTML += `<div class="ai-msg">🤖 ${answer}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        document.getElementById("loadingMsg")?.remove();
        chatBox.innerHTML += `<div class="ai-msg">⚠️ ${error.message}</div>`;
    }
}