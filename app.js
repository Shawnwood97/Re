function postIt() {
  let usersName = document.getElementById("usersName").value;
  let usersPost = document.getElementById("usersPost").value;

  let postInfo = {
    user: usersName,
    post: usersPost,
    userId: 1,
  };

  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4) {
      // Success Message
      messageEle.innerHTML = `Hey ${usersName}, thanks for the Post!`;
      // Show error for if only the status isnt correct, if status incorrect AND one of the input boxes is
      // empty, git more of a custom message. Was gonna add more conditions but decided to move on.
      if (this.status !== 201) {
        messageEle.innerText = "ERROR! Incorrect/No response from API";
        if (!usersName || !usersPost) {
          messageEle.innerText =
            "ERROR! Incorrect/No response from API.... Also, Name or post content missing!";
        }
      } else if (!usersName || !usersPost) {
        messageEle.innerText = "Make sure you enter a user and a post!";
      }

      console.log(JSON.parse(this.responseText));
    }
  };
  ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send(JSON.stringify(postInfo));
}

let messageEle = document.getElementById("mesResponse");
let postBtn = document.getElementById("postBtn");
postBtn.addEventListener("click", postIt);
