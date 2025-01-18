const express = require("express");
const axios = require("axios");
const cors = require("cors")



const app = express();
const port = 3000;

app.use(cors())

app.get("/manga", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.mangadex.org/manga?limit=24&title=dt&includedTagsMode=AND&excludedTagsMode=OR&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[latestUploadedChapter]=desc"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from MangaDex" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
