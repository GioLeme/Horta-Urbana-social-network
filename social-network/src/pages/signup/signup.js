import React from 'react'
import DesktopImg from '../../assets/background-login.jpg'
import MobileImg from '../../assets/logo.png'
import SignupComponent from '../../components/signup/signup'
import style from '../login/login.module.css'


function Signup() {
    return (
        <main className={style.main}>
            <section className={style.sectionComponent}>
                <article className={style.loginComponent}>
                    <SignupComponent />
                </article>
                <aside className={style.backgroundImage}>
                    <img src={DesktopImg} alt="horta urbana" className="hide-mobile" /> 
                    <img src={MobileImg} alt="horta urbana" className="hide-desktop" />
                </aside>
            </section>
        </main>
    )
}

export default Signup
