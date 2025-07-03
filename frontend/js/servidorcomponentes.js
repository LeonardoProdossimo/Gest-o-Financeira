function getListaCategorias() {
    abrirLoading()

    fetch(getApiUrl(API_CONFIG.endpoints.componentes.categoria) + '?ativo=true',
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => selectCategorias(dados.message))
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            getListaTipos()
        });
}

function getListaTipos() {

    fetch(getApiUrl(API_CONFIG.endpoints.componentes.tipo),
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => selectTipos(dados.message))
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            getTransacoes()
        });
}