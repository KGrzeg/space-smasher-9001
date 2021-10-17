
import db from './Database.js'

export default function (req, res, next) {
  const { points, shoots, time } = req.body

  if (points > shoots)
    return res.status(400).json({
      error: "Stop that"
    })

  //FIXES https://discord.com/channels/762566311930101761/892788974647656500/893963260045455410
  const foreseeRank = db.foreseeRank(req.body.points)
  if (foreseeRank == 1 && req.user.name == 'mw')
    return res.status(400).json({
      error: "Stop that"
    })

  //ship can shoot only 5 shoots per second
  //and one bullet is worth max 1 point
  const maxPossiblePointsByTime = time * 0.2
  if (points >= maxPossiblePointsByTime)
    return res.status(400).json({
      error: "Stop that"
    })

  //nobody will play for over hour, I assure you
  if (time > 1000 * 60 * 60)
    return res.status(400).json({
      error: "Stop that"
    })


  next()
}
