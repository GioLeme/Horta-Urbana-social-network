import Button from '../components/button.js';
import Input from '../components/input.js';

function loginUser() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  // console.log('Entrou!!!!!!' + name);
  auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred.user);
    })
    .catch((error) => {
      errorMessage = error.message;
      alert(errorMessage);
    });
}

function signIn(provider) {
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      // window.location.hash="#feed"
      if (result.credential) {
        const token = result.credential.accessToken;
      }
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      alert(errorCode + errorMessage + email);
    });
}

function loginGoogleUser() {
  const provider = new firebase.auth.GoogleAuthProvider();
  signIn(provider);
}

function Login() {
  const userLogin = `
  ${Input({
    type: 'email',
    class: 'email-input',
    placeholder: 'Email',
  })}
  ${Input({
    type: 'password',
    class: 'password-input',
    placeholder: 'Senha',
  })}
  ${Button({
    id: 'btn-log-in',
    class: 'btn',
    onclick: loginUser,
    title: 'Login',
  })}
  ${Button({
    id: 'authGoogleButton',
    class: 'btn btn-lg btn-danger fa fa-google fa-2x',
    onclick: loginGoogleUser,
    title: 'G',
    // < i class= 'fa fa-google fa-2x'></i>
  })}
  `;
  const template = `
  <img src="./img/pluto-floral-and-botanical-growth.png">
  <form class="form-content">
  <h1>Horta Urbana</h1>
  ${userLogin}
  <p>Ainda não é membro?<a href='#'> Cadastre-se!</a></p>
  </form>
  `;
  return template;
}
export default Login;
window.signIn = signIn;