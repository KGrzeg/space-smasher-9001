
const baseApiPath = "http://localhost:3000"

export default {
  async post(path: string, data: any) {
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

  async signup(name: string) {
    return this.post("signup", { name })
  },

  async login(password: string) {
    return this.post("login", { password })
  }
}