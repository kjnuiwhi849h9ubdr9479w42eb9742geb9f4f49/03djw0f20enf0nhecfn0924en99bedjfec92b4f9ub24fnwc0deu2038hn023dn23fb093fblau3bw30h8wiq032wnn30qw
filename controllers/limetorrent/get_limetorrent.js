const fetch_limetorrent = require("./fetch_limetorrent.js");

const get_limetorrent = async (req, res) => {
    const movieName = req.params.movie;
    const results = await fetch_limetorrent(movieName);
    res.json({ success: true, msg: results });
};

module.exports = get_limetorrent;
