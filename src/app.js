const express = require("express");
const aiRoutes = require("./routes/ai.route");
const cors = require("cors")

const app = express();

// app.get("/", (req, res) => {
//   res.send("all good");
// });
app.use(cors())


app.use(express.json());

app.use("/ai", aiRoutes);

// FIX: should be module.exports (not module.export)
module.exports = app;
