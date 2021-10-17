import 'dotenv/config'

import express from 'express'
import jwt from 'jsonwebtoken'
import auth from './Auth.js'
import db from './Database.js'

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.sendStatus(401)
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.secret, (err, user) => {
    if (err)
      return res.sendStatus(403)

    req.user = user
    next()
  })
}

const app = express()
app.use(express.json())

app.get("/", (_, res) => {
  res.json({ message: "Hello! API here" })

});

app.get("/secured", protect, (req, res) => {
  res.json({ message: "You can see it!", payload: req.user })
})

app.post("/signup", async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({
      error: "missing argument name"
    })

  const info = await auth.createAccount(req.body.name)

  if (info.error)
    return res.status(400).json({
      error: info.error
    })

  res.json(info)
})

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

await db.read()
app.listen(3000)
