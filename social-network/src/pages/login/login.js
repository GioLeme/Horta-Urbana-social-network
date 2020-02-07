import React, { useEffect, useState } from "react";
import LoginComponent from "../../components/login/login";
import SplashScreen from '../../assets/splash-screen.png'
import DesktopImg from '../../assets/background-login.jpg'
import MobileImg from '../../assets/logo.png'
import style from './login.module.css'


function Login() {
  const [shouldShowImage, setShouldShowImage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShouldShowImage(false)
    }, 1500);
  }, []);

  return (
    <main className={style.main}>
      {shouldShowImage 
      ? <img src={SplashScreen} alt="Carregando" className={style.splashScreen}/> 
      : 
      <section className={style.sectionComponent}>
        <article className={style.loginComponent}>
        <LoginComponent /> 
        </article>
        <aside className={style.backgroundImage}>
          <img src={DesktopImg} alt="Horta urbana" className="hide-mobile" /> 
          <img src={MobileImg} alt="Horta urbana" className="hide-desktop" /> 
        </aside>
      </section>
    }
    </main>
  );
}

export default Login;
