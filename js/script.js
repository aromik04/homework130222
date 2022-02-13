"use strict";

const URL = "https://web-app-papatomatoe.herokuapp.com";

const mainMenu = document.querySelector(".header__menu");
const burgerButton = document.querySelector(".header__button");
const postList = document.querySelector(".posts__list");
const btn2 = document.querySelector("add-post__button")
const loader = document.querySelector(".posts__loader")
const inputTitle = document.querySelector(".add-post__input");
const addPostButton = document.querySelector(".add-post__button");
const postContent = document.querySelector(".add-post__content");
const postError = document.querySelector(".posts__error")
const addPostError = document.querySelector(".add-post__error")

const openMenu = () => {
  if (burgerButton.classList.contains("header__button--active")) {
    mainMenu.style.display = "none";
    burgerButton.classList.remove("header__button--active");
    burgerButton.classList.add("header__button");
  } else {
    mainMenu.style.display = "block";
    burgerButton.classList.remove("header__button");
    burgerButton.classList.add("header__button--active");
  }
};
burgerButton.addEventListener("click", openMenu);


const getPostMarkup = (post) => {
    const postItem = document.createElement("li");
    const postTitle = document.createElement("h3");
    const postContent = document.createElement("p");
    const postDate = document.createElement("time");

    postTitle.innerText = post.title;
    postContent.innerText = post.content;
    postDate.innerText = post.createDate;
    postDate.setAttribute("datetime", post.createDate);
    
    postItem.classList.add("posts__item");
    postTitle.classList.add("posts__title");
    postContent.classList.add("posts__content");
    postDate.classList.add("posts__date");

    postItem.append(postTitle);
    postItem.append(postContent);
    postItem.append(postDate);

    return postItem;
};

const checkForm = () => {
    if (inputTitle != null || postContent != null) {
      addPostButton.removeAttribute("disabled");
    }
      else { 
        addPostButton.setAttribute("disabled");
  }
}
//кнопка всё равно остаётся неактивной

const fragment = new DocumentFragment();

const getPosts = () => {
  loader.classList.add("visually-hidden")
  fetch(`${URL}/posts`)
      .then((response) => {
          return response.json();
      })
      .then((posts) => {
          posts.forEach((post) => {
              const postElement = getPostMarkup(post);
              fragment.append(postElement);
          });

          postList.append(fragment);
      })
      .catch((error) => console.error(error) );
      // postError.classList.remove("visually-hidden");
      // не получается удалить класс visually-hidden только когда ловится ошибка
};

const savePost = async (post) => {
  addPostButton.innerText("saving...")
  addPostButton.setAttribute("disabled")
  const fetchConfig = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
  };
  try {
      const response = await fetch(`${URL}/posts`, fetchConfig);
      const data = await response.json();
      console.log(data);
  } catch (error) {
      addPostError.classList.add(".add-post__error--active")
      //не понял как вызвать ошибку именно на 3 секунды
      console.error(error);
      

  }

};
getPostMarkup(savePost);
//не понял как внедрить getPostMarkup в функцию savePost



getPosts();