import fetch from 'node-fetch';

const HEROKU_SITEMAP_URL = 'https://emily-blog-backend-eedb993a47c4.herokuapp.com/api/sitemap/index.xml';

export default async (req, res) => {
  try {
    const response = await fetch(HEROKU_SITEMAP_URL);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Failed to fetch sitemap from Heroku:', errorDetails);
      res.status(response.status).send(`Failed to fetch sitemap from Heroku: ${response.status} ${response.statusText}`);
      return;
    }

    const sitemap = await response.text();

    console.log('Sitemap content:', sitemap);

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error fetching the sitemap:', error);
    res.status(500).send('Internal Server Error');
  }
};
