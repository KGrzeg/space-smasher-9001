import API from './api'

declare global {
  interface Window {
    myStuff: {
      name?: String | null,
      token?: String | null,
      password?: String | null,
    }
  }
}

(() => {
  const elements = {
    bar: {
      logged: document.getElementById("loggedbar"),
      loggedout: document.getElementById("loggedoutbar"),
    },
    buttons: {
      login: document.getElementById("login"),
      logout: document.getElementById("logout"),
      signup: document.getElementById("signup"),
    },
    name: document.getElementById("name"),
    key: document.getElementById("key"),
  }

  function checkIfLogged() {
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    if (token !== null) {
      window.myStuff.token = token
      window.myStuff.name = name
      console.log("my stuff", window.myStuff)

      elements.bar.logged!.style.display = ""
      elements.bar.loggedout!.style.display = "none"
      elements.name!.innerText = name!;
      elements.key!.innerText = token!;
    } else {
      console.log("not logged in")
      elements.bar.logged!.style.display = "none"
      elements.bar.loggedout!.style.display = ""
    }
  }

  function loginByKey() {
    const key = prompt("Type in the #key")

    if (!key) {
      alert("Login cancelled")
      return
    }

    //TODO: fetch data from server
    const response = {
      token: Math.random().toString() + '.abc',
      name: 'Hagis'
    }

    localStorage.setItem('token', response.token)
    localStorage.setItem('name', response.name)

    window.myStuff.token = response.token
    window.myStuff.name = response.name

    elements.bar.logged!.style.display = ''
    elements.bar.loggedout!.style.display = 'none'
    elements.name!.innerText = response.name
    elements.key!.innerText = response.token
  }

  async function signup() {
    const nickname = prompt("Your nickname:")

    if (!nickname) {
      alert("Signup cancelled")
      return
    }

    const response = await API.signup(nickname)

    localStorage.setItem('token', response.token)

    window.myStuff.token = response.token
    window.myStuff.name = response.name
    window.myStuff.password = response.password

    elements.bar.logged!.style.display = ''
    elements.bar.loggedout!.style.display = 'none'
    elements.name!.innerText = response.name
    elements.key!.innerText = response.password
  }

  function logout() {
    const sure = confirm("Are you sure you want to logout? " +
      "You won't be able to login again without #key. " +
      "Make sure you copied key before log out!")

    if (!sure)
      return

    localStorage.clear()
    window.myStuff = {}

    elements.bar.logged!.style.display = 'none'
    elements.bar.loggedout!.style.display = ''
    elements.name!.innerText = ''
    elements.key!.innerText = ''
  }

  function setup() {
    window.myStuff = {}

    elements.buttons.login!.addEventListener("click", loginByKey)
    elements.buttons.logout!.addEventListener("click", logout)
    elements.buttons.signup!.addEventListener("click", signup)

    checkIfLogged()
  }

  setup()
})()
