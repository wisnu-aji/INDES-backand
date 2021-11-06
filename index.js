const express = require("express");
const port = process.env.PORT || 80;

const app = express();
app.get("/status/:nama", (req, res) => {
  const id = req.params.nama;
  console.log(id);
  res.json({ status: "OK" });
});

app.listen(port);
