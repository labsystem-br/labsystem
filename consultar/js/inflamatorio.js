
document.getElementById('inflammatory-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Captura os valores do formulário
    const age = parseInt(document.getElementById('age-inflammatory').value);
    const sex = document.getElementById('sex-inflammatory').value;
    const pcr = parseFloat(document.getElementById('pcr').value);
    const vhs = parseFloat(document.getElementById('vhs').value);
    const ferritin = parseFloat(document.getElementById('ferritin').value);
  
    // Captura fatores adversos e medicamentos
    const factors = Array.from(document.querySelectorAll('input[name="factors"]:checked')).map(f => f.value);
    const medications = Array.from(document.querySelectorAll('input[name="medications"]:checked')).map(m => m.value);
  
    let results = [];
  
    // Valores de referência ajustados
    const referenceValuesInflammatory = {
      pcr: { min: 0, max: 5 }, // PCR (mg/L)
      vhs: sex === "male" ? { min: 0, max: 15 } : { min: 0, max: 20 }, // VHS (mm/h)
      ferritin: age > 18
        ? { min: 30, max: 400 }
        : { min: 20, max: 200 } // Ferritina (ng/mL) ajustada pela idade
    };
  
    // Interpretação de PCR
    if (pcr > referenceValuesInflammatory.pcr.max) {
      results.push("PCR elevada (indica inflamação aguda ou crônica).");
      if (factors.includes("stress")) results.push("O estresse pode estar contribuindo para a elevação da PCR.");
      if (factors.includes("exercise")) results.push("Exercício físico intenso recente pode elevar a PCR.");
      if (medications.includes("corticosteroids")) results.push("Corticosteroides podem reduzir artificialmente os níveis de PCR.");
    } else {
      results.push("PCR dentro dos valores normais.");
    }
  
    // Interpretação de VHS
    if (vhs > referenceValuesInflammatory.vhs.max) {
      results.push("VHS elevado (sugere inflamação, infecção ou condição crônica).");
      if (age > 60) results.push("Idosos podem apresentar níveis elevados de VHS devido ao envelhecimento.");
      if (factors.includes("pregnancy")) results.push("A gestação pode aumentar os níveis de VHS.");
      if (factors.includes("menstrual_cycle")) results.push("O ciclo menstrual pode elevar os níveis de VHS.");
      if (medications.includes("anti_inflammatory")) results.push("Uso de AINEs pode mascarar elevações de VHS.");
    } else {
      results.push("VHS dentro dos valores normais.");
    }
  
    // Interpretação de Ferritina
    if (ferritin < referenceValuesInflammatory.ferritin.min) {
      results.push("Ferritina baixa (indica deficiência de ferro).");
      if (factors.includes("menstrual_cycle")) results.push("A menstruação pode contribuir para níveis baixos de ferritina.");
      if (medications.includes("iron_supplements")) results.push("Suplementos de ferro podem ajudar a normalizar a ferritina.");
    } else if (ferritin > referenceValuesInflammatory.ferritin.max) {
      results.push("Ferritina elevada (associada a inflamação ou sobrecarga de ferro).");
      if (factors.includes("environmental_chemicals")) results.push("Exposição a químicos pode contribuir para níveis elevados de ferritina.");
      if (factors.includes("chronic_conditions")) results.push("Condições inflamatórias crônicas podem estar elevando a ferritina.");
    } else {
      results.push("Ferritina dentro dos valores normais.");
    }
  
    // Impacto de medicamentos
    if (medications.length > 0) {
      medications.forEach(med => {
        switch (med) {
          case "corticosteroids":
            results.push("Corticosteroides podem reduzir artificialmente os marcadores inflamatórios.");
            break;
          case "antidepressants":
            results.push("Antidepressivos podem impactar os níveis de VHS.");
            break;
          case "iron_supplements":
            results.push("Suplementos de ferro podem elevar artificialmente os níveis de ferritina.");
            break;
          case "anti_inflammatory":
            results.push("Anti-inflamatórios podem mascarar elevações de PCR e VHS.");
            break;
          case "antipsychotics":
            results.push("Antipsicóticos podem alterar os marcadores inflamatórios em alguns casos.");
            break;
          case "immunosuppressants":
            results.push("Imunossupressores podem reduzir os marcadores inflamatórios.");
            break;
          default:
            results.push("O medicamento selecionado pode alterar os resultados dos marcadores inflamatórios.");
        }
      });
    }
  
    // Observações adicionais por idade
    if (age < 18) {
      results.push("Os níveis de ferritina podem ser menores em crianças e adolescentes devido ao crescimento.");
    } else if (age > 60) {
      results.push("Em idosos, os níveis de VHS e PCR podem ser levemente elevados devido ao envelhecimento.");
    }
  
    // Exibir os resultados
    document.getElementById('inflammatory-result').innerHTML = `
      <h3>Resultados dos Marcadores Inflamatórios:</h3>
      <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
  });
  