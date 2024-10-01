const fetch_tpb = require("./fetch_tpb.js");

const get_tpb = async (req, res) => {
    const movieName = req.params.movie;
    const results = await fetch_tpb(movieName);
    res.json({ success: true, msg: results });
};

module.exports = get_tpb;
