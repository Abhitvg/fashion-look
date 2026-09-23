const fs = require('fs');

const locales = ['en', 'hi', 'mr', 'ur'];

locales.forEach(locale => {
  const file = `messages/${locale}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (data.StyleGuide) {
    if (locale === 'en') {
      data.StyleGuide.backToHome = "Back to Home";
      data.StyleGuide.readMore = "Explore Collection";
    } else if (locale === 'hi') {
      data.StyleGuide.backToHome = "होम पर वापस जाएँ";
      data.StyleGuide.readMore = "कलेक्शन देखें";
    } else if (locale === 'mr') {
      data.StyleGuide.backToHome = "मुख्यपृष्ठावर परत जा";
      data.StyleGuide.readMore = "कलेक्शन पहा";
    } else if (locale === 'ur') {
      data.StyleGuide.backToHome = "ہوم پر واپس جائیں";
      data.StyleGuide.readMore = "کلیکشن دیکھیں";
    }
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
});
console.log("Translations updated!");
