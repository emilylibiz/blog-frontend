import fetch from "node-fetch";

const handler = async (req, res) => {
  try {
    const HEROKU_SITEMAP_URL =
      process.env.NODE_ENV === "production"
        ? "https://emily-blog-backend-eedb993a47c4.herokuapp.com/api/sitemap/index.xml"
        : "http://127.0.0.1:1337/api/sitemap/index.xml";

    console.log("Fetching sitemap from:", HEROKU_SITEMAP_URL);

    const response = await fetch(HEROKU_SITEMAP_URL);

    if (!response.ok) {
      console.error(
        "Failed to fetch sitemap:",
        response.status,
        response.statusText
      );
      res.status(response.status).json({
        error: "Failed to fetch sitemap",
        details: await response.text(),
      });
      return;
    }

    const sitemap = await response.text();
    console.log("Sitemap content length:", sitemap.length); // Log content length for debugging

    if (!sitemap || sitemap.trim().length === 0) {
      console.error("Sitemap is empty.");
      res.status(204).send("No Content");
      return;
    }

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error fetching the sitemap:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
