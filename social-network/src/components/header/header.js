import React, { useState, useEffect } from 'react'
import Button from '../button/button'
import fire from '../../config/firebase'
import { withRouter } from 'react-router-dom'
import logo from '../../assets/logo.png'
import style from './header.module.css'


function Header(props) {
    const [redirectTo, setRedirectTo] = useState({
        title: 'Perfil',
        link: '/profile',
    })

    props.history.listen((location) => {
        setRedirect(location.pathname)
    })
    useEffect(() => {
        setRedirect(props.history.location.pathname)
    }, [props.history.location.pathname])
    function setRedirect(path) {
        if (path === '/profile') {
            setRedirectTo({
                title: 'Feed',
                link: '/feed',
            })
        } else {
            setRedirectTo({
                title: 'Perfil',
                link: '/profile',
            })
        }
    }
    function logOut() {
        fire.auth().signOut()
        window.location.href = '/login'
    }

    function redirect() {
        props.history.push(redirectTo.link)
    }

    return (
        <>
            <header className={style.header}>
                <div className="hide-mobile">
                    <Button
                        type='button'
                        className={`btn ${style.profileBtn}`}
                        id='btn-profile'
                        onClick={redirect}
                        title={redirectTo.title}
                    />
                </div>
                <label className="hide-desktop" htmlFor='toggle-side-menu'>
                    <div className={`fa fa-bars ${style.menuIcon}`}></div>
                </label>
                <div className={style.headerImg}>
                    <img src={ logo } alt="horta urbana" />
                </div>
                <div className="hide-mobile">
                    <Button
                        type='button'
                        className={`btn ${style.logoutBtn}`}
                        id='btn-log-out'
                        onClick={ logOut }
                        title='Sair'
                    />
                </div>
                <input 
                    type='checkbox'
                    id='toggle-side-menu' 
                    className={`${style.toggleSideMenu} hide-desktop`}
                />
                <div className={`${style.sideMenu} hide-desktop`}>
                    <Button
                        type='button'
                        className={`btn ${style.profileBtn}`}
                        id='btn-profile'
                        onClick={redirect}
                        title={redirectTo.title}
                    />
                    <Button
                        type='button'
                        className={`btn ${style.logoutBtn}`}
                        id='btn-log-out'
                        onClick={ logOut }
                        title='Sair'
                    />
                </div>
        </header>
      </>
    )
}

export default withRouter(Header)
