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

  getTop(amount = 15) {
    return this.db.data.users
      .filter(user => user.record)
      .map(user => { return { name: user.name, record: user.record } })
      .sort((a, b) => a.record > b.record ? -1 : 1)
      .slice(0, amount)
  }

  getRank(username) {
    const users = this.db.data.users
      .filter(user => user.record)
      .sort((a, b) => a.record > b.record ? -1 : 1)

    for (let i = 0; i < users.length; ++i) {
      if (users[i].name == username)
        return i + 1
    }

    return 0
  }

  foreseeRank(record) {
    const users = this.db.data.users
      .filter(user => user.record)
      .sort((a, b) => a.record > b.record ? -1 : 1)

    for (let i = 0; i < users.length; ++i) {
      if (users[i].record < record)
        return i + 1
    }

    return 0
  }
}

export default new Database
