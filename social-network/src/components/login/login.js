import React, { useState } from "react";
import Button from "../../components/button/button";
import Input from "../../components/input/input.js";
import fire from "../../config/firebase";
import firebase from "firebase";
import { withRouter, Link } from "react-router-dom";
import SweetAlert from "sweetalert2-react";
import style from './login.module.css'


function LoginComponent(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  function loginForm() {
    return (
      <form onSubmit={signIn} className={style.loginComponent}>
       <div className={style.elements}>
        <Input
          type="email"
          className="email-input"
          placeholder="Email"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          className="password-input"
          placeholder="Senha"
          required
          onChange={e => setPassword(e.target.value)}
        />
        </div>
        <div className={style.elements}>
        <Button
          type="submit"
          className="btn btn-primary"
          id="btn-new-user"
          title="Login"
        />
        <Button
          id="authGoogleButton"
          className="btn btn-danger"
          onClick={loginGoogleUser}
          title="Entrar com Google"
          icon="fa fa-google"
          type="button"
        />
        <span> 
          Ainda não é membro? 
          <Link to="/signup" className="link">
            Cadastre-se
          </Link>
        </span>
        </div>
      </form>
    );
  }

  function signIn(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        if (cred.user) {
          props.history.push("/feed");
        }
      })
      .catch(err => {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 3000);
      });
  }

  function loginGoogleUser() {
    const provider = new firebase.auth.GoogleAuthProvider();
    signInWithAccount(provider);
  }

  function signInWithAccount(provider) {
    fire
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        props.history.push("/feed");
      });
  }

  return (
    <main className={`${style.main} shadow`}>
      <h1 className={style.messageLogin}>FAÇA SEU LOGIN</h1>
      {loginForm()}
      <SweetAlert
        show={show}
        type="error"
        title="Email e/ou senha inválidos"
        showConfirmButton={false}
      />
    </main>
  );
}

export default withRouter(LoginComponent);
