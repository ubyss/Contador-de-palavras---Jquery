var numeroPalavras = $(".frase").text().trim().split(" ").length;

console.log(numeroPalavras);

var campoDigitacao = $(".campo-digitacao");
var tempoInicial = $(".tempo-restante").text();
$(".word-count").text(numeroPalavras);

$(() => {
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();

  campoDigitacao.one("focus", inicializaCronometro);
  
});

function inicializaContadores() {
  campoDigitacao.on("input", () => {
    $("#contador-caracteres").text(campoDigitacao.val().length);
    $("#contador-palavras").text(campoDigitacao.val().split(" ").length);
  });
}

$("#btn-reiniciar").click(() => {
  campoDigitacao.attr("disabled", false);
  campoDigitacao.val("");
  $(".tempo-restante").text(tempoInicial);
  campoDigitacao.toggleClass("campo-desativado");
  campoDigitacao.removeClass("borda-verde");
  campoDigitacao.removeClass("borda-vermelha");
});

function inicializaCronometro() {
  var tempoRestante = $(".tempo-restante").text();
  campoDigitacao.one("focus", () => {
    var cronometro = setInterval(() => {
      tempoRestante--;
      $(".tempo-restante").text(tempoRestante);

      if (tempoRestante < 1) {
        clearInterval(cronometro);
        finalizarJogo();
      }
    }, 1000);
  });
}

function finalizarJogo() {
  campoDigitacao.attr("disabled", true);
  campoDigitacao.toggleClass("campo-desativado");
  inserePlacar();
}

function inicializaMarcadores() {
  var frase = $(".frase").text().trim();

  campoDigitacao.on("input", () => {
    var digitado = campoDigitacao.val();
    var comparavel = frase.substr(0, digitado.length);

    if (digitado == comparavel) {
      campoDigitacao.addClass("borda-verde");
      campoDigitacao.removeClass("borda-vermelha");
    } else {
      campoDigitacao.removeClass("borda-verde");
      campoDigitacao.addClass("borda-vermelha");
    }
  });
}

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Thiago"
  var numPalavras = $('#contador-palavras').text()

  var linha = novaLinha(usuario, numPalavras)
  linha.find('.botao-remover').click(removeLinha)

  corpoTabela.append(linha);
}

function novaLinha(usuario, palavras){

  var linha = $('<tr>')
  var colunaUsario = $('<td>').text(usuario)
  var colunaPalavras = $('<td>').text(palavras)
  var colunaRemover = $('<td>').append($('<a>'))

  var link = $('<a>').addClass('botao-remover').attr('href', '#')
  var icone = $('<i>').addClass('small').addClass('material-icons').text('delete')

  link.append(icone)
  colunaRemover.append(link)
  linha.append(colunaUsario)
  linha.append(colunaPalavras)
  linha.append(colunaRemover)

  return linha
}

function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove()
}

$('.btn-delete').click(removeLinha)

