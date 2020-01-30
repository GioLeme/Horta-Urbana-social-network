import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import fire from "../../config/firebase";
import NewPost from '../newPost/newPost'
import PostList from '../postList/postList'
import style from './profile.module.css'

function ProfileComponent(props) {
  const [user, setUser] = useState({});
    
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) { 
        setUser(user)
      } else {
        props.history.push("/");
      }
    })
  }, [props.history]);

  return (
    <div className={style.profilePage}>
        <h1>Olá, {user.displayName}!</h1>
        <NewPost user={user}/>
        <PostList  user={user} filterByUser={true}/>     
    </div>
  )
}

export default withRouter(ProfileComponent)
