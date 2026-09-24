const https = require('https');

const images = [
  "https://images.unsplash.com/photo-1594938298596-ec65b50373d5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620012253295-c1590e048f46?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop"
];

images.forEach(url => {
  https.get(url, (res) => {
    console.log(`${res.statusCode} - ${url}`);
  }).on('error', (e) => {
    console.error(`Error ${url}: ${e.message}`);
  });
});
