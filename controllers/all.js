const fetch_1337x = require("./1337x/fetch_1337x.js");
const fetch_limetorrent = require("./limetorrent/fetch_limetorrent.js");

const get_all = async (req, res) => {
    try {
        const movieName = req.params.movie;

        const functions = [fetch_1337x, fetch_limetorrent];
        let results = await Promise.all(
            functions.map((fetcher_function) => {
                return fetcher_function(movieName);
            })
        );

        return res.json({ success: true, msg: results.flat() });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, msg: "Internal server error" });
    }
};

module.exports = get_all;
