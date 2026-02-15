// 🔥 Replace this with your real backend URL
const BASE_URL = "https://your-rea-backend-name.onrender.com";


// -------------------------
// CHAT FUNCTION
// -------------------------
function sendMessage() {
    const inputField = document.getElementById("chatInput");
    const userMessage = inputField.value;

    if (!userMessage) return;

    fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: userMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("chatResponse").innerText = data.reply;
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Backend connection failed");
    });

    inputField.value = "";
}


// -------------------------
// PREDICT FUNCTION
// -------------------------
function predictSymptom() {
    const inputField = document.getElementById("symptomInput");
    const userInput = inputField.value;

    if (!userInput) return;

    fetch(`${BASE_URL}/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            symptom: userInput
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("departmentResult").innerText = 
            "Department: " + data.department;

        document.getElementById("riskResult").innerText = 
            "Risk Level: " + data.risk;
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Backend connection failed");
    });

    inputField.value = "";
}
