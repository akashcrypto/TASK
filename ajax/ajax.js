// // READ DATA

$(document).ready((ready) => {
  table();
});

function table() {
  $.ajax({ url: "https://reqres.in/api/users?page=2", method: "GET" }).done(
    function (response) {
      let tr = response["data"];
      let tbody = document.querySelector("tbody");
      tr.forEach(function (obj) {
        let row = document.createElement("tr");
        for (let ob of Object.keys(obj)) {
          let col = document.createElement("td");
          let cell = document.createTextNode(obj[ob]);
          col.appendChild(cell);
          row.appendChild(col);
        }
        let col = document.createElement("td");
        col.innerHTML = `<img src="delete.png" onclick='deleterow("${obj.id}")'>
            <img src="edit.jpg" onclick='editrow("${obj.id}")'>
            <img style="display:none;" src='check.png' onclick='saverow("${obj.id}")'>`;

        row.setAttribute("id", `row-${obj.id}`);
        row.appendChild(col);
        tbody.appendChild(row);
      });
    }
  );
}

// DELETE ROW

function deleterow(str) {
  let settings = {
    url: "https://reqres.in/api/users/" + str,
    method: "DELETE",
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    document.querySelector("#row-" + str).remove();
  });
}

//ADD USR

function create() {
  document.querySelector(".contain").style.display = "flex";
}

function addUser(e) {
  e.preventDefault();
  let form = document.querySelector("form");
  let settings = {
    url: "https://reqres.in/api/users",
    method: "POST",
    data: {
      email: form.email.value,
      first_name: form.firstname.value,
      last_name: form.lastname.value,
      avatar: form.image.value,
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    document.querySelector(".contain").style.display = "none";
    let tbody = document.querySelector("tbody");
    let tr = document.createElement("tr");
    tr.setAttribute("id", `row-${response.id}`);
    tr.innerHTML = `<td>${response.id}</td>
    <td>${response.email}</td>
    <td>${response.first_name}</td>
    <td>${response.last_name}</td>
    <td>${response.avatar}</td>
    <td><img src="delete.png" onclick='deleterow("${response.id}")'>
        <img src="edit.jpg" onclick='editrow("${response.id}")'>
        <img style="display:none;" src='check.png' onclick='saverow("${response.id}")'>
    </td>`;
    tbody.appendChild(tr);
  });
}

//UPDATE ROW

function editrow(str) {
  let data = document.querySelector("#row-" + str).querySelectorAll("td");
  let form = document.querySelector("form");
  //console.log(data[1].innerText);
  let email = data[1].innerText;
  let fname = data[2].innerText;
  let lname = data[3].innerText;
  let img = data[4].innerText;
  data[1].innerHTML = `<input type='email' id='email' name="email" value="${email}">`;
  data[2].innerHTML = `<input type='text' id='fname' name="firstname" value="${fname}">`;
  data[3].innerHTML = `<input type='text' id='lname' name="lastname" value="${lname}">`;
  data[4].innerHTML = `<input type='file' id='image' name="image" value="${img}">`;
  data[5].querySelectorAll("img")[1].style.display = "none";
  data[5].querySelectorAll("img")[2].style.display = "block";
}

function saverow(str) {
  let data = document.querySelector("#row-" + str).querySelectorAll("td");
  let form = document.querySelector("#row-" + str).querySelectorAll("input");
  let settings = {
    url: "https://reqres.in/api/users/" + str,
    method: "PUT",
    data: {
      email: form[0].value,
      first_name: form[1].value,
      last_name: form[2].value,
      avatar: form[3].value,
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    data[1].innerHTML = response.email;
    data[2].innerHTML = response.first_name;
    data[3].innerHTML = response.last_name;
    data[4].innerHTML = response.avatar;
    data[5].querySelectorAll("img")[1].style.display = "block";
    data[5].querySelectorAll("img")[2].style.display = "none";
  });
}

function closeForm() {
  document.querySelector(".contain").style.display = "none";
}
