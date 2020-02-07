import React, { useState, useEffect} from "react";
import fire from "../../config/firebase";
import PostTemplate from '../postTemplate/postTemplate'
import style from './postList.module.css'

function PostList({user, filterByUser}) {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    if (user) getPostFirebase()
  }, [user])

  function getPostFirebase() {
    return fire
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const postToList = snapshot.docs.map((post) => {
          if (filterByUser && post.data().user_id !== user.uid) return ''
          return ( 
            <div key={post.id} className={style.postContainer}>
              <PostTemplate
                post={post.data()}
                user={user}
                postId={post.id}
              />
              <div 
                className={style.divider}
              />
            </div>
           
          )
        });
        setPosts(postToList);
      })
  }

  return (
  <section className={style.postContainer}>
    {posts}
  </section>
  )
}

export default PostList;
