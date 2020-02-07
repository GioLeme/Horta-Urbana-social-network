import React, { useState } from "react";
import fire from "../../config/firebase";
import Textarea from "../textarea/textarea";
import Button from "../../components/button/button";
import Input from "../../components/input/input.js";
import moment from "moment";
import style from './newPost.module.css'

function NewPost({ user }) {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  return (
    <section className={style.card}>
      <Textarea
        className="text-area"
        onChange={e => setPostText(e.target.value)}
        placeholder="No que você está pensando?"
        value={postText}
      />
      <div
        className="image-preview-container"
        id="image-preview-container"
      />
      <Input
        type="file"
        className={style.inputPhoto}
        id="input-photo"
        onChange={uploadImage}
      />
      <div className={style.postFooter}>
      <Button
        type="button"
        className={ `btn btn-primary ${style.btnPost}`}
        id="btn-post"
        disabled={postText.length < 2}
        onClick={createPost}
        title="Postar"
      />
      {
        image 
          ? <img 
            src={image} 
            alt="Miniatura foto escolhida" 
            style={{maxWidth:'30px'}}
          /> 
          : ""
      }
      <div className="surpriseUsers" id="surpriseUsers">
        {showProgressBar ? (
          <progress
            value={percentage}
            max="100"
            id="uploader"
            className="upload-bar"
          >
            {percentage}%
          </progress>
        ) : (
          <label htmlFor="input-photo" className="fa fa-image image-icon" />
        )}
      </div>
      </div>
    </section>
  );

  function createPost() {
    const post = {
      likes: [],
      text: postText,
      comments: [],
      user_name: user.displayName,
      user_id: user.uid,
      image_url: image || null,
      createdAt: moment().valueOf(), // passar pra timestamp

    };

    fire
      .firestore()
      .collection("posts")
      .add(post)
      .then(() => {
        setPostText("");
        setImage("");
        setPercentage(0);
      })
      .catch(err => err)
  }

  function uploadImage(e) {
    const file = e.target.files[0];
    const storageRef = fire.storage().ref(`post_images/${file.name}`);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      snapshot => {
        const actualPercentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(actualPercentage);
        setShowProgressBar(true);
      },
      () => {
        console.log("err");
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          setImage(downloadURL);
          setShowProgressBar(false);
        });
      }
    );
  }
}

export default NewPost;
