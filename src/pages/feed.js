import Button from '../components/button.js';
import Input from '../components/input.js';

function createPost() {
  const text = document.querySelector('.text-area').value;
  const post = {
    likes: 0,
    text,
    comments: [],
    user_name: firebase.auth().currentUser.displayName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    privacy: 'public'
  };
  const postsCollection = firebase.firestore().collection('posts');
  postsCollection.add(post)
    .then(() => {
      console.log('Post criado com sucesso!');
      //text = ''
    })
    .catch((error) => {
      console.log('erro', error);
      console.log('Não foi possível criar post.');
    });
}

function printComments(arr) {
  let template = '';
  arr.forEach(text => {
    template += `<li class='comments-list'>${text}</li>`;
  });
  //console.log(post);
  return template;
}

function addPost(post, postId) {
  const postTemplate = `
    <li id="${postId}">
      <p>Postado por ${post.user_name} em ${post.createdAt.toDate().toLocaleString('pt-BR').substr(0, 19)}
      </p>
      <p>${post.text}
      </p>
      <div class="interaction-area">
        Likes:${post.likes}
        <span class='comment-icon fa fa-comments'></span>
      </div>
      <div class="comments">
        <ul class='comment-posts'>${printComments(post.comments)}</ul>
      </div>
    </li>
  `;
  return postTemplate;
}

function logOut() {
  auth
    .signOut()
    .then(() => {
      console.log('adeus');
      window.location = '#login';
    });
}

function userInfo() {
  //console.log("oi", firebase.auth().currentUser);
  const user = auth.currentUser;
  db.collection('users').doc(user.uid).get().then(doc => {
    const username = `
    <h4>Bem vindo(a), ${doc.data().name}!</h4>
    `;
    document.querySelector('.profile').innerHTML = username;
  });  
}

function NewPostTemplate() {
  const postArea = `
  ${Input({
    type: 'text',
    class: 'text-area',
    id: 'post-text',
    placeholder: 'texto',
  })}
  ${Button({
    type: 'button',
    class: 'btn',
    id: 'btn-post',
    onclick: createPost,
    title: 'Postar',
  })}
  `;
  const template = `
  <section class="post-area">
   <form class="input-area">
      ${postArea}
    </form>
  </section>
  `;
  return template;
}

function loadPosts() {
  const postsCollection = firebase.firestore().collection('posts');
  postsCollection.where('privacy', '==', 'public').orderBy('createdAt', 'desc').onSnapshot((snapshot) =>{
    const postList = document.querySelector('.post-list');
    postList.innerHTML = '';
    snapshot.docs.forEach((post) => {
      postList.innerHTML += addPost(post.data(), post.id);
    });
    document.querySelectorAll('.comment-icon').forEach ((icon) => {
      icon.addEventListener('click', (event) => {
        addComment(event.target.parentNode.parentNode.getAttribute('id'))});
    });
  });
  
}

function addComment(event) {
  const estrelinha = 'hahahahahaah'
  const doc = db.collection('posts').doc(event);
  doc.update({
      comments: firebase.firestore.FieldValue.arrayUnion(estrelinha)
    });  
}

function Feed() {
  const template = `
    ${Button({
      type: 'button',
      class: 'btn',
      id: 'btn-log-out', 
      onclick:logOut, 
      title: 'Sair'
    })}
    <div class='profile'>${userInfo()}</div>
      ${NewPostTemplate()}
      <section class="print-post">
      <ul class='post-list'>${loadPosts()}</ul>
      </section>
  `;
  return template;
}

export default Feed;
