const containerVideos =  document.querySelector('.videos__container')

async function buscarEMostrarVideos (){
    try {
    const busca = await fetch('http://localhost:3000/videos');
    const videos = await busca.json();
    
        videos.forEach((video) => {
            if (video.categoria == '') {
                throw new Error('Vídeo não tem categoria')
            }
                containerVideos.innerHTML += `
                    <li class="videos__item">
                        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                        <div class="descricao-video">
                            <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                            <h3 class="titulo-video">${video.titulo}</h3>
                            <p class="titulo-canal">${video.descricao}</p>
                            <p class="categoria" hidden>${video.categoria}</p>
                        </div>
                    </li>
                `;
            })
        } catch(error){
            containerVideos.innerHTML += `<p>Houve um erro ao carregar os videos: ${error} </p>`
        }
}

buscarEMostrarVideos();

const barraDePerquisa = document.querySelector('.pesquisar__input');

barraDePerquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll('.videos__item');
    /*let ValorFiltro = barraDePerquisa.value.toLowerCase();

    videos.forEach((video) => {
        let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        video.style.display = ValorFiltro ? titulo.includes(ValorFiltro) ? 'block': 'none': 'block';
    })*/
    if (barraDePerquisa.value != '') {
        for (let video of videos) {
            let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
            let ValorFiltro = barraDePerquisa.value.toLowerCase();

            if (!titulo.includes(ValorFiltro)) {
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }
        }
    } else {
        video.style.display = "block";
    }
}

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => filtrarPorCtegoria(nomeCategoria));
});

function filtrarPesquisa(filtro) {
    const videos = document.querySelectorAll('.videos__item')
    for(let video of videos){
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let ValorFiltro = filtro.toLowerCase()

        if (categoria.includes(ValorFiltro) && ValorFiltro != 'tudo') {
            video.style.display = 'nome';
        } else {
            video.style.display = 'block';
        }
    }
}