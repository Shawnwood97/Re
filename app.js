function postIt() {
  let messageEle = document.getElementById("mesResponse");
  let usersName = document.getElementById("usersName");
  let usersPost = document.getElementById("usersPost");

  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 201) {
      console.log(JSON.parse(this.responseText));
    }
  };
  ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
  ajax.setRequestHeader("Content-Type", "application/json");
}

let postBtn = document.getElementById("postBtn");
postBtn.addEventListener("click", postIt);
