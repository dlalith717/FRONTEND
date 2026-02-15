// Navigation Logic
function navigateTo(viewId) {
    document.querySelectorAll('.page-view').forEach(view => view.classList.add('hidden'));
    document.getElementById(`view-${viewId}`).classList.remove('hidden');
    if(viewId === 'doctor') loadDoctorQueue();
}

// Triage Stepper Logic
function nextStep(stepNum) {
    // Hide all steps
    document.querySelectorAll('[id^="p-step-"]').forEach(step => step.classList.add('hidden'));
    document.querySelectorAll('.step').forEach(label => label.classList.remove('active'));
    
    // Show current
    document.getElementById(`p-step-${stepNum}`).classList.remove('hidden');
    document.getElementById(`step-${stepNum}-label`).classList.add('active');
}

// AI Simulation
function processAI() {
    const btn = document.getElementById('ai-trigger');
    btn.innerHTML = '<i class="fas fa-spinner animate-spin"></i> Parsing Health Docs...';
    btn.disabled = true;

    // Simulated parsing delay
    setTimeout(() => {
        const age = document.getElementById('age').value;
        const symptoms = document.getElementById('symptoms').value;
        
        // Dynamic Explainability Rationale
        document.getElementById('ai-rationale').innerText = 
            `Engine identified patient (Age: ${age}) symptoms of "${symptoms}". Hybrid analysis cross-referenced EHR history; no acute anomalies found. Vitals remain stable. Recommendation: Routine consult.`;
        
        nextStep(3);
        btn.innerHTML = 'Generate AI Risk Report';
        btn.disabled = false;
    }, 2000);
}

// Doctor's Data Population
const mockPatients = [
    { id: "P-4401", symp: "Acute Chest Pain", risk: 91, dept: "Cardiology", status: "Critical" },
    { id: "P-4402", symp: "Blurry Vision", risk: 24, dept: "Opthalmology", status: "Stable" },
    { id: "P-4403", symp: "Shortness of Breath", risk: 85, dept: "Emergency", status: "Urgent" }
];

function loadDoctorQueue() {
    const container = document.getElementById('queue-list');
    container.innerHTML = '';
    
    mockPatients.forEach(p => {
        const riskColor = p.risk > 80 ? 'text-red-500' : 'text-emerald-500';
        container.innerHTML += `
            <div class="p-6 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">ID</div>
                    <div>
                        <p class="font-black text-slate-800">${p.id}</p>
                        <p class="text-xs text-slate-400">${p.symp}</p>
                    </div>
                </div>
                <div class="text-center">
                    <p class="text-lg font-black ${riskColor}">${p.risk}%</p>
                    <p class="text-[10px] font-bold text-slate-300 uppercase">AI Score</p>
                </div>
                <div class="text-right">
                    <span class="px-4 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">${p.dept}</span>
                </div>
            </div>
        `;
    });
}