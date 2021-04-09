function postIt() {
  let usersName = document.getElementById("usersName").value;
  let usersPost = document.getElementById("usersPost").value;

  let postInfo = {
    user: usersName,
    post: usersPost,
    userId: 1,
  };

  // POST REQUEST
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4) {
      // Success Message
      postResponse.innerHTML = `Hey ${usersName}, thanks for the Post!`;
      // Show error for if only the status isnt correct, if status incorrect AND one of the input boxes is
      // empty, git more of a custom message. Was gonna add more conditions but decided to move on.
      if (this.status !== 201) {
        postResponse.innerText = "ERROR! Incorrect/No response from API";
        if (!usersName || !usersPost) {
          postResponse.innerText =
            "ERROR! Incorrect/No response from API.... Also, Name or post content missing!";
        }
      } else if (!usersName || !usersPost) {
        postResponse.innerText = "Make sure you enter a user and a post!";
      }

      console.log(JSON.parse(this.responseText));
    }
  };
  ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send(JSON.stringify(postInfo));
}

let postMsg = document.getElementById("postResponse");
let postBtn = document.getElementById("postBtn");
postBtn.addEventListener("click", postIt);

// PATCH REQUEST

function patchIt() {
  let usersID = document.getElementById("userID").value;
  let idNum = document.getElementById("idNum").value;
  let usersTitle = document.getElementById("userTitle").value;
  let patchBody = document.getElementById("patchBody").value;

  let patchInfo = {
    userId: usersID,
    id: idNum,
    title: usersTitle,
    body: patchBody,
  };

  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // This returned 200 for a status
      // console.log(this.status);
      console.log(this.responseText);
      // Also return the PATCHED conttent on the page, not formatted well, starting to
      // run into time constraints.
      patchResponse.innerText = `Post Updated!`;
    }
  };
  ajax.open("PATCH", "https://jsonplaceholder.typicode.com/posts/1", true);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send(JSON.stringify(patchInfo));
}

let patchResponse = document.getElementById("patchResponse");
let patchBtn = document.getElementById("patchBtn");
patchBtn.addEventListener("click", patchIt);

// DELETE
// I over thought this wayyyyyyyyy too much.
// Function to delete the first object in posts
function delIt() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // This returned 200 for a status
      // console.log(this.status);
      console.log(this.responseText);

      delResponse.innerText = "Post Deleted";
    }
  };
  ajax.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1", true);
  ajax.send();
}

let delPost = document.getElementById("delPost");
let delResponse = document.getElementById("deleteResponse");

delPost.addEventListener("click", delIt);

// Get posts, not a function so it happens on page load.
let ajax = new XMLHttpRequest();
ajax.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    // This returned 200 for a status
    // console.log(this.status);
    // console.log(this.responseText);

    // get posts as an object
    let allPosts = JSON.parse(this.responseText);
    // log posts
    console.log(allPosts);

    // forloop to isolate each object and place each item in a variable and add each post usi innerHTML.
    for (let i = 0; i < allPosts.length; i++) {
      // console.log(postUser);
      let postBody = allPosts[i].body;
      let postTitle = allPosts[i].title;
      let postUser = allPosts[i].id;
      // gives each post a unique ID for adding comments later
      postsWrap.innerHTML += `<div id="posty${postUser}" style="border:2px solid #000; margin-bottom: 5px;"> <h2> ${postTitle}</h2> <p>${postBody}</p> <h5>By ID: ${postUser}</h5><h4>Comments</h4></div>`;
      let comments = new XMLHttpRequest();
      comments.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          let allComments = JSON.parse(this.responseText);
          // console.log(allComments);

          for (i = 0; i < allComments.length; i++) {
            let identifyUser = allComments[i].postId;

            if (postUser === identifyUser) {
              let postComment = allComments[i].body;
              let commentAuthor = allComments[i].email;
              // get dynamic element from above and add each comment to the bottom with an author
              let getPost = document.getElementById(`posty${postUser}`);
              getPost.innerHTML += `<div>By: ${commentAuthor}<div><p style="border: 1px solid green;"> ${postComment}</p></div>`;
            }
          }
        }
      };

      comments.open(
        "GET",
        `https://jsonplaceholder.typicode.com/posts/${postUser}/comments`,
        true
      );
      comments.send();
    }
  }
};
ajax.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
ajax.send();

let postsWrap = document.getElementById("posts");
