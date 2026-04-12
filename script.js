async function searchTerm() {
    const term = document.getElementById("termInput").value.toLowerCase();

    const response = await fetch(
        "https://9j65ujd57j.execute-api.us-east-1.amazonaws.com/prod/get-definition?term=" + term
    );

    const data = await response.json();

    document.getElementById("resultTitle").innerText = term.toUpperCase();
    document.getElementById("resultText").innerText = data.definition;

    document.getElementById("resultCard").classList.remove("hidden");
}