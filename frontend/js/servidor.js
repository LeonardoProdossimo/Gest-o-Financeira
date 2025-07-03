function getTransacoes(filtro) {
    abrirLoading()

    fetch(getApiUrl(API_CONFIG.endpoints.financeiro)
        + '?descricao=' + document.querySelector("#inputdescricaofiltro").value
        + '&datainicio=' + document.querySelector("#inputdatainiciofiltro").value
        + '&datafinal=' + document.querySelector("#inputdatafinalfiltro").value
        + '&tipo=' + document.querySelector("#inputtipofiltro").value
        + '&idcategoria=' + document.querySelector("#inputcategoriafiltro").value,
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => {
            if (dados.success) {
                listaTransacoes(dados)
                if (filtro) {
                    modalFiltro.hide()
                }
            } else {
                toast(dados.message, dados.success);
            }
        })
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharLoading()
        });
}

function getTransacao(id) {
    abrirLoading()
    fetch(getApiUrl(API_CONFIG.endpoints.financeiroEditar) + "?idfinanceiro=" + id,
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => {
            if (dados.success) {
                editar(dados.message[0])
            } else {
                toast(dados.message, dados.success);
            }
        })
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharLoading()
        });
}

function postTransacao(obj) {
    abrirLoading()
    let body = JSON.stringify(obj);
    let endereco = getApiUrl(API_CONFIG.endpoints.financeiro);
    let metodo = "POST";

    fetch(endereco,
        {
            method: metodo,
            body: body,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(function (retorno) {
            if (retorno.success) {
                toast("Transação adicionada com sucesso!", retorno.success);
            } else {
                toast(retorno.message, retorno.success);
            }
        })
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharModal();
            getTransacoes();
        });
}

function putTransacao(obj, id) {
    obj.idfinanceiro = id;
    abrirLoading()
    let body = JSON.stringify(obj);
    let endereco = getApiUrl(API_CONFIG.endpoints.financeiro);
    let metodo = "PUT";

    fetch(endereco,
        {
            method: metodo,
            body: body,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(function (retorno) {
            if (retorno.success) {
                toast("Transação alterada com sucesso!", retorno.success);
            } else {
                toast(retorno.message, retorno.success);
            }
        })
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharModal()
            getTransacoes();
        });
}


function deleteTransacao(id) {
    abrirLoading()
    var body = JSON.stringify({ "idfinanceiro": id });
    fetch(getApiUrl(API_CONFIG.endpoints.financeiro),
        {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: body
        })
        .then(resp => resp.json())
        .then(function (retorno) {
            if (retorno.success) {
                toast("Transação excluída com sucesso!", retorno.success);
            } else {
                toast(retorno.message, retorno.success);
            }
        }).finally(function () {
            getTransacoes();
        });
}

function getCategorias(filtro) {
    abrirLoading()

    fetch(getApiUrl(API_CONFIG.endpoints.categorias)
        + '?descricao=' + document.getElementById("inputdescricaofiltro").value
        + '&ativo=' + document.getElementById("inputsituacaofiltro").value,
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => {
            if (dados.success) {
                listaCategorias(dados)
                if (filtro) {
                    modalFiltro.hide()
                }
            } else {
                toast(dados.message, dados.success);
            }
        })
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharLoading()
        });
}

function getCategoria(id) {
    abrirLoading()
    fetch(getApiUrl(API_CONFIG.endpoints.categorias) + "?idcategoria=" + id,
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => {
            if (dados.success) {
                editar(dados.message[0])
            } else {
                toast(dados.message, dados.success);
            }
        }
        )
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharLoading()
        });
}

function postCategoria(obj) {
    abrirLoading()
    let body = JSON.stringify(obj);
    let endereco = getApiUrl(API_CONFIG.endpoints.categorias);
    let metodo = "POST";

    fetch(endereco,
        {
            method: metodo,
            body: body,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(function (retorno) {
            if (retorno.success) {
                toast("Categoria adicionada com sucesso!", retorno.success);
            } else {
                toast(retorno.message, retorno.success);
            }
        })
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharModal();
            getCategorias();
        });
}

function putCategoria(obj, id) {
    obj.idcategoria = id;
    abrirLoading()
    let body = JSON.stringify(obj);
    let endereco = getApiUrl(API_CONFIG.endpoints.categorias);
    let metodo = "PUT";

    fetch(endereco,
        {
            method: metodo,
            body: body,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(function (retorno) {
            if (retorno.success) {
                toast("Categoria alterada com sucesso!", retorno.success);
            } else {
                toast(retorno.message, retorno.success);
            }
        })
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharModal()
            getCategorias();
        });
}

