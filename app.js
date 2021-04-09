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
      patchResponse.innerText = `${JSON.stringify(patchInfo)}`;
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

function delIt() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // This returned 200 for a status
      // console.log(this.status);
      console.log(this.responseText);
    }
  };
  ajax.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1", true);
  ajax.send();
}

let delUserId = document.getElementById("delPost");

delUserId.addEventListener("click", delIt);
