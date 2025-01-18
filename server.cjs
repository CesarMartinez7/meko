const express = require("express");
const cors = require("cors")
const path = require("node:path")


const PORT = process.env.PORT || 3000

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname,"dist")))

app.get("*",(req,response) => {
  response.sendFile(path.join(__dirname,"dist","index.html"))
})


app.listen(PORT,() => {
  console.log(`Servidor run:         http://localhost:${PORT}`)
})