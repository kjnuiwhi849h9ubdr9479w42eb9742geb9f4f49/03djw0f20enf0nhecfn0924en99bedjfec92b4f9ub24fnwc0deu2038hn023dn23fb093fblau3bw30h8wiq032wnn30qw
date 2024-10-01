const axios = require("axios");
const cheerio = require("cheerio");

const fetch_limetorrent = async (movieName) => {
    let { data } = await axios.get(`https://www.limetorrents.lol/search/all/${movieName}/seeds/1/`);
    let $ = cheerio.load(data);
    const links = $("div.tt-name > a:nth-child(2)")
        .map((_, element) => $(element).attr("href"))
        .get();

    const results = await Promise.all(
        links.map(async (link) => {
            const url = `https://www.limetorrents.lol/${link}`;
            let { data } = await axios.get(url);
            let $ = cheerio.load(data);

            return {
                name: $("#content > h1").first().text() || null,
                seeders: $("#content > span.greenish").first().text().substring(10) || null,
                leechers: $("#content > span.reddish").first().text().substring(11) || null,
                size: $("tr:nth-child(3) > td:nth-child(2)").text() || null,
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

module.exports = fetch_limetorrent;
