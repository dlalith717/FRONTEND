console.log("Script loaded successfully");

// 🔥 Replace this with your REAL backend URL
const BASE_URL = "https://health-backend-1-3iyq.onrender.com";


// ==========================
// PAGE NAVIGATION
// ==========================
function navigateTo(view) {
    document.querySelectorAll(".page-view").forEach(section => {
        section.classList.add("hidden");
    });

    const target = document.getElementById("view-" + view);
    if (target) {
        target.classList.remove("hidden");
    }
}


// ==========================
// STEP NAVIGATION (PATIENT)
// ==========================
function nextStep(stepNumber) {
    document.querySelectorAll("#p-step-1, #p-step-2, #p-step-3")
        .forEach(step => step.classList.add("hidden"));

    const step = document.getElementById("p-step-" + stepNumber);
    if (step) {
        step.classList.remove("hidden");
    }

    document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
    const label = document.getElementById("step-" + stepNumber + "-label");
    if (label) {
        label.classList.add("active");
    }
}


// ==========================
// AI PROCESS FUNCTION
// ==========================
function processAI() {

    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const bp = document.getElementById("bp").value;
    const hr = document.getElementById("hr").value;
    const symptoms = document.getElementById("symptoms").value;

    if (!symptoms) {
        alert("Please enter symptoms");
        return;
    }

    fetch(`${BASE_URL}/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            symptom: symptoms
        })
    })
    .then(res => res.json())
    .then(data => {

        // Move to step 3
        nextStep(3);

        // Update Risk Level
        const riskElement = document.querySelector("#p-step-3 h2 span");
        riskElement.innerText = data.risk.toUpperCase();

        // Update Department
        document.querySelector("#p-step-3 .grid div:nth-child(1) p:nth-child(2)")
            .innerText = data.department;

        // Update Explanation
        document.getElementById("ai-rationale")
            .innerText = "Based on provided vitals and symptoms, AI triage engine assessed the case.";

    })
    .catch(error => {
        console.error("Error:", error);
        alert("Backend connection failed. Please try again.");
    });
}


// ==========================
// INITIAL STATE
// ==========================
navigateTo("login");
