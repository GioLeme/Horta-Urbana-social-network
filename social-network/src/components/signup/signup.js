import React, { useState } from "react";
import Button from "../button/button";
import Input from "../input/input";
import fire from  '../../config/firebase'
import SweetAlert from "sweetalert2-react";
import { withRouter, Link } from "react-router-dom";
import style from '../login/login.module.css'

function SignupComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    show: false,
    title:'',
    type:''
  });

  function SignupFunc() {
    return (
      <form onSubmit={newUser} className={style.loginComponent}>
       <div className={style.elements}>
          <Input
            type="text"
            placeholder="Nome"
            required
            onChange={e => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            required
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className={style.elements}>
          <Button
            type="submit"
            className="btn btn-primary"
            id="btn-new-user"
            title="Cadastrar"
          />
          <span> 
            Já é membro? 
            <Link to="/login" className="link">
              Faça login
            </Link>
          </span>
        </div>
    </form>
    );
  }

  function newUser(e) {
    e.preventDefault()
    if (email.length > 0 && password.length > 0 && name.length > 0) {
      fire.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          if (user) {
            user.updateProfile({ displayName: name })
              .then(res => res)
              .catch(err => err)
          }
        })
        .catch((err) => {
          setMessage({
            show : true,
            title:'Erro ao realizar o cadastro',
            type:'error'
          })
          setTimeout(() => {
            setMessage({})
          }, 3000);
        });
    } else {
      alert('Preencha todos os campos para realizar seu cadastro!')
    }
  }

  return (
    <main className={`${style.main} shadow`}>
      <h1 className={style.messageLogin}>CRIE SUA CONTA</h1>
      {SignupFunc()}
      <SweetAlert
        show={message.show}
        type={message.type}
        title={message.title}
        showConfirmButton={false}
      />
    </main>
  );
}

export default withRouter(SignupComponent);