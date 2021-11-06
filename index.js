const express = require("express")
const port = process.env.PORT || 3000

const app = express()
app.get("/", (req, res) => {
  res.json({ status: "OK" })
})

app.listen(port)
