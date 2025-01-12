const wiki = require("wikipedia");
const download = require("download");
const path = require("path");
const fs = require("fs");

// Fetch Wikimedia Commons page instead of regular Wikipedia page
wiki.setLang("commons");

(async () => {
  console.log("Starting the script...");

  try {
    console.log("Fetching the Wikipedia page...");

    const page = await wiki.page("Sovereign-state_flags");
    console.log(
      `Page fetched successfully. page id: ${page.pageid}, title: ${page.title}, full url: ${page.fullurl}`
    );

    console.log("Fetching images from the page...");
    const images = await page.images({ limit: 500 });
    const flagIamges = images.filter(({ url }) => url.includes("Flag_of_"));
    console.log(`Found ${flagIamges.length} flag images.`);

    let csvString = "";

    await Promise.all(
      flagIamges.map(async ({ url }) => {
        console.log(`Processing image: ${url}`);
        const encodedCountryName = url.replace("Flag_of_", "").split("/").pop();
        const filename = decodeURIComponent(encodedCountryName).replace(
          "'",
          "-"
        );
        console.log(`Decoded filename: ${filename}`);

        csvString += `<img src="${filename}">,${decodeURIComponent(
          // Remove file extension and replace underscores with spaces
          path.parse(encodedCountryName).name.replace(/_/g, " ")
        )}\n`;

        console.log(`Downloading image: ${url}`);
        await download(url, "flags", {
          filename,
        });
        console.log(`Downloaded image: ${filename}`);
      })
    );

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

  console.log("Script finished.");
})();
