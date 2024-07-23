const wiki = require("wikipedia");
const download = require("download");
const path = require("path");
const fs = require("fs");

(async () => {
  const page = await wiki.page("Gallery of sovereign state flags");
  const images = (await page.images({ limit: 500 })).filter(({ url }) =>
    url.includes("Flag_of_")
  );
  let csvString = "";

  await Promise.all(
    images.map(({ url }) => {
      const encodedCountryName = url.replace("Flag_of_", "").split("/").pop();
      const filename = decodeURIComponent(encodedCountryName).replace("'", "-");
      csvString += `<img src="${filename}">,${decodeURIComponent(
        // Remove file extension and replace underscores with spaces
        path.parse(encodedCountryName).name.replace(/_/g, " ")
      )}\n`;
      return download(url, "flags", {
        filename,
      });
    })
  );
  fs.writeFile("flags.csv", csvString, (err) => {
    if (err) console.error(err);
  });
})();
