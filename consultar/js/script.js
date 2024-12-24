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
  if (rbc < referenceValues.rbc.min) results.push("Eritrócitos abaixo do normal (anemia).");
  else if (rbc > referenceValues.rbc.max) results.push("Eritrócitos acima do normal (policitemia).");

  if (hemoglobin < referenceValues.hemoglobin.min) results.push("Hemoglobina baixa (anemia).");
  else if (hemoglobin > referenceValues.hemoglobin.max) results.push("Hemoglobina alta (desidratação ou outros fatores).");

  if (hematocrit < referenceValues.hematocrit.min) results.push("Hematócrito abaixo do normal (anemia).");
  else if (hematocrit > referenceValues.hematocrit.max) results.push("Hematócrito acima do normal (desidratação).");

  if (wbc < referenceValues.wbc.min) results.push("Leucócitos abaixo do normal (imunossupressão).");
  else if (wbc > referenceValues.wbc.max) results.push("Leucócitos acima do normal (infecção ou inflamação).");

  if (platelets < referenceValues.platelets.min) results.push("Plaquetas abaixo do normal (trombocitopenia).");
  else if (platelets > referenceValues.platelets.max) results.push("Plaquetas acima do normal (trombocitose).");

  if (vcm < referenceValues.vcm.min) results.push("VCM abaixo do normal (microcitose).");
  else if (vcm > referenceValues.vcm.max) results.push("VCM acima do normal (macrocitose).");

  if (hcm < referenceValues.hcm.min) results.push("HCM abaixo do normal (hipocromia).");
  else if (hcm > referenceValues.hcm.max) results.push("HCM acima do normal (hipercromia).");

  if (chcm < referenceValues.chcm.min) results.push("CHCM abaixo do normal (possível hipocromia).");
  else if (chcm > referenceValues.chcm.max) results.push("CHCM acima do normal (hipercromia).");

  if (rdw < referenceValues.rdw.min) results.push("RDW abaixo do normal (distribuição homogênea de células).");
  else if (rdw > referenceValues.rdw.max) results.push("RDW acima do normal (anisocitose).");

  // Diferencial de leucócitos
  if (neutrophils < referenceValues.differential.neutrophils.min || neutrophils > referenceValues.differential.neutrophils.max) {
    results.push("Neutrófilos fora do normal (pode indicar infecção bacteriana ou inflamação).");
  }
  if (lymphocytes < referenceValues.differential.lymphocytes.min || lymphocytes > referenceValues.differential.lymphocytes.max) {
    results.push("Linfócitos fora do normal (possível infecção viral ou doenças imunológicas).");
  }
  if (monocytes < referenceValues.differential.monocytes.min || monocytes > referenceValues.differential.monocytes.max) {
    results.push("Monócitos fora do normal (doença crônica ou inflamação).");
  }
  if (eosinophils < referenceValues.differential.eosinophils.min || eosinophils > referenceValues.differential.eosinophils.max) {
    results.push("Eosinófilos fora do normal (alergias ou infecção parasitária).");
  }
  if (basophils < referenceValues.differential.basophils.min || basophils > referenceValues.differential.basophils.max) {
    results.push("Basófilos fora do normal (doença alérgica ou inflamatória).");
  }

  // Consideração de medicamentos
  if (medication === "anticoagulants") results.push("Medicamento anticoagulante pode alterar os resultados de coagulação.");
  if (medication === "iron_supplements") results.push("Suplementos de ferro podem interferir nos níveis de hemoglobina.");
  if (medication === "hormones") results.push("Hormônios podem causar alterações nos valores hematológicos.");
// Interpretação de Exames Hormonais
document.getElementById('hormonal-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Captura os valores do formulário hormonal
  const age = parseInt(document.getElementById('age-hormonal').value);
  const sex = document.getElementById('sex-hormonal').value;
  const tsh = parseFloat(document.getElementById('tsh').value);
  const t4Free = parseFloat(document.getElementById('t4-free').value);
  const t3Total = parseFloat(document.getElementById('t3-total').value);
  const cortisol = parseFloat(document.getElementById('cortisol').value);
  const prolactin = parseFloat(document.getElementById('prolactin').value);
  const lh = parseFloat(document.getElementById('lh').value);
  const fsh = parseFloat(document.getElementById('fsh').value);

  let results = [];

  // Valores de referência
  const referenceValuesHormonal = {
    tsh: { min: 0.4, max: 4.0 }, // TSH (mU/L)
    t4Free: { min: 0.8, max: 1.8 }, // T4 Livre (ng/dL)
    t3Total: { min: 80, max: 200 }, // T3 Total (ng/dL)
    cortisol: { min: 5, max: 25 }, // Cortisol (µg/dL)
    prolactin: sex === "male" ? { min: 2, max: 18 } : { min: 3, max: 25 }, // Prolactina (ng/mL)
    lh: sex === "male" ? { min: 1.8, max: 8.6 } : { min: 2, max: 12.6 }, // LH (UI/L)
    fsh: sex === "male" ? { min: 1.5, max: 12.4 } : { min: 3.5, max: 12.5 } // FSH (UI/L)
  };

  // Interpretação dos parâmetros hormonais
  if (tsh < referenceValuesHormonal.tsh.min) results.push("TSH abaixo do normal (hipertireoidismo).");
  else if (tsh > referenceValuesHormonal.tsh.max) results.push("TSH acima do normal (hipotireoidismo).");

  if (t4Free < referenceValuesHormonal.t4Free.min) results.push("T4 Livre abaixo do normal (hipotireoidismo).");
  else if (t4Free > referenceValuesHormonal.t4Free.max) results.push("T4 Livre acima do normal (hipertireoidismo).");

  if (t3Total < referenceValuesHormonal.t3Total.min) results.push("T3 Total abaixo do normal (hipotireoidismo).");
  else if (t3Total > referenceValuesHormonal.t3Total.max) results.push("T3 Total acima do normal (hipertireoidismo).");

  if (cortisol < referenceValuesHormonal.cortisol.min) results.push("Cortisol abaixo do normal (insuficiência adrenal).");
  else if (cortisol > referenceValuesHormonal.cortisol.max) results.push("Cortisol acima do normal (síndrome de Cushing).");

  if (prolactin < referenceValuesHormonal.prolactin.min) results.push("Prolactina abaixo do normal.");
  else if (prolactin > referenceValuesHormonal.prolactin.max) results.push("Prolactina acima do normal (hiperprolactinemia).");

  if (lh < referenceValuesHormonal.lh.min) results.push("LH abaixo do normal (hipogonadismo).");
  else if (lh > referenceValuesHormonal.lh.max) results.push("LH acima do normal (falência gonadal).");

  if (fsh < referenceValuesHormonal.fsh.min) results.push("FSH abaixo do normal (hipogonadismo).");
  else if (fsh > referenceValuesHormonal.fsh.max) results.push("FSH acima do normal (falência gonadal).");

  // Exibir os resultados hormonios
  document.getElementById('hormonal-result').innerHTML = `
    <h3>Resultados dos Exames Hormonais:</h3>
    <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
  `;
});
// Mostrar ou ocultar a lista de medicamentos ao selecionar "Uso de Medicamentos"
document.getElementById('medication-checkbox').addEventListener('change', function () {
  const medicationListGroup = document.getElementById('medication-list-group');
  medicationListGroup.style.display = this.checked ? 'block' : 'none';
});

  // Exibir os resultados hemograma
  document.getElementById('hemogram-result').innerHTML = `
    <h3>Resultados do Hemograma:</h3>
    <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
  `;
});
