import React, { useState} from "react";
import Textarea from "../textarea/textarea";
import Button from "../../components/button/button";
import fire from "../../config/firebase";
import style from "./postTemplate.module.css"
import moment from "moment";

function PostTemplate({ post, user, postId }) {
  const [postText, setPostText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  function editPost() {
    return (
      <>
        <Textarea
          className="text-area"
          id="edit-textarea"
          value={postText}
          placeholder="Editar post"
          onChange={e => setPostText(e.target.value)}
        />
        <div style={{display: 'flex'}}>
          <Button
            id="btn-cancel"
            className="btn btn-danger"
            onClick={cancelEdit}
            title="Cancelar"
          />
          <Button
            id="btn-save"
            className="btn btn-primary"
            onClick={saveEditPost}
            disabled={postText.length < 2}
            title="Salvar"
          />
        </div>
      </>
    );
  }

  function saveEditPost() {
    fire
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        text: postText
      });
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function likePost() {
    const hasUser = post.likes.includes(user.uid);
    if (!hasUser) {
      fire
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          likes: [...post.likes, user.uid]
        });
    }
  }

  function deletePost() {
    if (!window.confirm("Tem certeza que deseja excluir essa publicação?"))
      return;
    fire
      .firestore()
      .collection("posts")
      .doc(postId)
      .delete()
      .then();
  }

  function addComment() {
    return (
      <div className={style.editAndCommentArea}>
        <Textarea
          className="text-area"
          placeholder="Escreva um comentário"
          onChange={e => setCommentText(e.target.value)}
        />
        <div style={{display: 'flex'}}>
          <Button
            type="button"
            className="btn btn-danger"
            id="btn-comment-cancel"
            onClick={cancelComment}
            title="Cancelar"
          />
          <Button
            type="button"
            className="btn btn-primary"
            id="btn-comment-post"
            onClick={saveComment}
            title="Postar"
          />
        </div>
      </div>
    );
  }

  function saveComment() {
    fire
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        comments: [
          ...post.comments,
          {
            author_name: user.displayName,
            author_id: user.uid,
            comment_id: Math.floor(Math.random() * 1000),
            comment_text: commentText
          }
        ]
      });
      setIsCommenting(false)
  }

  function deleteComment(id) {
    if (!window.confirm("Tem certeza que deseja excluir esse comentário?"))
      return;
    const filteredComments = post.comments.filter(
      ({ comment_id }) => comment_id !== id
    );

    fire
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        comments: filteredComments
      });
  }

  function cancelComment() {
    setIsCommenting(false);
  }

  function commentList() {
    return (
      <>
        {
          post.comments.length >= 1 ?
          (
            <span className={style.commentsTitle}>
              Comentários:
            </span>
          ) : ''
        }
        {
        post.comments.map(actualComment => (
        <article 
          key={actualComment.comment_id}
          className={style.postCard}
        >
          <header className={style.header}>
            <div style={{flex: 1}} className={style.headerTitle}>
              <h2>{actualComment.author_name}</h2>
            </div>
            {user.uid === actualComment.author_id ? (
              <div
                className="fill-red image-icon fa fa-trash"
                onClick={() => deleteComment(actualComment.comment_id)}
              />
            ) : (
              ""
            )}
          </header>
          <div className={style.postContent}>
          <p>{actualComment.comment_text}</p>
          </div>
        </article>
      ))}
    </>
    )
  }

  return (
    <>
      <article className={style.postCard}>
        <header className={style.header}>
          <div 
            className={style.headerTitle}
            style={{flex: 1}}
          >
            <h2>{post.user_name}</h2>
            <small> {moment(post.createdAt).format("DD/MM/YYYY HH:mm:ss")}</small>
          </div>
          <div className={style.headerTitle}>
            {user.uid === post.user_id ? (
              <>
                <div
                  className="image-icon fa fa-pencil"
                  onClick={() => {
                    setIsEditing(true)
                    setPostText(post.text)
                  }}
                />
                <div 
                  className="fill-red image-icon fa fa-trash"
                  onClick={deletePost}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </header>
        <div className={style.postContent}>
          {
            isEditing 
            ? editPost() 
            : (
              <>
              
              <p>{post.text}</p>
              {
                post.image_url 
                  ? <img src={post.image_url} alt="Imagem do post" style={{ maxWidth: "300px" }}/> 
                  : ''
              }
              </>
            )
          }
        </div>
        <footer className={style.footer}>
          <div>
            <div 
              className="fill-green image-icon fa fa-heart" 
              onClick={likePost} 
            />
            <p style={{marginLeft: '15px'}}>{post.likes.length || ""}</p>
          </div>
          <div
            className="image-icon fa fa-comments"
            onClick={() => setIsCommenting(true)}
          />
        </footer>
        {isCommenting ? addComment() : ""}
      </article>
      {commentList() || ""}
    </>
  );
}

export default PostTemplate;
