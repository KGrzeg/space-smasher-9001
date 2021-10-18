
import db from './Database.js'

export default function (req, res, next) {
  if (!process.env.enableJusticeGuard) {
    return next()
  }

  const { points, shoots, time } = req.body

  if (points > shoots)
    return res.status(400).json({
      error: "Stop that, Rule #1",
    })

  //FIXES https://discord.com/channels/762566311930101761/892788974647656500/893963260045455410
  const foreseeRank = db.foreseeRank(req.body.points)
  if (foreseeRank == 1 && req.user.name == 'mw')
    return res.status(400).json({
      error: "Stop that, Rule #4"
    })

  //ship can shoot only 5 shoots per second
  //and one bullet is worth max 1 point
  const maxPossiblePointsByTime = time * 5
  if (points > maxPossiblePointsByTime)
    return res.status(400).json({
      error: "Stop that, Rule #9" //yeah, greater numbers will scare hacker
    })

  //nobody will play for over an hour, I assure you
  if (time > 60 * 60)
    return res.status(400).json({
      error: "Stop that, Rule #13"
    })

  //try to detect time manipulation
  const startTimeOnServer = db.getLastPlayed(req.user.name)
  const elapsedTimeOnServer = (Date.now() - startTimeOnServer) / 1000
  if (elapsedTimeOnServer * 1.2 < time)
    return res.status(400).json({
      error: "Stop that, Rule #19"
    })

  return next()
}
