
document.getElementById('metabolic-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Captura os valores do formulário
    const age = parseInt(document.getElementById('age-metabolic').value);
    const sex = document.getElementById('sex-metabolic').value;
    const sodium = parseFloat(document.getElementById('sodium').value);
    const potassium = parseFloat(document.getElementById('potassium').value);
    const calcium = parseFloat(document.getElementById('calcium').value);
    const magnesium = parseFloat(document.getElementById('magnesium').value);
    const totalProteins = parseFloat(document.getElementById('total-proteins').value);
    const albumin = parseFloat(document.getElementById('albumin').value);
    const globulin = parseFloat(document.getElementById('globulin').value);
  
    // Captura fatores adversos e medicamentos
    const factors = Array.from(document.querySelectorAll('input[name="factors"]:checked')).map(f => f.value);
    const medications = Array.from(document.querySelectorAll('input[name="medications"]:checked')).map(m => m.value);
  
    let results = [];
  
    // Valores de referência ajustados pela idade
    const referenceValuesMetabolic = {
      sodium: age < 18 ? { min: 136, max: 144 } : { min: 135, max: 145 },
      potassium: age < 18 ? { min: 3.4, max: 4.7 } : { min: 3.5, max: 5.0 },
      calcium: age < 18 ? { min: 9.0, max: 10.6 } : { min: 8.5, max: 10.5 },
      magnesium: age < 18 ? { min: 1.6, max: 2.4 } : { min: 1.7, max: 2.4 },
      totalProteins: age < 18 ? { min: 5.7, max: 8.0 } : { min: 6.0, max: 8.3 },
      albumin: { min: 3.5, max: 5.0 },
      globulin: { min: 2.0, max: 3.5 }
    };
  
    // Interpretação de Eletrólitos
    if (sodium < referenceValuesMetabolic.sodium.min) results.push("Sódio baixo (hiponatremia).");
    else if (sodium > referenceValuesMetabolic.sodium.max) results.push("Sódio elevado (hipernatremia).");
  
    if (potassium < referenceValuesMetabolic.potassium.min) results.push("Potássio baixo (hipocalemia).");
    else if (potassium > referenceValuesMetabolic.potassium.max) results.push("Potássio elevado (hipercalemia).");
  
    if (calcium < referenceValuesMetabolic.calcium.min) results.push("Cálcio baixo (hipocalcemia).");
    else if (calcium > referenceValuesMetabolic.calcium.max) results.push("Cálcio elevado (hipercalcemia).");
  
    if (magnesium < referenceValuesMetabolic.magnesium.min) results.push("Magnésio baixo (hipomagnesemia).");
    else if (magnesium > referenceValuesMetabolic.magnesium.max) results.push("Magnésio elevado (hipermagnesemia).");
  
    // Interpretação de Proteínas Totais e Frações
    if (totalProteins < referenceValuesMetabolic.totalProteins.min) results.push("Proteínas Totais baixas (hipoproteinemia).");
    else if (totalProteins > referenceValuesMetabolic.totalProteins.max) results.push("Proteínas Totais elevadas (hiperproteinemia).");
  
    if (albumin < referenceValuesMetabolic.albumin.min) results.push("Albumina baixa (hipoalbuminemia).");
    else if (albumin > referenceValuesMetabolic.albumin.max) results.push("Albumina elevada (hiperalbuminemia).");
  
    if (globulin < referenceValuesMetabolic.globulin.min) results.push("Globulina baixa.");
    else if (globulin > referenceValuesMetabolic.globulin.max) results.push("Globulina elevada.");
  
    // Consideração de fatores adversos
    if (factors.includes("dehydration")) results.push("A desidratação pode impactar os níveis de eletrólitos.");
    if (factors.includes("renal_conditions")) results.push("Condições renais podem alterar os níveis metabólicos.");
  
    // Consideração de medicamentos
    medications.forEach(med => {
      if (med === "diuretics") results.push("Diuréticos podem reduzir os níveis de sódio e potássio.");
      if (med === "antacids") results.push("Antiácidos podem impactar os níveis de cálcio e magnésio.");
      if (med === "steroids") results.push("Esteroides podem alterar os níveis de eletrólitos e proteínas.");
      if (med === "calcium_supplements") results.push("Suplementos de cálcio podem causar hipercalcemia.");
    });
  
    // Observações adicionais por idade
    if (age < 18) {
      results.push("Os níveis de proteínas totais e eletrólitos podem variar em crianças e adolescentes devido ao crescimento.");
    } else if (age > 60) {
      results.push("Em idosos, alterações metabólicas são comuns devido ao envelhecimento e condições crônicas.");
    }
  
    // Exibir os resultados
    document.getElementById('metabolic-result').innerHTML = `
      <h3>Resultados dos Exames Metabólicos:</h3>
      <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
  });
  