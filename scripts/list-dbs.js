const { google } = require('googleapis');
const fs = require('fs');

if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1];
      let val = match[2];
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const serviceAccount = JSON.parse(serviceAccountStr);

const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/datastore']
);

jwtClient.authorize(async function(err, tokens) {
  if (err) {
    console.error(err);
    return;
  }
  const res = await fetch(`https://firestore.googleapis.com/v1/projects/fashion-look-484b2/databases`, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`
    }
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
});
