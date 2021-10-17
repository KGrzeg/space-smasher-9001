import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

class Database {
  constructor() {
    const file = join(__dirname, 'storage', 'db.json')
    const adapter = new JSONFile(file)
    this.db = new Low(adapter)
  }

  async read() {
    await this.db.read();
    this.db.data = this.db.data || {
      users: []
    }
  }

  userExists(name) {
    return this.db.data.users.find(user => user.name == name) !== undefined
  }

  async addUser(user) {
    this.db.data.users.push(user)
    await this.db.write()
    return user
  }

  getUserByPassword(password) {
    return this.db.data.users.find(user => user.password === password)
  }

  async updateRecord(username, record) {
    const user = this.db.data.users.find(user => user.name == username)

    if (record > user.record) {
      user.record = record
      await this.db.write()
    }
  }
}

export default new Database
