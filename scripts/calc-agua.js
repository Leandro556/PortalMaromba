function calculadora() {
  var n1 = parseFloat(document.getElementById("n1").value);
  var n2 = 0.04;
  resultado = n1 * n2;

  document.getElementById("resultado").innerHTML =
    `Você precisa tomar ` + resultado + ` litros de água por dia`;
}
