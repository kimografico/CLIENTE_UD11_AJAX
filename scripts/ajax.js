const BASE_URL = "https://reqres.in/api/users/";
const POSTMAN_URL = "https://httpbin.org/post";

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener("load", (ev) => {
  let numsecs = document.getElementById("numsecs");
  let user = document.getElementById("user");
  let boton = document.querySelector("button");

  boton.addEventListener("click", (ev) => {
    ev.preventDefault();
    clearFields();
    procesarFetch(numsecs.value, user.value);
  });
});

function clearFields() {
  document.querySelectorAll("span").forEach((element) => {
    element.innerHTML = "";
    // console.log(element);
  });
}

async function procesarFetch(numsecs, user) {
  try {
    const response = await fetch(BASE_URL + user);
    if (!response.ok) {
      throw new Error(response.status);
    }

    let datos = await response.json();
    datos = datos.data;

    if (datos) {
      setTimeout(() => {
        document.getElementById("id").innerText = datos.id;
        document.getElementById("email").innerText = datos.email;
        document.getElementById("name").innerText = datos.first_name;
        document.getElementById("status").innerText = response.status;
      }, numsecs * 1000);
    } else {
      throw new Error("⚠️ Datos no encontrados");
    }
  } catch (error) {
    console.error(error);
  }
}
