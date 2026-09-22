/* eslint-disable */
const fs = require('fs');
const path = require('path');

const newTranslations = {
  en: {
    Navigation: {
      bookHomeVisit: "Book Home Visit"
    },
    Process: {
      journey: "The Journey",
      title: "Our Bespoke Process",
      step1Title: "Consultation",
      step1Desc: "We begin with a conversation about your lifestyle, preferred silhouettes, and occasions. Explore our curated selection of premium fabrics from global mills.",
      step2Title: "Measurement",
      step2Desc: "A master tailor takes exacting measurements, ensuring every contour is accounted for to create a garment that drapes flawlessly.",
      step3Title: "Basted Fitting",
      step3Desc: "The first trial. Your garment is temporarily stitched together to perfect the fit, balance, and proportions before final construction.",
      step4Title: "Final Delivery",
      step4Desc: "Your finished garment is ready. We ensure all final details are pristine, delivering a piece of wearable art crafted specifically for you."
    },
    Modal: {
      title: "Book a Consultation",
      subtitle: "Master Tailor Home Visit",
      name: "Name",
      namePlaceholder: "Your Full Name",
      phone: "Phone",
      phonePlaceholder: "+91",
      garment: "Garment Type",
      garments: {
        twoPiece: "Two-Piece Suit",
        threePiece: "Three-Piece Suit",
        sherwani: "Sherwani",
        tuxedo: "Tuxedo",
        safari: "Safari Suit",
        pathani: "Pathani",
        other: "Other / Multiple Items"
      },
      location: "Location Preference",
      locations: {
        home: "Home/Office (Mumbai/Navi Mumbai)",
        seawoods: "Seawoods Atelier",
        govandi: "Govandi Studio"
      },
      date: "Preferred Date",
      time: "Preferred Time",
      submit: "Request Booking via WhatsApp"
    }
  },
  hi: {
    Navigation: {
      bookHomeVisit: "होम विज़िट बुक करें"
    },
    Process: {
      journey: "सफ़र",
      title: "हमारी बिस्पोक प्रक्रिया",
      step1Title: "परामर्श",
      step1Desc: "हम आपकी जीवनशैली, पसंदीदा सिल्हूट और अवसरों के बारे में बातचीत से शुरुआत करते हैं। वैश्विक मिलों से हमारे प्रीमियम कपड़ों के चयन का अन्वेषण करें।",
      step2Title: "माप",
      step2Desc: "एक मास्टर दर्जी सटीक माप लेता है, यह सुनिश्चित करता है कि एक ऐसा परिधान बनाने के लिए हर समोच्च का हिसाब रखा जाए जो त्रुटिहीन हो।",
      step3Title: "फिटिंग",
      step3Desc: "पहला परीक्षण। अंतिम निर्माण से पहले फिट, संतुलन और अनुपात को सही करने के लिए आपके परिधान को अस्थायी रूप से एक साथ सिला जाता है।",
      step4Title: "अंतिम डिलीवरी",
      step4Desc: "आपका तैयार परिधान तैयार है। हम सुनिश्चित करते हैं कि सभी अंतिम विवरण प्राचीन हैं, विशेष रूप से आपके लिए तैयार की गई पहनने योग्य कला का एक टुकड़ा वितरित करते हैं।"
    },
    Modal: {
      title: "परामर्श बुक करें",
      subtitle: "मास्टर दर्जी होम विज़िट",
      name: "नाम",
      namePlaceholder: "आपका पूरा नाम",
      phone: "फ़ोन",
      phonePlaceholder: "+91",
      garment: "परिधान का प्रकार",
      garments: {
        twoPiece: "टू-पीस सूट",
        threePiece: "थ्री-पीस सूट",
        sherwani: "शेरवानी",
        tuxedo: "टक्सीडो",
        safari: "सफारी सूट",
        pathani: "पठानी",
        other: "अन्य / एकाधिक आइटम"
      },
      location: "स्थान वरीयता",
      locations: {
        home: "घर/कार्यालय (मुंबई/नवी मुंबई)",
        seawoods: "सीवुड्स एटेलियर",
        govandi: "गोवंडी स्टूडियो"
      },
      date: "पसंदीदा तिथि",
      time: "पसंदीदा समय",
      submit: "व्हाट्सएप के माध्यम से बुकिंग का अनुरोध करें"
    }
  },
  mr: {
    Navigation: {
      bookHomeVisit: "होम व्हिजिट बुक करा"
    },
    Process: {
      journey: "प्रवास",
      title: "आमची बिस्पोक प्रक्रिया",
      step1Title: "सल्लामसलत",
      step1Desc: "आम्ही तुमची जीवनशैली, पसंतीचे सिल्हूट आणि प्रसंगांबद्दल संभाषणाने सुरुवात करतो. जागतिक मिल्समधून आमची प्रीमियम कापडांची निवड एक्सप्लोर करा.",
      step2Title: "मोजमाप",
      step2Desc: "एक मास्टर टेलर अचूक मोजमाप घेतो, दोषरहित कपडे तयार करण्यासाठी प्रत्येक समोच्च विचारात घेतले जाईल याची खात्री करतो.",
      step3Title: "फिटिंग",
      step3Desc: "पहिली चाचणी. अंतिम बांधणीपूर्वी फिट, समतोल आणि प्रमाण परिपूर्ण करण्यासाठी तुमचे कपडे तात्पुरते एकत्र शिवले जातात.",
      step4Title: "अंतिम वितरण",
      step4Desc: "तुमचे तयार कपडे तयार आहेत. सर्व अंतिम तपशील मूळ आहेत याची आम्ही खात्री करतो, खास तुमच्यासाठी तयार केलेल्या घालण्यायोग्य कलेचा एक तुकडा वितरित करतो."
    },
    Modal: {
      title: "सल्लामसलत बुक करा",
      subtitle: "मास्टर टेलर होम व्हिजिट",
      name: "नाव",
      namePlaceholder: "तुमचे पूर्ण नाव",
      phone: "फोन",
      phonePlaceholder: "+91",
      garment: "कपड्याचा प्रकार",
      garments: {
        twoPiece: "टू-पीस सूट",
        threePiece: "थ्री-पीस सूट",
        sherwani: "शेरवानी",
        tuxedo: "टक्सिडो",
        safari: "सफारी सूट",
        pathani: "पठाणी",
        other: "इतर / एकाधिक आयटम"
      },
      location: "स्थान प्राधान्य",
      locations: {
        home: "घर/कार्यालय (मुंबई/नवी मुंबई)",
        seawoods: "सीवूड्स अटेलियर",
        govandi: "गोवंडी स्टुडिओ"
      },
      date: "पसंतीची तारीख",
      time: "पसंतीची वेळ",
      submit: "व्हॉट्सॲप द्वारे बुकिंगची विनंती करा"
    }
  },
  ur: {
    Navigation: {
      bookHomeVisit: "ہوم وزٹ بک کریں"
    },
    Process: {
      journey: "سفر",
      title: "ہمارا بیسپوک عمل",
      step1Title: "مشاورت",
      step1Desc: "ہم آپ کے طرز زندگی، پسندیدہ سلہیٹس اور مواقع کے بارے میں بات چیت سے شروع کرتے ہیں۔ عالمی ملوں سے ہمارے پریمیم کپڑوں کے انتخاب کو دریافت کریں۔",
      step2Title: "پیمائش",
      step2Desc: "ایک ماسٹر درزی قطعی پیمائش لیتا ہے، اس بات کو یقینی بناتا ہے کہ ایک ایسا لباس بنانے کے لیے ہر شکل کا حساب رکھا جائے جو بے عیب ہو۔",
      step3Title: "فٹنگ",
      step3Desc: "پہلا ٹرائل۔ حتمی تعمیر سے پہلے فٹ، توازن اور تناسب کو درست کرنے کے لیے آپ کا لباس عارضی طور پر ایک ساتھ سلا ہوا ہے۔",
      step4Title: "حتمی ترسیل",
      step4Desc: "آپ کا تیار لباس تیار ہے۔ ہم یقینی بناتے ہیں کہ تمام حتمی تفصیلات قدیم ہیں، خاص طور پر آپ کے لیے تیار کردہ پہننے کے قابل فن کا ایک ٹکڑا فراہم کرتے ہیں۔"
    },
    Modal: {
      title: "مشاورت بک کریں",
      subtitle: "ماسٹر ٹیلر ہوم وزٹ",
      name: "نام",
      namePlaceholder: "آپ کا پورا نام",
      phone: "فون",
      phonePlaceholder: "+91",
      garment: "لباس کی قسم",
      garments: {
        twoPiece: "ٹو پیس سوٹ",
        threePiece: "تھری پیس سوٹ",
        sherwani: "شیروانی",
        tuxedo: "ٹکسیڈو",
        safari: "سفاری سوٹ",
        pathani: "پٹھانی",
        other: "دیگر / متعدد اشیاء"
      },
      location: "مقام کی ترجیح",
      locations: {
        home: "گھر/دفتر (ممبئی/نوی ممبئی)",
        seawoods: "سی ووڈس ایٹیلیئر",
        govandi: "گوونڈی اسٹوڈیو"
      },
      date: "ترجیحی تاریخ",
      time: "ترجیحی وقت",
      submit: "واٹس ایپ کے ذریعے بکنگ کی درخواست کریں"
    }
  }
};

const locales = ['en', 'hi', 'mr', 'ur'];

locales.forEach(locale => {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (data.Navigation) {
    data.Navigation = { ...data.Navigation, ...newTranslations[locale].Navigation };
  }
  data.Process = newTranslations[locale].Process;
  data.Modal = newTranslations[locale].Modal;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
});

console.log("Updated translations!");
