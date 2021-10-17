import { randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'
import db from './Database.js'

export default {
  async createAccount(name) {
    console.log("Creating user");
    if (db.userExists(name)) {
      console.log("User exists");
      return {
        error: "The name alredy occupied"
      }
    }

    const pass = randomBytes(16).toString('hex')
    const token = jwt.sign({
      name: name,
      record: 0,
      rank: 0
    }, process.env.secret)

    await db.addUser({
      name,
      pass,
      record: 0,
      rank: 0,
    })

    return {
      name,
      pass,
      record: 0,
      rank: 0,
      token
    }
  }
}
