var tempoInicial =  $("#tempo-digitacao").text()
var campo = $(".campo-digitacao");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    
    tamanhoFrase.text(numPalavras);
}

//contador de palavras e caracteres

function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();
        
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

//cronômetro
function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var cronometroId = setInterval(function(){
            tempoRestante--;
            // console.log(tempoRestante)
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1) {
                clearInterval(cronometroId); //para o cronômetro
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        console.log("Digitado: " + digitado);
        console.log("Compare: " + comparavel);
        
        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
    
        }
    });
}

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Camila";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href=''><i class='material-icons'>delete</i></a>";

    var linha = "<tr>" + 
                        "<td>" + usuario + "</td>" +
                        "<td>" + numPalavras + "</td>" +
                        "<td>" + botaoRemover + "</td>" +
                "</tr>";
    corpoTabela.prepend(linha)
}

$(".botao-remover").click(function(event) {
    event.preventDefault();
    console.log("oie");
});

//botão reiniciar

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");  
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
    
}





