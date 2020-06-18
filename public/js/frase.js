$("#botao-frase").click(fraseAleatoria);

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