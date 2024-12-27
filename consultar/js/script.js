document.addEventListener('DOMContentLoaded', function () {
  const fadeElements = document.querySelectorAll('.fade-in');

  fadeElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('show');
    }, index * 30000); // Ajuste o tempo para cada elemento
  });
});

document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.dataset.section;
    document.querySelectorAll('.exam-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(target).classList.add('active');
  });
});

// Mostrar ou ocultar o campo de gravidez baseado no sexo
document.getElementById('sex').addEventListener('change', function () {
  const pregnancyGroup = document.getElementById('pregnancy-group');
  pregnancyGroup.style.display = this.value === "female" ? "block" : "none";
});

// Interpretação do Hemograma
document.getElementById('hemogram-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Captura os valores do formulário
  const age = parseInt(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const pregnancy = document.getElementById('pregnancy').value === "yes";
  const medication = document.getElementById('medications').value;

  // Valores do Hemograma
  const rbc = parseFloat(document.getElementById('rbc').value);
  const hemoglobin = parseFloat(document.getElementById('hemoglobin').value);
  const hematocrit = parseFloat(document.getElementById('hematocrit').value);
  const wbc = parseFloat(document.getElementById('wbc').value);
  const platelets = parseInt(document.getElementById('platelets').value);
  const vcm = parseFloat(document.getElementById('vcm').value);
  const hcm = parseFloat(document.getElementById('hcm').value);
  const chcm = parseFloat(document.getElementById('chcm').value);
  const rdw = parseFloat(document.getElementById('rdw').value);

  // Diferencial de Leucócitos
  const neutrophils = parseFloat(document.getElementById('neutrophils').value);
  const lymphocytes = parseFloat(document.getElementById('lymphocytes').value);
  const monocytes = parseFloat(document.getElementById('monocytes').value);
  const eosinophils = parseFloat(document.getElementById('eosinophils').value);
  const basophils = parseFloat(document.getElementById('basophils').value);

  let results = [];

  // Valores de referência ajustados
  const referenceValues = {
    rbc: pregnancy ? { min: 3.8, max: 4.9 } : sex === "male" ? { min: 4.5, max: 5.9 } : { min: 4.1, max: 5.1 },
    hemoglobin: pregnancy ? { min: 11.0, max: 14.0 } : sex === "male" ? { min: 13.5, max: 17.5 } : { min: 12.0, max: 15.5 },
    hematocrit: pregnancy ? { min: 34, max: 46 } : sex === "male" ? { min: 41, max: 53 } : { min: 36, max: 46 },
    wbc: { min: 4, max: 11 },
    platelets: { min: 150, max: 450 },
    vcm: { min: 80, max: 100 },
    hcm: { min: 27, max: 32 },
    chcm: { min: 32, max: 36 },
    rdw: { min: 11.5, max: 14.5 },
    differential: {
      neutrophils: { min: 40, max: 70 },
      lymphocytes: { min: 20, max: 45 },
      monocytes: { min: 2, max: 10 },
      eosinophils: { min: 1, max: 6 },
      basophils: { min: 0, max: 1 }
    }
  };

  // Interpretação dos parâmetros
  if (rbc < referenceValues.rbc.min) {
    results.push("Eritrócitos muito baixo (anemia).");
    results.push("Sugestões: Consuma alimentos ricos em ferro como carne vermelha, feijão e espinafre. Chá de gengibre pode ajudar na absorção do ferro.");
  }
  else if (rbc > referenceValues.rbc.max) {
    results.push("Eritrócitos Alto (policitemia).");
    results.push("Sugestões: Evite alimentos ricos em ferro e hidratação excessiva.");
  }

  if (hemoglobin < referenceValues.hemoglobin.min) {
    results.push("Hemoglobina baixa (anemia).");
    results.push("Sugestões: Incluir alimentos ricos em ferro e vitamina C. Chá de gengibre pode ajudar.");
  }
  else if (hemoglobin > referenceValues.hemoglobin.max) {
    results.push("Hemoglobina alta (desidratação ou outros fatores).");
    results.push("Sugestões: Aumente a ingestão de líquidos e evite alimentos ricos em ferro.");
  }

  if (hematocrit < referenceValues.hematocrit.min) {
    results.push("Hematócrito muito baixo (anemia).");
    results.push("Sugestões: Consuma alimentos ricos em ferro e vitamina C para melhorar a absorção.");
  }
  else if (hematocrit > referenceValues.hematocrit.max) {
    results.push("Hematócrito Alto (desidratação).");
    results.push("Sugestões: Aumente a ingestão de líquidos e evite alimentos ricos em ferro.");
  }

  if (wbc < referenceValues.wbc.min) {
    results.push("Leucócitos muito baixo (imunossupressão).");
    results.push("Sugestões: Consuma alimentos ricos em vitamina C, como frutas cítricas. Chá de equinácea pode fortalecer o sistema imunológico.");
  }
  else if (wbc > referenceValues.wbc.max) {
    results.push("Leucócitos Alto (infecção ou inflamação).");
    results.push("Sugestões: Alimentos anti-inflamatórios, como cúrcuma e gengibre, podem ajudar.");
  }

  if (platelets < referenceValues.platelets.min) {
    results.push("Plaquetas muito baixo (trombocitopenia).");
    results.push("Sugestões: Aumente a ingestão de vitamina K com vegetais verdes e alimentos ricos em ácido fólico.");
  }
  else if (platelets > referenceValues.platelets.max) {
    results.push("Plaquetas Alto (trombocitose).");
    results.push("Sugestões: Evite o uso excessivo de álcool e pratique atividades físicas regulares.");
  }

  if (vcm < referenceValues.vcm.min) {
    results.push("VCM muito baixo (microcitose).");
    results.push("Sugestões: Consuma alimentos ricos em vitamina B12 como carne, ovos e peixe.");
  }
  else if (vcm > referenceValues.vcm.max) {
    results.push("VCM Alto (macrocitose).");
    results.push("Sugestões: Incluir alimentos ricos em ácido fólico e vitamina B12.");
  }

  if (hcm < referenceValues.hcm.min) {
    results.push("HCM muito baixo (hipocromia).");
    results.push("Sugestões: Alimentos ricos em ferro e vitamina C.");
  }
  else if (hcm > referenceValues.hcm.max) {
    results.push("HCM Alto (hipercromia).");
    results.push("Sugestões: Aumentar a ingestão de líquidos e diminuir o consumo de ferro.");
  }

  if (chcm < referenceValues.chcm.min) {
    results.push("CHCM muito baixo (possível hipocromia).");
    results.push("Sugestões: Consuma alimentos ricos em ferro e vitamina C.");
  }
  else if (chcm > referenceValues.chcm.max) {
    results.push("CHCM Alto (hipercromia).");
    results.push("Sugestões: Aumente a ingestão de líquidos.");
  }

  if (rdw < referenceValues.rdw.min) {
    results.push("RDW muito baixo (distribuição homogênea de células).");
    results.push("Sugestões: Mantenha uma alimentação rica em ferro e ácido fólico.");
  }
  else if (rdw > referenceValues.rdw.max) {
    results.push("RDW Alto (anisocitose).");
    results.push("Sugestões: Consuma alimentos ricos em ferro e vitamina C.");
  }

  // Diferencial de leucócitos
  if (neutrophils < referenceValues.differential.neutrophils.min || neutrophils > referenceValues.differential.neutrophils.max) {
    results.push("Neutrófilos fora do normal (pode indicar infecção bacteriana ou inflamação).");
    results.push("Sugestões: Chá de gengibre pode ajudar na redução da inflamação.");
  }
  if (lymphocytes < referenceValues.differential.lymphocytes.min || lymphocytes > referenceValues.differential.lymphocytes.max) {
    results.push("Linfócitos fora do normal (possível infecção viral ou doenças imunológicas).");
    results.push("Sugestões: Alimentos anti-inflamatórios como cúrcuma.");
  }
  if (monocytes < referenceValues.differential.monocytes.min || monocytes > referenceValues.differential.monocytes.max) {
    results.push("Monócitos fora do normal (doença crônica ou inflamação).");
    results.push("Sugestões: Alimentos anti-inflamatórios e evitar estresse.");
  }
  if (eosinophils < referenceValues.differential.eosinophils.min || eosinophils > referenceValues.differential.eosinophils.max) {
    results.push("Eosinófilos fora do normal (alergias ou infecção parasitária).");
    results.push("Sugestões: Chá de camomila e evitar alimentos que causam alergias.");
  }
  if (basophils < referenceValues.differential.basophils.min || basophils > referenceValues.differential.basophils.max) {
    results.push("Basófilos fora do normal (doença alérgica ou inflamatória).");
    results.push("Sugestões: Chá de camomila e evitar estresse.");
  }

  // Consideração de medicamentos
  if (medication === "anticoagulants") {
    results.push("Medicamento anticoagulante pode alterar os resultados de coagulação.");
  }
  if (medication === "iron_supplements") {
    results.push("Suplementos de ferro podem interferir nos níveis de hemoglobina.");
  }
  if (medication === "immune_modulators") {
    results.push("Medicamentos imunomoduladores podem alterar os níveis de leucócitos.");
  }

  // Exibir resultados
  document.getElementById('hemogram-result').innerHTML = `
  <h3>Resultados do Hemograma:</h3>
  <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
`;
});

