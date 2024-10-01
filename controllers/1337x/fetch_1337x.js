const axios = require("axios");
const cheerio = require("cheerio");

const fetch_1337x = async (movieName) => {
    let { data } = await axios.get(`https://1337x.to/search/${encodeURIComponent(movieName)}/1/`);
    let $ = cheerio.load(data);

    links = $("a")
        .filter((_, element) => $(element).attr("href").includes("/torrent/"))
        .map((_, element) => $(element).attr("href"))
        .get();

    results = await Promise.all(
        links.map(async (link) => {
            const url = "https://1337x.to" + link;
            let { data } = await axios.get(url);
            let $ = cheerio.load(data);

            return {
                name: $("title").text().substring(9) || null,
                seeders: $(".seeds").text() || null,
                leechers: $(".leeches").text() || null,
                size: $("ul:nth-of-type(2) li:nth-child(4) span").text() || null,
                link: url,
                magnetLink:
                    $("a")
                        .filter((_, element) => $(element).attr("href").includes("magnet:"))
                        .first()
                        .attr("href") || null,
            };
        })
    );

    return results;
};

module.exports = fetch_1337x;
