// Função para interpretar exames (colesterol e glicose)
function interpretExam(examType, value) {
    let results = [];
    
    if (examType === "cholesterol") {
        // Valores de referência para colesterol
        const referenceValuesCholesterol = {
            optimal: { max: 200 },
            borderline: { min: 200, max: 239 },
            high: { min: 240 }
        };
        
        if (value < referenceValuesCholesterol.optimal.max) {
            results.push("Colesterol total dentro do intervalo ótimo (menos de 200 mg/dL). Continue com uma alimentação saudável.");
            results.push("Sugestões para manutenção: Mantenha uma dieta balanceada, rica em fibras e baixa em gorduras saturadas. Realize atividades físicas regulares (pelo menos 30 minutos por dia, 5 dias por semana).");
        } else if (value >= referenceValuesCholesterol.borderline.min && value <= referenceValuesCholesterol.borderline.max) {
            results.push("Colesterol total na faixa limítrofe (200-239 mg/dL). Tente melhorar sua dieta, aumentando a ingestão de fibras e reduzindo gorduras saturadas.");
            results.push("Sugestões: Considere aumentar a ingestão de frutas, vegetais, legumes e grãos integrais. Evite alimentos processados e ricos em gordura trans.");
            results.push("A prática regular de exercícios (caminhadas, natação, ciclismo) pode ajudar a reduzir o colesterol.");
        } else if (value >= referenceValuesCholesterol.high.min) {
            results.push("Colesterol total elevado (240 mg/dL ou mais). Consulte seu médico para avaliação e possíveis mudanças no estilo de vida.");
            results.push("Sugestões: É fundamental adotar uma dieta pobre em gorduras saturadas e trans. Considere a introdução de alimentos ricos em ácidos graxos ômega-3, como peixes gordurosos (salmão, sardinha).");
            results.push("Praticar exercícios regularmente e perder peso, se necessário, pode ajudar a reduzir os níveis de colesterol.");
            results.push("Considerar a orientação de um nutricionista ou médico para ajustes dietéticos e, se necessário, o uso de medicamentos.");
        }
    } else if (examType === "glucose") {
        // Valores de referência para glicose
        const referenceValuesGlucose = {
            normal: { max: 99 },
            preDiabetes: { min: 100, max: 125 },
            diabetes: { min: 126 }
        };

        if (value < referenceValuesGlucose.normal.max) {
            results.push("Glicose normal (menor que 100 mg/dL). Continue mantendo hábitos saudáveis.");
            results.push("Sugestões para manutenção: Mantenha uma dieta equilibrada com controle da ingestão de carboidratos. Evite o consumo excessivo de açúcar.");
            results.push("Pratique atividades físicas regularmente (cerca de 30 minutos por dia) para ajudar a manter níveis saudáveis de glicose no sangue.");
        } else if (value >= referenceValuesGlucose.preDiabetes.min && value <= referenceValuesGlucose.preDiabetes.max) {
            results.push("Pré-diabetes (100-125 mg/dL). Considere mudanças na alimentação e pratique atividades físicas regularmente.");
            results.push("Sugestões: Reduza a ingestão de carboidratos simples (como pães brancos, doces e refrigerantes). Inclua alimentos de baixo índice glicêmico, como legumes, grãos integrais e proteínas magras.");
            results.push("Exercícios aeróbicos e resistência, como caminhada rápida, natação ou musculação, podem melhorar a sensibilidade à insulina.");
            results.push("Acompanhamento regular com o médico é fundamental para prevenir o desenvolvimento de diabetes.");
        } else if (value >= referenceValuesGlucose.diabetes.min) {
            results.push("Glicose elevada (126 mg/dL ou mais). Consulte seu médico para avaliação detalhada e possíveis tratamentos.");
            results.push("Sugestões: Reduza drasticamente o consumo de alimentos ricos em açúcar refinado. A dieta deve ser focada em alimentos integrais, vegetais e proteínas magras.");
            results.push("A prática regular de exercícios é essencial para controlar os níveis de glicose. Tente manter uma rotina de atividades físicas todos os dias.");
            results.push("Monitoramento constante da glicose e o acompanhamento médico são cruciais. Medicamentos podem ser necessários, dependendo da gravidade.");
        }
    }

    return results;
}

// Função para chamar a interpretação quando o formulário for enviado
function handleFormSubmit(event, examType) {
    event.preventDefault();

    let inputId, resultId;

    // Definindo os IDs específicos para cada exame
    if (examType === "cholesterol") {
        inputId = "total-cholesterol";
        resultId = "cholesterol-result";
    } else if (examType === "glucose") {
        inputId = "glucose-level";
        resultId = "glucose-result";
    }

    const value = parseFloat(document.getElementById(inputId).value);
    const results = interpretExam(examType, value);

    // Exibir os resultados
    document.getElementById(resultId).innerHTML = `
      <h3>Resultados do Exame de ${examType.charAt(0).toUpperCase() + examType.slice(1)}:</h3>
      <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
}

// Adicionando event listeners para os formulários
document.getElementById('cholesterol-form').addEventListener('submit', function (e) {
    handleFormSubmit(e, "cholesterol");
});

document.getElementById('glucose-form').addEventListener('submit', function (e) {
    handleFormSubmit(e, "glucose");
});
