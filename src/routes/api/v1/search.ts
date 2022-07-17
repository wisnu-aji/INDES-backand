import { Router } from 'express'
import { Pelanggan } from '../../../models/Pelanggan'

const router = Router()

router.get('/:id', async (req, res) => {
  const auth = req.headers.authorization
  if (!auth) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
  const [, token] = auth.split(' ')
  const { id } = req.params
  const idOrtelepon = req.params.id as string
  if (!Number(idOrtelepon))
    return res
      .status(406)
      .json({ ok: false, message: "Id / telepon isn't valid" })

  const byId = await Pelanggan.findById(+idOrtelepon)
  if (byId) {
    if (byId.password === token) {
      return res.json(byId)
    }
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  const byPhone = await Pelanggan.findOne({ telepon: idOrtelepon })
  if (!byPhone) {
    return res
      .status(404)
      .json({ ok: false, message: "Id / telepon ins't found" })
  }
  if (byPhone.password === token) {
    return res.json(byPhone)
  }
  return res.status(401).json({
    message: 'Unauthorized',
  })
})

export default router
