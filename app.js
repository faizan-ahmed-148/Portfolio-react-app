const express = require('express')

const app = express()
const cookieParser = require('cookie-parser');
const connectToMongo = require ("./db/conn");
connectToMongo();
const dotenv = require("dotenv")
dotenv.config({ path: './config.env'})

// heroku step1

const PORT = process.env.PORT || 5000;



app.use(express.json());
app.use(require('./router/auth'))


if ( process.env.NODE_ENV == "production"){

  app.use(express.static("my-app/build"));

  const path = require("path");

  app.get("*", (req, res) => {

      res.sendFile(path.resolve(__dirname, 'my-app', 'build', 'index.html'));

  })


}




app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  