let cartas = [];
let pontosJogador = 0;
let pontosComputador = 0;

async function CarregarCartas()
{
    try
    {
        const resposta = await fetch("./cartas.json");

        if (!resposta.ok)
        {
            throw new Error("Erro ao carregar o JSON.");
        }

        cartas = await resposta.json();

        mostrarCarta();

        document.getElementById("resultado").textContent =
        "Escolha uma carta!";
    }
    catch (erro)
    {
        document.getElementById("resultado").textContent =
        "Não foi possível carregar as cartas.";

        console.error(erro);
    }
}

function mostrarCarta()
{
    const areaCartas = document.getElementById("cartas");

    areaCartas.innerHTML = "";

    for (let i = 0; i < cartas.length; i++)
    {
        const botao = document.createElement("button");

        botao.className = "carta";

        botao.innerHTML =
        "<strong>" + cartas[i].nome + "</strong>" +
        "<br>Força: " + cartas[i].forca;

        botao.addEventListener("click", function()
        {
            jogar(i);
        });

        areaCartas.appendChild(botao);
    }
}

function jogar(indiceJogador)
{
    const cartaJogador = cartas[indiceJogador];

    // O computador escolhe uma carta aleatória
    const indiceComputador = Math.floor(Math.random() * cartas.length);
    const cartaComputador = cartas[indiceComputador];

    let mensagem =
    "Você jogou " + cartaJogador.nome + " (" + cartaJogador.forca + "). " +
    "O computador jogou " + cartaComputador.nome + " (" + cartaComputador.forca + "). ";

    if (cartaJogador.forca > cartaComputador.forca)
    {
        pontosJogador++;
        mensagem += "Você ganhou!";
    }
    else if (cartaJogador.forca < cartaComputador.forca)
    {
        pontosComputador++;
        mensagem += "O computador ganhou!";
    }
    else
    {
        mensagem += "Empate!";
    }

    document.getElementById("resultado").textContent = mensagem;

    atualizarPlacar();
}

function atualizarPlacar()
{
    document.getElementById("pontosJogador").textContent = pontosJogador;
    document.getElementById("pontosComputador").textContent = pontosComputador;
}

function reiniciarPlacar()
{
    pontosJogador = 0;
    pontosComputador = 0;

    atualizarPlacar();

    document.getElementById("resultado").textContent =
    "Placar reiniciado! Escolha uma carta.";
}

document.getElementById("reiniciar").addEventListener("click", reiniciarPlacar);

CarregarCartas();
