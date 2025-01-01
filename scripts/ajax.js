const BASE_URL = "https://reqres.in/api/users/";
const POSTMAN_URL = "https://httpbin.org/post";

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener("load", (ev) => {
  let numsecs = document.getElementById("numsecs");
  let user = document.getElementById("user");
  let boton = document.querySelector("button");

  let userData;

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
    if (isNaN(numsecs) || numsecs <= 0) {
      document.getElementById("status").innerText =
        "⚠️ El número de segundos debe ser un valor positivo";
      throw new Error("⚠️ El número de segundos debe ser un valor positivo");
    }

    const response = await fetch(BASE_URL + user);
    statusCode = response.status;
    if (!response.ok) {
      document.getElementById("status").innerText = "⚠️ " + statusCode;
      throw new Error(response.status);
    }

    let datos = await response.json();
    datos = datos.data;

    userData = datos;

    if (datos) {
      setTimeout(() => {
        document.getElementById("id").innerText = datos.id;
        document.getElementById("email").innerText = datos.email;
        document.getElementById("name").innerText = datos.first_name;
        document.getElementById("status").innerText = response.status;
        postData();
      }, numsecs * 1000);
    } else {
      document.getElementById("status").innerText = "⚠️ " + statusCode;
      throw new Error("⚠️ Datos no encontrados");
    }
  } catch (error) {
    console.error(error);
    if (isNaN(user) || user > 12 || user <= 0) {
      document.getElementById("status").innerText = "⚠️ " + statusCode;
      throw new Error("ERROR ⚠️ El usuario debe ser un número entre 1 y 12");
    }
  }
}

async function postData() {
  try {
    const response = await fetch(POSTMAN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
  } catch (error) {
    document.getElementById("status").innerText = "⚠️ " + error;
    console.error("Error:", error);
  }
}