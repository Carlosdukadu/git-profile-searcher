let _url = "https://api.github.com/users/";
let _labelInput = document.getElementById("labelInput");
let _perfilDigitado = document.getElementById("perfilDigitado");
let botao = document.getElementById("btnBuscar");
// console.log(botao, "---------------- variavel BOTAO");
const containerEl = document.querySelector("#card");

/************** PEGAR CLICK E CHAMAR FUNÇÃO GERAR URL ********************/
/*************************************************************************/
// const inputEle = document.getElementById('btnBuscar');
// inputEle.addEventListener('keyup', function (e) {
//     var key = e.which || e.keyCode;
//     if (key == 13) { // codigo da tecla enter
//         // colocas aqui a tua função a rodar
//         alert('carregou enter o valor digitado foi: ' + this.value);
//     }
// });

const URL = 'https://api.github.com/users/';
const ajaxRequest = (url, user) => fetch(url + user);

let _perfilDigitadoAtual = '';

// _perfilDigitado.addEventListener("keyup", (e) => {
//     console.log(e.keyCode, '----keyCode----');
//     console.log(_perfilDigitado.value, '----_perfilDigitado----');
//     // _perfilDigitadoAtual = _perfilDigitado
//     if (e.keyCode == 13) {
//         // console.log(e, "-----click addEventListener----");
//         e.stopPropagation;
//         // PARAMETROS: URL DA API + NOME USUÁRIO A PESQUISAR
//         ajaxRequest(URL, _perfilDigitado.value).then((res) => res.status !== 200 ? handleError(res) : res.json().then((e) => gerarCards(e)))
//     } 

// });

// PARAMETROS: URL DA API + NOME USUÁRIO A PESQUISAR
botao.addEventListener("click", (e) => {
    // console.log(e, "-----click addEventListener----");
    e.stopPropagation;
    // PARAMETROS: URL DA API + NOME USUÁRIO A PESQUISAR
    if (metodoVerificarVazio(_perfilDigitado) === true) {
        mostrarMensagemDeErroVazio()
        return
    } else if (chamadaRepetida(_perfilDigitado) === true) {
        mostrarMensagemDeErroUsuarioJaExibido()
        return
    } else {
        chamadaApi()
        _perfilDigitadoAtual = _perfilDigitado.value

    }
});

/************************* MÉTODOS PARA RECEBER PROCESSAR DADOS DA API ******************************/
/****************************************************************************************************/
function chamadaApi() {

    ajaxRequest(URL, _perfilDigitado.value).then((res) => res.status !== 200 ? handleError(res) : res.json().then((e) => metodoPrincipal(e)))

}

/************************************ MÉTODO PARA GERAR CARDS **********************************/
/************************************************************************************************/
function gerarCards(myJson) {
    var parseDataLong = Date.parse(`${myJson.created_at}`);
    var data = new Date (parseDataLong)
    console.log(data, '----data');
    // saída: 1580266800000

    var parseDataISO = Date.parse(`${myJson.created_at}`);
    var dataISO = new Date (parseDataISO)
    console.log(dataISO, '----dataISO');
    // saída: 1580256000000

    var parseDataShort = Date.parse(`${myJson.created_at}`);
    var dataShort = new Date (parseDataShort);
    dataShort = dataShort.toLocaleString('en-GB', { timeZone: 'UTC' })
    console.log(dataShort, '----dataShort');
    // saída: 1580266800000


    // _perfilDigitadoAtual = myJson.login;
    let html = '';
    html += `
          <div class="container-fluid">
          <div class="row">
              <div class="col-12 mt-3">
                  <div class="card">
                      <div class="card-horizontal">
                          <div class="img-square-wrapper divImgPerfil">
                              <img class="" id="imgFotoPerfil" src="${myJson.avatar_url}" alt="Card image cap">
                          </div>
                          <div class="card-body">
                          <h4 class="card-title">Nome: ${myJson.name}</h4>
                          <p class="text-muted"">Login: ${myJson.login}</p>
                          <p class="text-muted"">Repositórios: ${myJson.public_repos}</p>
                          <p class="text-muted"">Seguidores: ${myJson.followers}</p>
                          <p class="text-muted"">Localização ${myJson.location}</p>
                          <p class="text-muted"">URL: ${myJson.html_url}</p>
                          <a href=${myJson.html_url} target="_blank" type="button" id="btnVerPerfil" class="btn btn-primary">ver perfil no GitHub</a>
                          </div>
                          <a href="#" id="foo"></a>
                      </div>
                      <div class="card-footer">
                          <small class="text-muted"> PERFIL CRIADO EM ${dataShort}</small>
                      </div>
                  </div>
              </div>
          </div>
      </div>
            `;

    enviarDadosParaHtml(html);
}

