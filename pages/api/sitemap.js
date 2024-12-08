// import fetch from 'node-fetch';

// // const HEROKU_SITEMAP_URL = 'https://emily-blog-backend-eedb993a47c4.herokuapp.com/api/sitemap/index.xml';
// const HEROKU_SITEMAP_URL = 'http://localhost:1337/api/sitemap/index.xml';

// export default async (req, res) => {
//   try {
//     const response = await fetch(HEROKU_SITEMAP_URL);

//     if (!response.ok) {
//       const errorDetails = await response.text();
//       console.error('Failed to fetch sitemap from Heroku:', errorDetails);
//       res.status(response.status).send(`Failed to fetch sitemap from Heroku: ${response.status} ${response.statusText}`);
//       return;
//     }

//     const sitemap = await response.text();

//     console.log('Sitemap content:', sitemap);

//     res.setHeader('Content-Type', 'application/xml');
//     res.status(200).send(sitemap);
//   } catch (error) {
//     console.error('Error fetching the sitemap:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };


import fetch from 'node-fetch';

const HEROKU_SITEMAP_URL = process.env.NODE_ENV === 'production'
  ? 'https://emily-blog-backend-eedb993a47c4.herokuapp.com/api/sitemap/index.xml'  // Change to your Heroku URL in production
  : 'http://127.0.0.1:1337/api/sitemap/index.xml';  // Local development URL

export default async (req, res) => {
  try {
    console.log('Fetching sitemap from:', HEROKU_SITEMAP_URL);

    const response = await fetch(HEROKU_SITEMAP_URL);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Failed to fetch sitemap:', errorDetails);
      res.status(response.status).send(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
      return;
    }

    const sitemap = await response.text();

    console.log("----------------sitemap = ", sitemap);
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error fetching the sitemap:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};

