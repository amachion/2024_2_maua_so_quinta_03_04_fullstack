const protocolo = "http://";
const baseURL = "localhost:3000";

function exibirFilmes(filmes) {
  let tabela = document.querySelector(".filmes");
  let corpoTabela = tabela.getElementsByTagName("tbody")[0];
  corpoTabela.innerHTML = "";
  for (let filme of filmes) {
    let linha = corpoTabela.insertRow(0);
    let celulaTitulo = linha.insertCell(0);
    let celulaSinopse = linha.insertCell(1);
    celulaTitulo.innerHTML = filme.titulo;
    celulaSinopse.innerHTML = filme.sinopse;
  }
}
function exibeAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor);
    alert.innerHTML = innerHTML;
    //... é o operador spread
    //ele é aplicado a um array para desmembrar seus elementos, isto é, uma lista
    alert.classList.add(...classesToAdd);
    alert.classList.remove(...classesToRemove);
    setTimeout(() => {
      alert.classList.remove(...classesToAdd);
      alert.classList.add(...classesToRemove);
    }, timeout);
}
async function obterFilmes() {
  const filmesEndpoint = "/filmes";
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  const filmes = (await axios.get(URLcompleta)).data;
  exibirFilmes(filmes);
}
async function cadastrarFilme() {
  const filmesEndpoint = "/filmes";
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  let tituloInput = document.querySelector("#tituloInput");
  let sinopseInput = document.querySelector("#sinopseInput");
  let titulo = tituloInput.value;
  let sinopse = sinopseInput.value;
  tituloInput.value = "";
  sinopseInput.value = "";
  if (titulo && sinopse) {
    const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data;
    exibirFilmes(filmes);
  } else {
    exibeAlerta(".alert-filme", "Preencha todos os campos!", ["show", "alert-danger"], ["d-none"], 2000);
  }
}
async function cadastrarUsuario() {
  let usuarioCadastroInput = document.querySelector("#usuarioCadastroInput");
  let passwordCadastroInput = document.querySelector("#passwordCadastroInput");
  let usuarioCadastro = usuarioCadastroInput.value;
  let passwordCadastro = passwordCadastroInput.value;
  usuarioCadastroInput.value = "";
  passwordCadastroInput.value = "";
  let modalCadastro = bootstrap.Modal.getInstance(document.querySelector("#modalCadastro"));
  if (usuarioCadastro && passwordCadastro) {
    try {
      const cadastroEndpoint = "/signup";
      const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`;
      await axios.post(URLcompleta, {
        login: usuarioCadastro,
        password: passwordCadastro,
      });
      exibeAlerta(
        ".alert-modal-cadastro", "Usuário cadastrado com sucesso",
        ["show", "alert-success"], ["d-none"], 2000);
      setTimeout (() => modalCadastro.hide(), 2000)
    } catch (e) {
        exibeAlerta(
            ".alert-modal-cadastro", "Não foi possível cadastrar o usuário!!!",
            ["show", "alert-danger"], ["d-none"], 2000)
        setTimeout (() => modalCadastro.hide(), 2000)
    }
  } else {
    exibeAlerta(
      ".alert-modal-cadastro", "Preencha todos os campos!!!",
      ["show", "alert-danger"], ["d-none"], 2000)
  }
}

const fazerLogin = async () => {
  let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
  let passwordLoginInput = document.querySelector('#passwordLoginInput')
  let usuarioLogin = usuarioLoginInput.value
  let passwordLogin = passwordLoginInput.value
  let modalLogin = bootstrap.Modal.getInstance(document.querySelector("#modalLogin"));
  if (usuarioLogin && passwordLogin) {
    try {
      const loginEndpoint = '/login'
      const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`
      const response = await axios.post(
        URLcompleta,
        {login: usuarioLogin, password: passwordLogin}
      )
      //console.log (response.data)
      localStorage.setItem("token", response.data)
      usuarioLoginInput.value=""
      passwordLoginInput.value=""
      exibeAlerta('.alert-modal-login', "Usuário logado com sucesso", ['show', 'alert-success'], ['d-none'], 2000)
      setTimeout(() => modalLogin.hide(), 2000)
      const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
      cadastrarFilmeButton.disabled = false
      const loginLink = document.querySelector('#loginLink')
      loginLink.innerHTML = "Logout"
    }
    catch (e) {
      exibeAlerta('.alert-modal-login', "Falha na autenticação", ['show', 'alert-danger'], ['d-none'], 2000)
    }
  }
  else {
    exibeAlerta(
      ".alert-modal-login", "Preencha todos os campos!!!", ["show", "alert-danger"], ["d-none"], 2000)
  }
}