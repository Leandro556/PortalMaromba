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
    document.getElementById('imc').value = parseFloat(imc).toFixed(2);
    verificarIMC(imc);
    } else {
    document.getElementById('imc').value = "## ERRO CONFIRA SE AS INFORMAÇOES ESTAO CORRETAS ##";
    }
    });
    
function verificarIMC(imc) {
  // MUITO ABAIXO DO PESO
      if (imc < 17) {
        setTimeout(function () {
          window.location.href = 'http://127.0.0.1:5500/Paginas/muito_abaixo_do_peso.html';
        }, 3000);
    // createMessage("Muito abaixo do peso", "alert")
    } else 

    // ABAIXO DO PESO 
      if (imc > 17 && imc <= 18.49){
        setTimeout(function () {
          window.location.href = 'http://127.0.0.1:5500/Paginas/abaixo_do_peso.html';
        }, 3000);
    // createMessage("Abaixo do peso", "warning")
    } else 

    // PESO NORMAL
      if (imc >= 18.5 && imc <= 24.99){
        setTimeout(function () {
          window.location.href = 'http://127.0.0.1:5500/Paginas/normal.html';
        }, 3000);
    // createMessage("Peso normal", "sucess")
    } else 

    // ACIMA DO PESO 
      if (imc >= 25 && imc <= 29.99){
        setTimeout(function () {
          window.location.href = 'http://127.0.0.1:5500/Paginas/acima_do_peso.html';
        }, 3000);
    // createMessage("Acima do peso", "warning")
    } else 

    // OBESIDADE 1
      if (imc >= 30 && imc <= 34.99){
        setTimeout(function () {
          window.location.href = 'http://127.0.0.1:5500/Paginas/obesidade1.html';
        }, 3000);
    // createMessage("Obesidade I", "alert")
    } else {

      // OBESIDADE 2
      setTimeout(function () {
        window.location.href = 'http://127.0.0.1:5500/Paginas/obesidade2.html';
      }, 3000);
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
      