const express = require("express");
const URLroute = require("./routes/url");
const { connectMongoDB } = require("./connections.js");
const URL = require("./models/url.js");
const path = require('path')

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://localhost:27017/shortURL");

app.use(express.json());

app.set("view engine", 'ejs');
app.set("views", path.resolve("./views"))

// server side rendering
app.get("/test", async (req, res)=>{
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  })
})

app.use("/url", URLroute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory:{
            timestamp: Date.now()
        }
      },
    }
  );
  res.redirect(entry.redirectURL);
});



app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
