import API from './api'

declare global {
  interface Window {
    myStuff: {
      name?: String | null,
      token?: String | null,
      key?: String | null,
      record?: String | null,
    }
    freezeGui: Function,
    unfreezeGui: Function,
    updateTopList: Function
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
    top: document.getElementById("top"),
  }

  window.freezeGui = () => {
    (elements.buttons.login as HTMLButtonElement).disabled = true;
    (elements.buttons.logout as HTMLButtonElement).disabled = true;
    (elements.buttons.signup as HTMLButtonElement).disabled = true;
  }

  window.unfreezeGui = () => {
    (elements.buttons.login as HTMLButtonElement).disabled = false;
    (elements.buttons.logout as HTMLButtonElement).disabled = false;
    (elements.buttons.signup as HTMLButtonElement).disabled = false;
  }

  window.updateTopList = async () => {
    elements.top!.innerText = "";
    const records = await API.top()
    records.records.forEach(rec => {
      elements.top!.innerHTML += `<li>${rec.name} ${rec.record}pts</li>\n`
    });
  }

  function readDataFromToken(token) {
    return JSON.parse(
      atob(token.split('.')[1])
    )
  }

  function checkIfLogged() {
    const token = localStorage.getItem("token")
    const key = localStorage.getItem("key")

    if (token !== null) {
      const data = readDataFromToken(token)

      window.myStuff.token = token
      window.myStuff.name = data.name
      window.myStuff.record = data.record
      window.myStuff.key = key

      elements.bar.logged!.style.display = ""
      elements.bar.loggedout!.style.display = "none"
      elements.name!.innerText = data.name!;
      elements.key!.innerText = key!;
    } else {
      console.log("not logged in")
      elements.bar.logged!.style.display = "none"
      elements.bar.loggedout!.style.display = ""
    }
  }

  async function login() {
    const key = prompt("Type in the #key")

    if (!key) {
      alert("Login cancelled")
      return
    }

    const response = await API.login(key)

    if (response.error) {
      alert(response.error)
      return
    }

    localStorage.setItem('token', response.token)
    localStorage.setItem('key', response.password)

    window.myStuff.token = response.token
    window.myStuff.name = response.name
    window.myStuff.record = response.record
    window.myStuff.key = response.password

    elements.bar.logged!.style.display = ''
    elements.bar.loggedout!.style.display = 'none'
    elements.name!.innerText = response.name
    elements.key!.innerText = response.password
  }

  async function signup() {
    const nickname = prompt("Your nickname:")

    if (!nickname) {
      alert("Signup cancelled")
      return
    }

    const response = await API.signup(nickname)

    if (response.error) {
      alert(response.error)
      return
    }

    localStorage.setItem('token', response.token)
    localStorage.setItem('key', response.password)

    window.myStuff.token = response.token
    window.myStuff.name = response.name
    window.myStuff.key = response.password
    window.myStuff.record = response.record

    elements.bar.logged!.style.display = ''
    elements.bar.loggedout!.style.display = 'none'
    elements.name!.innerText = response.name
    elements.key!.innerText = response.password
  }

  function logout() {
    const sure = confirm("Are you sure you want to logout? " +
      "You won't be able to login again without #key. " +
      "Make sure you copied #key before log out!\n\n" +
      "The #key: " + window.myStuff.key)

    if (!sure)
      return

    localStorage.clear()
    window.myStuff = {}

    elements.bar.logged!.style.display = 'none'
    elements.bar.loggedout!.style.display = ''
    elements.name!.innerText = ''
    elements.key!.innerText = ''
  }

  async function setup() {
    window.myStuff = {}

    elements.buttons.login!.addEventListener("click", login)
    elements.buttons.logout!.addEventListener("click", logout)
    elements.buttons.signup!.addEventListener("click", signup)

    await window.updateTopList()

    checkIfLogged()
  }

  setup()
})()
