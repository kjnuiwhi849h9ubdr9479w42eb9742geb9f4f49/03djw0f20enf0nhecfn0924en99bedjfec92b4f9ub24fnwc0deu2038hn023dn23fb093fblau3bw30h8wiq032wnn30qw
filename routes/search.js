const express = require("express");
const get_all = require("../controllers/all.js");
const get_1337x = require("../controllers/1337x/get_1337x.js");
const get_limetorrent = require("./../controllers/limetorrent/get_limetorrent.js");

const searchRoute = express.Router();

searchRoute.get("/all/:movie", get_all);
searchRoute.get("/1337x/:movie", get_1337x);
searchRoute.get("/limetorrent/:movie", get_limetorrent);

module.exports = searchRoute;
