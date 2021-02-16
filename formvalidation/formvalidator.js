function formvalidation(e) {
  e.preventDefault();
  let stats = true;

  const re = /^[A-Z0-9]+[A-Z0-9_.-]*@[A-Z]{2,}.([A-Z]{2,}|[A-Z]{2,}.[A-Z]{2,})$/i;
  let form = document.querySelector("form");

  if (!/[a-z]+/i.test(form.firstname.value)) {
    document.querySelector("#fname-error").style.display = "block";
    stats = false;
  }

  if (!/[a-z]+/i.test(form.lastname.value)) {
    document.querySelector("#lname-error").style.display = "block";
    stats = false;
  }

  // if (form.country.value.length == 0) {
  //   document.querySelector("#country-error").style.display = "block";
  //   stats = false;
  // }

  // if (!form.birthtime.value.length > 0) {
  //   document.querySelector("#btime-error").style.display = "block";
  //   stats = false;
  // }

  // if (!/^\d{2}/\d{2}/\d{4,}/.test(form.birthdate.value.length)) {
  //   document.querySelector("#bdate-error").style.display = "block";
  //   stats = false;
  // }

  if (!re.test(form.email.value)) {
    stats = false;
    document.querySelector("#email-error").style.display = "block";
  }

  if (!/(jpe?g|png|gif|bmp)$/i.test(form.image.value)) {
    stats = false;
    document.querySelector("#image-error").style.display = "block";
  }

  stats
    ? document.querySelectorAll(".none").forEach(function (element) {
        element.style.display = "none";
      })
    : null;
}
