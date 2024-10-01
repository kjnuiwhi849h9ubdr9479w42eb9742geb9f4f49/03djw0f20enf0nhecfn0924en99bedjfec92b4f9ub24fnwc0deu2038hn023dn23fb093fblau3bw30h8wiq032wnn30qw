const express = require("express");
require("dotenv/config");

const searchRoute = require("./routes/search.js");

const app = express();

app.use(express.json());
app.use("/api/search", searchRoute);

app.get("/", (req, res) => {
    res.json({ success: true, msg: "Server is online!" });
});

app.listen(process.env.PORT || 9999, () => {
    console.log("Server is online");
});
