import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import fire from "../../config/firebase";
import NewPost from '../newPost/newPost'
import PostList from '../postList/postList'
import style from './feed.module.css'

function FeedComponent(props) {
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
    <div className={style.feedPage}>
      <NewPost user={user}/>
      <PostList user={user} filterByUser={false}/>
    </div>
  )
}

export default withRouter(FeedComponent)
