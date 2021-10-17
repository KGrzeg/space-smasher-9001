import 'dotenv/config'

import express from 'express'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import cors from 'cors'

import auth from './Auth.js'
import db from './Database.js'
import jg from './JusticeGuard.js'

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

const neededArguments = (args) => {
  return (req, res, next) => {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (!req.body[arg])
        return res.status(400).json({
          error: "missing argument " + arg
        })
    }
    next()
  }
}

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

app.get("/", (_, res) => {
  res.json({ message: "Hello! API here" })

});

app.get("/secured", protect, (req, res) => {
  res.json({ message: "You can see it!", payload: req.user })
})

app.post("/signup", neededArguments(['name']), async (req, res) => {
  const user = await auth.createAccount(req.body.name)

  if (user.error)
    return res.status(400).json({
      error: user.error
    })

  res.json(user)
})

app.post("/login", neededArguments(['key']), async (req, res) => {
  const user = auth.login(req.body.key)

  if (user.error)
    return res.status(400).json({
      error: user.error
    })

  res.json(user)
})

app.post("/record", protect, neededArguments(['points', 'shoots', 'time']), jg, async (req, res) => {
  db.updateRecord(req.user.name, req.body.points)
  const rank = db.getRank(req.user.name)

  console.log(req.user, rank)

  res.json({
    status: "ok",
    rank: rank
  })
})

app.get("/top", (req, res) => {
  res.json({
    status: "ok",
    records: db.getTop()
  })
})

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

await db.read()
app.listen(3000)
