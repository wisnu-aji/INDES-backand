import { Router } from 'express'
import { Pelanggan } from '../../../models/Pelanggan'

const router = Router()

router.get('/:id', async (req, res) => {
  const idOrtelepon = req.params.id
  if (!Number(idOrtelepon))
    return res
      .status(406)
      .json({ ok: false, message: "Id / telepon isn't valid" })

  const byId = await Pelanggan.findById(+idOrtelepon)
  if (byId) {
    return res.json(byId)
  }

  const byPhone = await Pelanggan.findOne({ telepon: idOrtelepon })
  if (!byPhone) {
    return res
      .status(404)
      .json({ ok: false, message: "Id / telepon ins't found" })
  }

  return res.json(byPhone)
})

export default router