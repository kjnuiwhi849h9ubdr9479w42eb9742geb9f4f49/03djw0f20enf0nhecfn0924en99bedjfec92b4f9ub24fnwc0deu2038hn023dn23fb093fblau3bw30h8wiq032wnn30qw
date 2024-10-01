const fetch_1337x = require("./fetch_1337x.js");

const get_1337x = async (req, res) => {
    try {
        const movieName = req.params.movie;
        const results = await fetch_1337x(movieName);
        res.json({ success: true, msg: results });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, msg: "Internal server error" });
    }
};

module.exports = get_1337x;