/************************* MÉTODOS PARA ENVIAR CARDS PARA HTML ******************************/
/********************************************************************************************/
function enviarDadosParaHtml(a) {
    card.innerHTML = a; // insere o conteúdo na div container do HTML
}

/************************* MÉTODOS DE VERIFICAÇÃO CAMPO VAZIO E URL DIFERENTE ******************************/
/***********************************************************************************************************/

let metodoVerificarVazio = (campoUrl) => campoUrl.value === '' || campoUrl.value === null ? true : false;

function chamadaRepetida(e) {
    console.log(e, '-----e chamadaRepetida----');
    console.log(_perfilDigitado.value, '----_perfilDigitado chamadaRepetida----');
    console.log(_perfilDigitadoAtual, '----_perfilDigitadoAtual chamadaRepetida----');

    if (_perfilDigitadoAtual === _perfilDigitado.value) {
        console.log(_perfilDigitadoAtual, '----_perfilDigitadoAtual chamadaRepetida DENTRO DO IFFFFFFFF----');
        return true;
    } else {
        console.log(_perfilDigitadoAtual, '----_perfilDigitadoAtual chamadaRepetida DENTRO DO ELSE----');
        return false;
    };

}

// function metodoVerificarVazio (campoUrl) {
//     return (campoUrl.value === "" ? true : false)
// }

/************************* MÉTODOS DE MENSAGEM DE ERRO ******************************/
/************************************************************************************/
function mostrarMensagemDeErroVazio() {
    _labelInput.textContent = "Insira algum perfil para proseguir!";
    _labelInput.style.visibility = "visible";

    setTimeout(function () {
        // _labelInput.hide(); // "foo" é o id do elemento que seja manipular.
        _labelInput.style.visibility = "hidden";
    }, 2500);
}

function mostrarMensagemDeErroUsuarioNãoEncontrado() {
    _labelInput.textContent = "Usuario não encontrado";
    _labelInput.style.visibility = "visible";

    setTimeout(function () {
        // _labelInput.hide(); // "foo" é o id do elemento que seja manipular.
        _labelInput.style.visibility = "hidden";
    }, 2500);

}

function mostrarMensagemDeErroUsuarioJaExibido() {
    _labelInput.textContent = "Usuario ja exibido";
    _labelInput.style.visibility = "visible";

    setTimeout(function () {
        // _labelInput.hide(); // "foo" é o id do elemento que seja manipular.
        _labelInput.style.visibility = "hidden";
    }, 2500);
}

function handleError(response) {

    // console.log(response.json().then((response) => response), '----response.json() handleError----');
    console.log(response, '----response handleError----');

    if (response.status === 404) {
        response.json().then((response) => console.log(response.message, '----response.message----'))
        mostrarMensagemDeErroUsuarioNãoEncontrado()
    }
}

$(document).ready(function() { 
    window.location.href='#foo';
    });

/************************* MÉTODOS PRINCIPAL ******************************/
/**************************************************************************/
function metodoPrincipal(e) {

    if (metodoVerificarVazio(_perfilDigitado.value) === true) {
        mostrarMensagemDeErroVazio()
        return
    }
    // else if (chamadaRepetida(e) === true) {
    //     mostrarMensagemDeErroUsuarioJaExibido()

    // }
    else {
        console.log(ajaxRequest, '----ajaxRequest  metodoPrincipal----');


        gerarCards(e)
        // _perfilDigitado = '';
    }
}





















/*
_urlDigitada.addEventListener('keyup', function(e){
    const inputUrl = e.target;
    const valueInputUrl = e.target.value;
    
    if(valueInputUrl.length == url){
        inputUrl.classList.remove('--has-error');
    } else {
        inputUrl.classList.add('--has-error');
    }
})
 
*/

// botao.onclick = this._gerarCards;
// this.gerarCards();
// return JSON.stringify(json);
// this.gerarCards();
//  console.log('Clik no botão para comparar e consultar URL');


//    / Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

let _msgModal = document.getElementsByClassName('msgModal');

// When the user clicks on the button, open the modal
// btn.onclick = function() {
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}