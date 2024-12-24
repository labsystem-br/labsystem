// Mostrar ou ocultar a lista de medicamentos ao selecionar "Uso de Medicamentos"
document.getElementById('medication-checkbox').addEventListener('change', function () {
    const medicationListGroup = document.getElementById('medication-list-group');
    medicationListGroup.style.display = this.checked ? 'block' : 'none';
  });
  
  // Interpretação de Exames Genéticos
  document.getElementById('genetic-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Captura os valores do formulário
    const age = parseInt(document.getElementById('age-genetic').value);
    const sex = document.getElementById('sex-genetic').value;
    const gluten = parseFloat(document.getElementById('gluten').value);
    const lactose = parseFloat(document.getElementById('lactose').value);
    const cea = parseFloat(document.getElementById('cea').value);
    const psa = parseFloat(document.getElementById('psa').value);
    const ca125 = parseFloat(document.getElementById('ca125').value);
  
    // Captura fatores adversos e medicamentos
    const factors = Array.from(document.querySelectorAll('input[name="factors"]:checked')).map(f => f.value);
    const medications = Array.from(document.querySelectorAll('input[name="medications"]:checked')).map(m => m.value);
  
    let results = [];
  
    // Valores de referência
    const referenceValuesGenetic = {
      gluten: { max: 20 },
      lactose: { max: 20 },
      cea: sex === "male" ? { max: 5.0 } : { max: 3.0 },
      psa: age > 50 ? { max: 4.0 } : { max: 2.5 },
      ca125: sex === "female" ? { max: 35 } : { max: 10 }
    };
  
    // Interpretação de Testes de Intolerância Alimentar
    if (gluten > referenceValuesGenetic.gluten.max) results.push("Teste de glúten positivo (intolerância ou sensibilidade detectada).");
    if (lactose > referenceValuesGenetic.lactose.max) results.push("Teste de lactose positivo (intolerância detectada).");
  
    // Interpretação de Marcadores Tumorais
    if (cea > referenceValuesGenetic.cea.max) results.push("CEA elevado (possível neoplasia ou inflamação crônica).");
    if (psa > referenceValuesGenetic.psa.max) results.push("PSA elevado (possível hiperplasia prostática ou neoplasia).");
    if (ca125 > referenceValuesGenetic.ca125.max) results.push("CA-125 elevado (possível malignidade ou condição inflamatória).");
  
    // Consideração de fatores adversos
    if (factors.includes("pregnancy")) results.push("A gravidez pode influenciar os níveis de CA-125.");
    if (factors.includes("menstrual_cycle")) results.push("O ciclo menstrual pode elevar os níveis de CA-125.");
    if (factors.includes("smoking")) results.push("O tabagismo pode elevar os níveis de CEA.");
    if (factors.includes("alcohol")) results.push("O consumo de álcool pode impactar os níveis de CEA.");
  
    // Consideração de medicamentos
    medications.forEach(med => {
      if (med === "immunosuppressants") results.push("Imunossupressores podem alterar os resultados de testes genéticos.");
      if (med === "hormone_therapy") results.push("Terapia hormonal pode impactar os níveis de marcadores tumorais.");
      if (med === "chemotherapy") results.push("Quimioterapia pode influenciar os níveis de CEA e CA-125.");
    });
  
    // Observações adicionais por idade
    if (age > 50) results.push("Recomenda-se avaliação mais detalhada para pacientes acima de 50 anos com PSA elevado.");
  
    // Exibir os resultados
    document.getElementById('genetic-result').innerHTML = `
      <h3>Resultados dos Exames Genéticos:</h3>
      <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
  });
// Mostrar ou ocultar a lista de medicamentos ao selecionar "Uso de Medicamentos"
document.addEventListener('DOMContentLoaded', function () {
    const medicationCheckbox = document.getElementById('medication-checkbox');
    const medicationListGroup = document.getElementById('medication-list-group');
  
    medicationCheckbox.addEventListener('change', function () {
      // Exibir ou ocultar a lista de medicamentos
      medicationListGroup.style.display = this.checked ? 'block' : 'none';
    });
  });
    