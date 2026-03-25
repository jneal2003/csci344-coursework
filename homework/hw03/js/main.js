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
  console.log(posts);

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
                    <button><i class="far fa-heart"></i></button>
                    <button><i class="far fa-comment"></i></button>
                    <button><i class="far fa-paper-plane"></i></button>
                </div>
                <div>
                <button id="bookmark-${post.id}" 
                    onClick="${
                      post.current_user_bookmark_id
                        ? `unbookmark(${post.current_user_bookmark_id})`
                        : `bookmark(${post.id})`
                    }">
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
                <p class="text-sm mb-3">
                    <strong>lizzie</strong>
                    Here is a comment text text text text text text text text.
                </p>
                <p class="text-sm mb-3">
                    <strong>vanek97</strong>
                    Here is another comment text text text.
                </p>
                <p class="uppercase text-gray-500 text-xs">1 day ago</p>
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

async function displayComments(post) {
  return `
    <p class="text-sm mb-3">
        <strong>${post.comments.user.username}</strong>
        ${post.comments.text}
    </p>
    `;
}

function getBookmarkButton(post) {
  // if post.current_user_bookmark_id exists:
  //     render the filled bookmark icon
  // otherwise:
  //     render the hollow bookmark icon
  if (post.current_user_bookmark_id) {
    return `
                <i class="fas fa-bookmark"></i>
            `;
  } else
    return `   
            <i class="far fa-bookmark"></i>
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
  console.log(bookmark);

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

// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
