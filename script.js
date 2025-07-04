const Sortear = document.getElementById('random-button')
const quantity = document.getElementById('quantity-input')
const rangeMin = document.getElementById('range-min-input')
const rangeMax = document.getElementById('range-max-input')
const repeat = document.getElementById('repeat')
const result = document.getElementById('result-container')
const replay = document.getElementById('replay-button')
const toggleLabel = document.querySelector('.toggle-label')
const drawContainer = document.querySelector('.draw-container')
const drawResult = document.querySelector('.draw-result') 

document.addEventListener('DOMContentLoaded', () => {
    Sortear.addEventListener('click', () => {
        const quantityValue = parseInt(quantity.value)
        const rangeMinValue = parseInt(rangeMin.value)
        const rangeMaxValue = parseInt(rangeMax.value)
        const repeatValue = repeat.checked
       
        console.log('Quandidade:' , quantityValue)
        console.log('rangeMinValue:' , rangeMinValue)
        console.log('rangeMaxValue:' , rangeMaxValue)
        console.log('repeatValue:' , repeatValue)
        
        // Verifica se algum dos valores inseridos não é um número
        if (isNaN(quantityValue) || isNaN(rangeMinValue) || isNaN(rangeMaxValue)) {
            alert('Por favor, preencha todos os campos corretamente.')

            return
        }

        // Verifica se o valor mínimo é maior ou igual ao valor máximo
        if (rangeMinValue >= rangeMaxValue) {
            alert('O valor  "Minimo" deve ser menor que o valor  "Maximo".')

            return
        }

        // Verifica se a opção de **não repetir** está ativada,
        // e se a quantidade desejada é maior do que o total de números possíveis no intervalo
        if (!repeatValue && quantityValue > (rangeMaxValue - rangeMinValue + 1)) {
            alert('A quantidade é maior do que o total de números disponíveis sem repetir.')
            
            return
        }

      
        let numerosSorteados = []

        // Verifica se a opção de permitir repetições está ativada
        if (repeatValue) {

            // Se sim, executa um loop para sortear a quantidade de números desejada
            for (let i = 0; i < quantityValue; i++) {
                // Gera um número aleatório entre o valor mínimo e máximo
                let numero = Math.floor(Math.random() * (rangeMaxValue - rangeMinValue + 1) + rangeMinValue)
                
                // Adiciona o número sorteado ao array de resultados
                numerosSorteados.push(numero)
            }
        } else {
            // Caso **não** permita repetições:
            let todosNumeros = Array.from(
                { length: rangeMaxValue - rangeMinValue + 1}, 
                (_, i) => i + rangeMinValue // Preenche com valores de rangeMinValue até rangeMaxValue
            )

            
            // Embaralha o array para garantir aleatoriedade
            todosNumeros.sort(() => Math.random() - 0.5)

            // Seleciona apenas a quantidade desejada de números (sem repetição)
            numerosSorteados = todosNumeros.slice(0, quantityValue) // pega os primeiros 
        }

        
            
        // Limpa os números anteriores
        result.innerHTML = ''

        // Exibe os números sorteados no console com animação!
        function animateNumber(numero) {
             return new Promise(resolve => {
             const span = document.createElement('span')
             span.classList.add('draw-number')
             span.textContent = numero
             result.appendChild(span)
             setTimeout(resolve, 800) // espera 1000ms antes de seguir para o próximo
             })
        }

        mostrarNumerosAnimados(numerosSorteados)

        

            // Torna a div de resultado visível (remove a classe hidden, se tiver)
        document.querySelector('.draw-result').classList.remove('hidden')
        
        // Esconde a parte de configuração, se quiser
        document.querySelector('.draw-container').classList.add('hidden')
        

        // Uso
        async function mostrarNumerosAnimados(numeros) {
          for (const numero of numeros) {
            await animateNumber(numero)
          }
          console.log('Todos os números mostrados com animação')
        }

    })

    repeat.addEventListener('change', () => {
        if (repeat.checked) {
            toggleLabel.textContent = 'Repetir'
        } else {
            toggleLabel.textContent = 'Não Repetir número'
        }
    })



    
    replay.addEventListener('click', () => {
        // Esconde o resultado
        drawResult.classList.add('hidden')

        // Mostra o formulário novamente
        drawContainer.classList.remove('hidden')

        //  Limpa os números do resultado
        result.innerHTML = ''

        quantity.value = ''
        rangeMin.value = ''
        rangeMax.value = ''
        repeat.checked = false

        toggleLabel.textContent = 'Não Repetir número'
    })

})       


