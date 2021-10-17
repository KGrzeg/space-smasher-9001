
const baseApiPath = "http://localhost:3000"

export default {
  async post(path: string, data?: any) {
    const headers = {
      'Content-Type': 'application/json'
    }

    if (window.myStuff.token) {
      headers['Authorization'] = `Bearer ${window.myStuff.token}`
    }

    let response;
    try {
      response = await fetch(`${baseApiPath}/${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      })
    } catch (err) {
      console.log("oops");

      console.error(err)
    }

    return response.json()
  },

  async get(path: string, data?: any) {
    const headers = {
      'Content-Type': 'application/json'
    }

    if (window.myStuff.token) {
      headers['Authorization'] = `Bearer ${window.myStuff.token}`
    }

    let response;
    try {
      response = await fetch(`${baseApiPath}/${path}`, {
        method: "GET",
        headers,
        body: JSON.stringify(data)
      })
    } catch (err) {
      console.log("oops");

      console.error(err)
    }

    return response.json()
  },

  async signup(name: string) {
    return this.post("signup", { name })
  },

  async login(key: string) {
    return this.post("login", { key })
  },

  async record(points: number, shoots: number, time: number) {
    return this.post("record", {
      points,
      shoots,
      time
    })
  },

  async top() {
    return this.get("top")
  }
}
