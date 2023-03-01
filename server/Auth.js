import { randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'
import db from './Database.js'

export default {
  async createAccount(name) {
    if (typeof name !== "string")
      return {
        error: "Incorrect name"
      }

    const re = /^[a-zA-Z0-9_$][a-zA-Z0-9 _$]{1,15}$/
    if (!re.test(name))
      return {
        error: "Incorrect name"
      }

    console.log("Creating user");
    if (db.userExists(name)) {
      console.log("User exists");
      return {
        error: "The name alredy occupied"
      }
    }

    const password = randomBytes(16).toString('hex')
    const token = jwt.sign({
      name: name,
      record: 0,
    }, process.env.secret)

    await db.addUser({
      name,
      password: password,
      record: 0,
      lastPlayed: 0,
    })

    return {
      name,
      password: password,
      record: 0,
      token
    }
  },

  login(password) {
    console.log("Logging user");
    if (typeof password !== "string")
      return {
        error: "User does not exists"
      }

    const user = db.getUserByPassword(password)

    if (!user) {
      return {
        error: "User does not exists"
      }
    }
    const token = jwt.sign({
      name: user.name,
      record: user.record,
    }, process.env.secret)

    const { lastPlayed, ...strippedUser } = user;

    return {
      ...strippedUser,
      token
    }
  }
}
