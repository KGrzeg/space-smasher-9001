
const baseApiPath = "http://localhost:3000"

export default {
  async post(path: string, data: any) {
    let response;
    try {
      response = await fetch(`${baseApiPath}/${path}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    } catch (err) {
      console.error(err)
    }

    return response.json()
  },

  async signup(name: string) {
    return this.post("signup", { name })
  }
}
