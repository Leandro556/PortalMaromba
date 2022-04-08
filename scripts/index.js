function validaEntrada(args) {
    for (let i = 0; i < arguments.length; i++) {
        if (!!arguments[i] == false || arguments[i] < 0) {
        return false;
    }else{
        return true;
}}
    }
    
function calcularIMC(kilos, altura) {
    altura = altura / 100;
    return (kilos / (altura * altura));
    }
    
    const formCalcularIMC = document.getElementById('form');
    
    formCalcularIMC.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const kilos = parseFloat(document.getElementById('kilos').value);
    const altura = parseFloat(document.getElementById('altura').value);
    
    if (validaEntrada(kilos, altura)) {
    const imc = calcularIMC(kilos, altura);
    document.getElementById('imc').innerHTML = `Seu imc: ` + parseFloat(imc).toFixed(2);
    verificarIMC(imc);
    } else {
    document.getElementById('imc').value = "## ERRO CONFIRA SE AS INFORMAÇOES ESTAO CORRETAS ##";
    }
    });
    
function verificarIMC(imc) {
  // MUITO ABAIXO DO PESO
      if (imc < 17) {
        setTimeout(function () {
          alert('Muito abaixo do peso');
        }, 15);
    // createMessage("Muito abaixo do peso", "alert")
    } else 

    // ABAIXO DO PESO 
      if (imc > 17 && imc <= 18.49){
        setTimeout(function () {
          alert('Abaixo do peso');
        }, 15);
    // createMessage("Abaixo do peso", "warning")
    } else 

    // PESO NORMAL
      if (imc >= 18.5 && imc <= 24.99){
        setTimeout(function () {
          alert('Peso normal');
        }, 15);
    // createMessage("Peso normal", "sucess")
    } else 

    // ACIMA DO PESO 
      if (imc >= 25 && imc <= 29.99){
        setTimeout(function () {
          alert('Acima do peso');
        }, 15);
    // createMessage("Acima do peso", "warning")
    } else 

    // OBESIDADE 1
      if (imc >= 30 && imc <= 34.99){
        setTimeout(function () {
          alert('Obesidade I');
        }, 15);
    // createMessage("Obesidade I", "alert")
    } else {

      // OBESIDADE 2
      setTimeout(function () {
        alert('Obesidade II');
      }, 15);
    // createMessage("Obesidade II", "danger")
    }
    }
    
function createMessage(msg, type) {
      document
        .querySelector("body")
        .insertAdjacentHTML("beforebegin", `<div class='message ${type}'>${msg}</div>`);
    
      setTimeout(function () {
        deleteMessage();
      }, 3000);
    }
    
function deleteMessage() {
        const list = document.querySelectorAll(".message");
        for (const item of list) {
          item.remove();
        }
      }
      