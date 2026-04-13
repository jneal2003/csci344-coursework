// requires utilities.js to be loaded first:
// included in index.html

const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "jneal3"; // change to your username :)
let password = "password";

async function initializeScreen() {
  token = await getToken();
  showNav();
  showPosts();
  showProfileHeader();
  showSuggestions();
  showStories();
  // invoke all of the Part 1 functions here
}

// fetch and display the posts
async function showPosts() {
  // fetch the posts from /api/posts
  // select the posts container
  // loop through the first 10 posts
  // build each post's HTML (or call a helper function)
  // insert the rendered posts into the DOM
  const endpoint = `${rootURL}/api/posts/`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const posts = await response.json();

  const postsContainerEl = document.querySelector("#postsContainer");

  posts.forEach((post) => {
    postsContainerEl.insertAdjacentHTML("beforeend", postToHTML(post));
  });
}

function postToHTML(post) {
  return `
        <section class="bg-white border mb-10">
        <div class="p-4 flex justify-between">
            <h3 class="text-lg font-Comfortaa font-bold">${
              post.user.username
            }</h3>
            <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${
        post.alt_text
      }" width="300" height="300"
                class="w-full bg-cover">
        <div class="p-4">
            <div class="flex justify-between text-2xl mb-3">
                <div>
                    <button id="like-${post.id}" 
                      onClick="${
                        post.current_user_like_id
                          ? `unlike(${post.current_user_like_id})`
                          : `like(${post.id})`
                      }"aria-label="Like post">
                      ${getLikeButton(post)}
                    </button>
                    <button><i class="far fa-comment"></i></button>
                    <button><i class="far fa-paper-plane"></i></button>
                </div>
                <div>
                <button id="bookmark-${post.id}" 
                    onClick="${
                      post.current_user_bookmark_id
                        ? `unbookmark(${post.current_user_bookmark_id})`
                        : `bookmark(${post.id})`
                    }"aria-label="Bookmark post">
                    ${getBookmarkButton(post)}
                </button>
                </div>
            </div>
            <p class="font-bold mb-3">${post.likes.length} likes</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                        ${post.caption}
                    </p>
                </div>
                <div class="text-sm mb-3">
                  ${getComments(post)}
                </div>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>
    `;
}

function getComments(post) {
  const comments = post.comments;
  console.log(comments);
  if (!comments || comments.length === 0) {
      return '';
  }

  if (comments.length === 1) {
      const comment = comments[0];
      return `
          <p class="text-sm mb-3">
              <strong>${comment.user.username}</strong>
              ${comment.text}
          </p>
      `;
  }

  const mostRecent = comments[comments.length - 1];
  return `
      <button class="text-sm text-gray-500 mb-2">
          View all ${comments.length} comments
      </button>
      <p class="text-sm mb-3">
          <strong>${mostRecent.user.username}</strong>
          ${mostRecent.text}
      </p>
      <p class="uppercase text-gray-500 text-xs">${mostRecent.display_time}</p>
  `;
}

function getBookmarkButton(post) {

  if (post.current_user_bookmark_id) {
    return `
                <i class="fas fa-bookmark"></i>
            `;
  } else
    return `   
            <i class="far fa-bookmark"></i>
        `;
}

function getLikeButton(post) {
  if (post.current_user_like_id) {
    return `
                <i class="fas fa-heart"></i>
            `;
  } else
    return `   
      <i class="far fa-heart"></i>        
    `;
}

async function getToken() {
  return await getAccessToken(rootURL, username, password);
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:

async function bookmark(postId) {
  // build the /api/bookmarks/ endpoint
  // issue a POST request with fetch(...)
  // include your bearer token in the Authorization header
  // send the post id in the request body
  // inspect the response JSON
  // refresh or redraw the post after the request succeeds
  const endpoint = `${rootURL}/api/bookmarks/`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ post_id: postId }),
  });

  const bookmark = await response.json();

  const postsContainerEl = document.querySelector("#postsContainer");
  postsContainerEl.innerHTML = "";
  await showPosts();
}

async function unbookmark(bookmarkId) {
  const endpoint = `${rootURL}/api/bookmarks/${bookmarkId}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const postsContainerEl = document.querySelector("#postsContainer");
  postsContainerEl.innerHTML = "";
  await showPosts();
}

async function showProfileHeader() {
  // fetch the current user's profile data from /api/profile
  // select the container where the profile header should go
  // build an HTML string for the user's image + username
  // insert that HTML into the DOM
  const endpoint = `${rootURL}/api/profile/`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }); 
  const data = await response.json();

  const userContainerEL = document.querySelector("#profileContainer");

  const htmlString = `
    <header class="flex gap-4 items-center">
      <img src="${data.image_url}" class="rounded-full w-16" alt="${data.username} profile pic"/>
      <h2 class="font-Comfortaa font-bold text-2xl">${data.username}</h2>
    </header>
  `;

  userContainerEL.innerHTML = htmlString;
}

async function showSuggestions() {

  const endpoint = `${rootURL}/api/suggestions/`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }); 
  const data = await response.json();

  const suggestionsContainerEL = document.querySelector("#suggestionsContainer");

  const htmlString = data.map(user => {
    return `
    <section class="flex justify-between items-center mb-4 gap-2">
    <img src="${user.image_url}" class="rounded-full w-10 h-10 object-cover" alt="${user,username} profile pic"/>
    <div class="w-[180px]">
      <p class="font-bold text-sm truncate">${user.username}</p>
      <p class="text-gray-500 text-xs truncate">suggested for you</p>
    </div>
    <button class="text-blue-500 text-sm py-2">follow</button>
  </section>
`;
  }).join("");

  suggestionsContainerEL.innerHTML = htmlString;
}

async function showStories() {

  const endpoint = `${rootURL}/api/stories/`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }); 
  const data = await response.json();
  console.log(data);

  const suggestionsContainerEL = document.querySelector("#storiesContainer");

  const htmlString = data.map(user => {
    return `
    <div class="flex flex-col justify-center items-center">
    <img src="${user.user.image_url}" class="rounded-full border-4 border-gray-300" alt="${user.user.username} profile pic"/>
    <p class="text-xs text-gray-500">${user.user.username}</p>
    </div>    
`;
  }).join("");

  suggestionsContainerEL.innerHTML = htmlString;
}

async function like(postId) {
  // build the /api/bookmarks/ endpoint
  // issue a POST request with fetch(...)
  // include your bearer token in the Authorization header
  // send the post id in the request body
  // inspect the response JSON
  // refresh or redraw the post after the request succeeds
  const endpoint = `${rootURL}/api/likes/`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ post_id: postId }),
  });

  const like = await response.json();

  const postsContainerEl = document.querySelector("#postsContainer");
  postsContainerEl.innerHTML = "";
  await showPosts();
}

async function unlike(likeID) {
  const endpoint = `${rootURL}/api/likes/${likeID}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const postsContainerEl = document.querySelector("#postsContainer");
  postsContainerEl.innerHTML = "";
  await showPosts();
}

// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
