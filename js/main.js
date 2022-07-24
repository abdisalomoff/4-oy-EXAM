const elUsersTemplate = document.querySelector(".users__template").content;
const elPostsTemplate = document.querySelector(".posts__template").content;
const elCommentsTemplate = document.querySelector(".comments__template").content;
const elUsersList = document.querySelector(".users__list");
const elPostsList = document.querySelector(".posts__list");
const elCommentsList = document.querySelector(".comments__list");
const elLoader = document.querySelector(".posts-wrapper");
const elLoaderTwo = document.querySelector(".comments-wrapper");

async function getUsers(){
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();
  console.log(data);

function renderUser(arr,element){
  element.innerHTML = "";

  arr.forEach(e => {
    
  const clonedTemplate = elUsersTemplate.cloneNode(true);

  clonedTemplate.querySelector(".users__item").dataset.userId = e.id;
  clonedTemplate.querySelector(".users__name").textContent = e.username;
  clonedTemplate.querySelector(".users__title").textContent = e.name;
  clonedTemplate.querySelector(".users__id").textContent = e.id;
  clonedTemplate.querySelector(".users__address").textContent =e.address.street+" "+e.address.suite+" "+e.address.city+" "+e.address.zipcode;
  clonedTemplate.querySelector(".company__name").textContent = e.company.name;
  clonedTemplate.querySelector(".company__catchPhrase").textContent = e.company.catchPhrase;
  clonedTemplate.querySelector(".company__bs").textContent = e.company.bs;
  clonedTemplate.querySelector(".users__tel").textContent = e.phone;
  clonedTemplate.querySelector(".users__tel").setAttribute("href", `tel:${e.phone}`);

  clonedTemplate.querySelector(".users__loc").textContent = "GeoLocation";
  clonedTemplate.querySelector(".users__loc").setAttribute("href", `https://www.google.com/maps/place/${e.address.geo.lat},${e.address.geo.lng}`);

  clonedTemplate.querySelector(".users__website").textContent = e.website;
  clonedTemplate.querySelector(".users__website").setAttribute("href", `https://${e.website}`);

  clonedTemplate.querySelector(".users__mail").textContent = e.email;
  clonedTemplate.querySelector(".users__mail").setAttribute("href", `mailto:${e.email}`);

    element.appendChild(clonedTemplate);
  });
}
renderUser(data,elUsersList);
}
getUsers();


elUsersList.addEventListener("click" , evt =>{
  elLoader.style.display = "block";
  if (evt.target.matches(".users__item")) {
    let IdUser = evt.target.dataset.userId;

    async function getPost(){
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data = await response.json();

      function renderPost(arr,element){

        element.innerHTML = "";
  
        arr.forEach(e => {
          if(IdUser == e.userId) {
        
          const clonedTemplate = elPostsTemplate.cloneNode(true);

          clonedTemplate.querySelector(".posts__item").dataset.postId = e.id;
          clonedTemplate.querySelector(".posts__title").textContent = e.title;
          clonedTemplate.querySelector(".posts__text").textContent = e.body;

        element.appendChild(clonedTemplate);
        }
        })
      }
  renderPost(data , elPostsList);
  }
    getPost();
  }
});


elPostsList.addEventListener("click" , evt =>{
  elLoaderTwo.style.display = "block";
  if (evt.target.matches(".posts__item")) {
    let IdComment = evt.target.dataset.postId;

    console.log(IdComment);

    async function getComment(){
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
      const data = await response.json();
      // console.log(data);
    
      function renderComment(arr,element){
        element.innerHTML = "";
        
    
        arr.forEach(e => {
          if(IdComment == e.postId) {
        
          const clonedTemplate = elCommentsTemplate.cloneNode(true);

          clonedTemplate.querySelector(".comments__item").dataset.postId = e.id;
          clonedTemplate.querySelector(".comments__title").textContent = e.name;
          clonedTemplate.querySelector(".comments__link").textContent = e.email;
          clonedTemplate.querySelector(".comments__link").setAttribute("href",`mailto:${e.email}`);
          clonedTemplate.querySelector(".comments__text").textContent = e.body;

        element.appendChild(clonedTemplate);
        }
        })
      }
      
  renderComment(data , elCommentsList);
  }
    getComment();
  }
});

