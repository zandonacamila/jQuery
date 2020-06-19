$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").show();
    
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function() {
        $("#erro").toggle();
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
    var fraseNova = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    fraseNova.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").show();

    var fraseId = $("#frase-id").val();
    console.log(fraseId);
    var dados = { id: fraseId};

    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function() {
        $("#erro").toggle();
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial();
}