const wiki = require("wikipedia");
const download = require("download");
const progressBar = new (require("cli-progress").SingleBar)({
  format:
    "Downloading images... | [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
});
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");

// Fetch Wikimedia Commons page instead of regular Wikipedia page
wiki.setLang("commons");
const timestamp = Date.now();

(async () => {
  console.log("Starting the script...");

  try {
    console.log("Fetching the Wikimedia page...");

    const page = await wiki.page("Sovereign-state_flags");
    console.log(
      `Page fetched successfully. page id: ${page.pageid}, title: ${page.title}, full url: ${page.fullurl}`
    );

    const html = await page.html();
    const $ = cheerio.load(html);

    // Extract flag images with alt text
    const flagImages = $("img")
      .map((_, el) => ({
        url: $(el).attr("src"),
        alt: $(el).attr("alt"),
      }))
      .get()
      .filter(({ url, alt }) => url.includes("Flag_of_") && alt);

    console.log(`Found ${flagImages.length} flag images.`);
    progressBar.start(flagImages.length, 0);

    let csvString = "";

    await Promise.all(
      flagImages.map(async ({ url, alt }) => {
        // TODO: update Wikimedia Commons page to remove "Flag of" from some of the flag entries' image alt text
        let countryName = alt.replace(/^(Flag of )?(the )?/, "").trim();

        // Create a safe filename
        let safeFilename = countryName
          .replace(/'/g, "-") // Replace apostrophes
          .replace(/[^\w\s.-]/g, "") // Remove special characters
          .replace(/\s+/g, "_"); // Replace spaces with underscores

        // Rewrite URL to remove "/thumb/" and ".png" if present
        let fileUrl = url.replace(/\/thumb\//, "/").replace(/\/[^/]+$/, "");

        console.log(`Downloading: ${fileUrl}`);

        csvString += `<img src="${safeFilename}.svg">,"${countryName}",${timestamp}\n`;

        await download(fileUrl, "flags", {
          filename: `${safeFilename}.svg`,
        });

        progressBar.increment();
      })
    );

    progressBar.stop();
    console.log("Writing to flags.csv...");
    fs.writeFile("flags.csv", csvString, (err) => {
      if (err) {
        console.error("Error writing to flags.csv:", err);
      } else {
        console.log("Successfully wrote to flags.csv.");
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
