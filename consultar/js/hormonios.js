
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
  
  // Mostrar ou ocultar a lista de medicamentos ao selecionar "Uso de Medicamentos"
  document.getElementById('medication-checkbox').addEventListener('change', function () {
    const medicationListGroup = document.getElementById('medication-list-group');
    medicationListGroup.style.display = this.checked ? 'block' : 'none';
  });
  
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
  
    // Captura fatores adversos e medicamentos
    const factors = Array.from(document.querySelectorAll('input[name="factors"]:checked')).map(f => f.value);
    const medication = document.getElementById('medication-list').value;
  
    let results = [];
  
    // Valores de referência ajustados pela idade e sexo
    const referenceValuesHormonal = {
      tsh: { min: 0.4, max: 4.0 }, // TSH (mU/L)
      t4Free: { min: 0.8, max: 1.8 }, // T4 Livre (ng/dL)
      t3Total: { min: 80, max: 200 }, // T3 Total (ng/dL)
      cortisol: { min: 5, max: 25 }, // Cortisol (µg/dL)
      prolactin: age < 18
        ? { min: 2, max: 20 }
        : sex === "male"
        ? { min: 2, max: 18 }
        : { min: 3, max: 25 }, // Prolactina (ng/mL)
      lh: age < 18
        ? { min: 1, max: 6 }
        : sex === "male"
        ? { min: 1.8, max: 8.6 }
        : { min: 2, max: 12.6 }, // LH (UI/L)
      fsh: age < 18
        ? { min: 1, max: 6 }
        : sex === "male"
        ? { min: 1.5, max: 12.4 }
        : { min: 3.5, max: 12.5 } // FSH (UI/L)
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
  
    // Considerar fatores adversos na interpretação
    if (factors.includes("menstrual_cycle")) results.push("O ciclo menstrual pode interferir nos níveis de LH e FSH.");
    if (factors.includes("pregnancy")) results.push("A gravidez pode alterar níveis de prolactina, LH e FSH.");
    if (factors.includes("stress")) results.push("O estresse pode elevar o cortisol e influenciar o TSH.");
    if (factors.includes("exercise")) results.push("Exercício físico intenso pode elevar o cortisol.");
    if (factors.includes("lack_of_sleep")) results.push("A falta de sono pode alterar os níveis de cortisol e TSH.");
    if (factors.includes("environmental_chemicals")) results.push("Exposição a químicos pode interferir nos níveis hormonais.");
  
    // Avaliação do impacto dos medicamentos
    if (factors.includes("medications") && medication) {
      switch (medication) {
        case "corticosteroids":
          results.push("Uso de corticosteroides pode elevar o cortisol e suprimir o TSH.");
          break;
        case "antidepressants":
          results.push("Antidepressivos podem aumentar a prolactina.");
          break;
        case "antipsychotics":
          results.push("Antipsicóticos podem causar hiperprolactinemia.");
          break;
        case "contraceptives":
          results.push("Contraceptivos orais podem alterar os níveis de LH e FSH.");
          break;
        case "anabolic_steroids":
          results.push("Esteroides anabolizantes podem suprimir os níveis de LH e FSH.");
          break;
        case "thyroid_medications":
          results.push("Medicamentos tireoideanos podem interferir diretamente no TSH, T3 e T4.");
          break;
        default:
          results.push("Medicamento selecionado pode alterar os resultados hormonais.");
      }
    }
  
    // Adicionar comentário sobre a idade
    if (age < 18) {
      results.push("Níveis hormonais podem variar amplamente durante a puberdade.");
    } else if (age > 50) {
      results.push("Mudanças hormonais relacionadas à idade, como menopausa ou andropausa, podem estar presentes.");
    }
  
    // Exibir os resultados
    document.getElementById('hormonal-result').innerHTML = `
      <h3>Resultados dos Exames Hormonais:</h3>
      <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
  });
  