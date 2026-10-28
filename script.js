const secondFloorCheckbox = document.getElementById("secondFloor");
const secondFloorFields = document.getElementById("secondFloorFields");
const form = document.getElementById("calcForm");
const resultsSection = document.getElementById("results");
const resultsContent = document.getElementById("resultsContent");

secondFloorCheckbox.addEventListener("change", () => {
    secondFloorFields.classList.toggle("hidden", !secondFloorCheckbox.checked);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // First floor
    const ancho = parseFloat(document.getElementById("ancho").value) || 0;
    const largo = parseFloat(document.getElementById("largo").value) || 0;
    const alturaP = parseFloat(document.getElementById("alturaP").value) || 0;
    const alturaT = parseFloat(document.getElementById("alturaT").value) || 0;
    const noDeseadoA = parseFloat(document.getElementById("noDeseadoA").value) || 0;
    const noDeseadoL = parseFloat(document.getElementById("noDeseadoL").value) || 0;

    const sf = ancho * largo;
    const sfNo = noDeseadoA * noDeseadoL;
    const alturaZ = alturaP + (alturaT / 2);

    // Second floor
    let sf2 = 0, sfNo2 = 0, alturaX = 0, alturaP2 = 0, alturaT2 = 0;
    if (secondFloorCheckbox.checked) {
        const ancho2 = parseFloat(document.getElementById("ancho2").value) || 0;
        const largo2 = parseFloat(document.getElementById("largo2").value) || 0;
        alturaP2 = parseFloat(document.getElementById("alturaP2").value) || 0;
        alturaT2 = parseFloat(document.getElementById("alturaT2").value) || 0;
        const noDeseadoA2 = parseFloat(document.getElementById("noDeseadoA2").value) || 0;
        const noDeseadoL2 = parseFloat(document.getElementById("noDeseadoL2").value) || 0;

        sf2 = ancho2 * largo2;
        sfNo2 = noDeseadoA2 * noDeseadoL2;
        alturaX = alturaP2 + (alturaT2 / 2);
    }

    // Test values
    const cfm = parseFloat(document.getElementById("cfm").value) || 0;
    const cfn = parseFloat(document.getElementById("cfn").value) || 0;

    // Calculations
    const totalArea = sf + sf2;
    const conditionedArea = totalArea - (sfNo + sfNo2);
    const cubicVolumeTotal = (sf * alturaZ) + (sf2 * alturaX);
    const vaultedVolume = (sf * alturaT * 0.5) + (sf2 * alturaT2 * 0.5);
    const mainVolume = (sf * alturaP) + (sf2 * alturaP2);
    const volumenSin = (alturaZ * (sf - sfNo)) + (alturaX * (sf2 - sfNo2));

    const ach50 = volumenSin > 0 ? (cfm * 60.0) / volumenSin : 0;
    const ach25 = conditionedArea > 0 ? (cfn / conditionedArea) * 100 : 0;

    // Display results
    const results = [
        ["Total building area", `${totalArea.toFixed(1)} sq ft`],
        ["Total air-conditioned area", `${conditionedArea.toFixed(1)} sq ft`],
        ["Total building volume", `${cubicVolumeTotal.toFixed(1)} cu ft`],
        ["Vaulted ceiling volume", `${vaultedVolume.toFixed(1)} cu ft`],
        ["Main volume", `${mainVolume.toFixed(1)} cu ft`],
        ["Volume excluding excluded area", `${volumenSin.toFixed(1)} cu ft`],
        ["ACH50", `${ach50.toFixed(1)} ACH50`],
        ["ACH25", `${ach25.toFixed(1)} ACH25`],
    ];

    resultsContent.innerHTML = results
        .map(([label, value]) => `
            <div class="result-item">
                <span>${label}</span>
                <strong>${value}</strong>
            </div>
        `)
        .join("");

    resultsSection.classList.remove("hidden");
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
