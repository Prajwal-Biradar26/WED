import { GoogleGenerativeAI } from '@google/generative-ai';

// Traditional template bank across tones and languages
const generateFallbackContent = ({ brideName, groomName, weddingDate, city, tone = 'traditional', language = 'en' }) => {
  const bName = brideName || 'Priya';
  const gName = groomName || 'Prajwal';
  const loc = city || 'Bengaluru';
  const dateStr = weddingDate ? new Date(weddingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '25 December 2026';

  if (language === 'hi') {
    if (tone === 'royal') {
      return {
        welcomeMessage: `॥ श्री गणेशाय नमः ॥\nपूज्य पूर्वजों एवं ईश्वर के आशीर्वाद से, हम आपको ${bName} और ${gName} के शाही पाणिग्रहण संस्कार के इस पावन उत्सव में सस्नेह आमंत्रित करते हैं।`,
        invitationMessage: `दो राजसी कुलों का मिलन, दो प्रेममयी हृदयों का संगम। इस भव्य मांगलिक बेला पर आपकी गरिमामयी उपस्थिति हमारे आनंद को दोगुना करेगी।`,
        coupleIntroduction: `${bName} और ${gName} अपने नए जीवन की शुरुआत करने जा रहे हैं। उनका यह पवित्र बंधन प्रेम, विश्वास और सम्मान की नींव पर आधारित है।`,
        ourStory: `ईश्वर के विधान और परिवार के आशीर्वाद से मिले दो दिल, जिन्होंने साथ मिलकर जीवन के इस सुंदर सफ़र को तय करने का संकल्प लिया।`,
        eventDescriptions: `हल्दी की शुभ सुगंध से लेकर सात फेरों के पावन वचनों तक, हर रस्म भारतीय संस्कृति की भव्यता और आनंद का उत्सव है।`,
        closingMessage: `आपका स्नेह, आशीर्वाद और उपस्थिति ही हमारा सबसे अनमोल उपहार होगा।`,
        whatsappMessage: `👑 *शुभ विवाह निमंत्रण* 👑\n\n॥ श्री गणेशाय नमः ॥\n\nसादर प्रणाम,\nहम आपको ${bName} ❤️ ${gName} के विवाह उत्सव में सपरिवार आमंत्रित करते हैं।\n\n📅 दिनांक: ${dateStr}\n📍 स्थान: ${loc}\n\nकृपया डिजिटल निमंत्रण पत्र देखने एवं कार्यक्रम की जानकारी के लिए लिंक पर क्लिक करें:`
      };
    }
    return {
      welcomeMessage: `॥ श्री गणेशाय नमः ॥\nपरिवार के बुजुर्गों के स्नेहपूर्ण आशीर्वाद से, हम आपको ${bName} संग ${gName} के विवाह उत्सव में सस्नेह आमंत्रित करते हैं।`,
      invitationMessage: `दो परिवारों का यह मधुर मिलन हमारे जीवन का सबसे सुनहरा पल है। आपकी मंगलमयी उपस्थिति की हमें प्रतीक्षा रहेगी।`,
      coupleIntroduction: `${bName} और ${gName} जीवन के नए अध्याय की शुरुआत कर रहे हैं।`,
      ourStory: `एक सुंदर शुरुआत, अनगिनत यादें और अब सात जन्मों का पवित्र बंधन।`,
      eventDescriptions: `मांगलिक रस्मों, संगीत और खुशियों के इस उत्सव में हमारे साथ सम्मिलित हों।`,
      closingMessage: `आपकी उपस्थिति ही हमारे लिए ईश्वर का सबसे बड़ा आशीर्वाद है।`,
      whatsappMessage: `💍 *शुभ विवाह निमंत्रण पत्र* 💍\n\nप्रिय बंधुजन,\n${bName} एवं ${gName} के पावन विवाह संस्कार में आप सपरिवार सादर आमंत्रित हैं।\n\n📅 तिथि: ${dateStr}\n📍 स्थान: ${loc}\n\nडिजिटल आमंत्रण देखें:`
    };
  }

  if (language === 'kn') {
    return {
      welcomeMessage: `॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥\nಕುಟುಂಬದ ಹಿರಿಯರ ಮತ್ತು ತಂದೆ-ತಾಯಿಗಳ ಸದಾಶೀರ್ವಾದದೊಂದಿಗೆ, ${bName} ಮತ್ತು ${gName} ಅವರ ಶುಭ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ತಮಗೆಲ್ಲರಿಗೂ ಪ್ರೀತಿಯ ಸ್ವಾಗತ.`,
      invitationMessage: `ಎರಡು ಮನಸುಗಳು, ಎರಡು ಕುಟುಂಬಗಳು ಒಂದಾಗುವ ಈ ಶುಭ ಸಂದರ್ಭದಲ್ಲಿ ತಮ್ಮ ಉಪಸ್ಥಿತಿ ಮತ್ತು ಆಶೀರ್ವಾದವನ್ನು ಕೋರುತ್ತೇವೆ.`,
      coupleIntroduction: `${bName} ಮತ್ತು ${gName} ತಮ್ಮ ನವ ಜೀವನದ ಪಯಣವನ್ನು ಪರಸ್ಪರ ಪ್ರೀತಿ, ಗೌರವ ಮತ್ತು ನಂಬಿಕೆಯೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸುತ್ತಿದ್ದಾರೆ.`,
      ourStory: `ಸುಂದರ ಕ್ಷಣಗಳ ಸಂಗಮ, ಕುಟುಂಬಗಳ ಅನುಗ್ರಹ ಮತ್ತು ಈಗ ದಾಂಪತ್ಯ ಜೀವನದ ಪವಿತ್ರ ಆರಂಭ.`,
      eventDescriptions: `ಅರಸಿನ ಶಾಸ್ತ್ರ, ಮೆಹಂದಿ, ಸಂಗೀತ ಸಂಜೆ ಮತ್ತು ಸಪ್ತಪದಿ ವಿಧಿವಿಧಾನಗಳೊಂದಿಗೆ ಸಂಭ್ರಮಿಸಲು ಬನ್ನಿ.`,
      closingMessage: `ತಮ್ಮ ಶುಭ ಹಾರೈಕೆ ಹಾಗೂ ಉಪಸ್ಥಿತಿಯೇ ನಮಗೆ ಮಹಾ ಪ್ರಸಾದ.`,
      whatsappMessage: `🌸 *ಶುಭ ವಿವಾಹ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ* 🌸\n\n॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥\n\nನಮ್ಮ ಪ್ರೀತಿಯ ${bName} ❤️ ${gName} ಅವರ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ತಮಗೆಲ್ಲರಿಗೂ ಸಕುಟುಂಬ ಸಮೇತ ಆತ್ಮೀಯ ಆಹ್ವಾನ.\n\n📅 ದಿನಾಂಕ: ${dateStr}\n📍 ಸ್ಥಳ: ${loc}\n\nವಿವಾಹ ಆಮಂತ್ರಣ ವೀಕ್ಷಿಸಲು ಲಿಂಕ್ ಒತ್ತಿರಿ:`
    };
  }

  // English variants
  if (tone === 'royal') {
    return {
      welcomeMessage: `॥ Shree Ganeshay Namah ॥\nBy the grace of the Almighty and with the venerable blessings of our esteemed ancestors, the royal families cordially invite you to celebrate the grand wedding of ${bName} and ${gName}.`,
      invitationMessage: `A timeless union of royal heritage, boundless devotion, and auspicious traditions. We request the honour of your esteemed presence to witness this sacred covenant of hearts.`,
      coupleIntroduction: `Descending from illustrious traditions, ${bName} and ${gName} embark upon an eternal voyage together, united in virtue, love, and sacred duty.`,
      ourStory: `From an ordained introduction destined in the stars to a regal courtship forged in mutual reverence, their journey brings two noble dynasties together as one.`,
      eventDescriptions: `From the fragrant haldi and imperial sangeet to the sacred Vedic pheras under the mandap, each ritual embodies the zenith of Indian heritage.`,
      closingMessage: `Your gracious presence, revered blessings, and noble camaraderie will be the crowning glory of our festivities.`,
      whatsappMessage: `👑 *Royal Wedding Invitation* 👑\n\n॥ Shree Ganeshay Namah ॥\n\nWith immense pride and joy, we request the pleasure of your company at the wedding celebrations of\n*${bName}* & *${gName}*\n\n📅 Date: ${dateStr}\n📍 Location: ${loc}\n\nOpen your royal digital invitation below:`
    };
  }

  if (tone === 'romantic') {
    return {
      welcomeMessage: `Every love story is beautiful, but ours is our favorite. With our hearts full of love and our hands gently intertwined, we, ${bName} & ${gName}, invite you to join our celebration.`,
      invitationMessage: `From our very first smile to forever, we knew our souls were meant to dance through life together. Come witness as we exchange our forever vows.`,
      coupleIntroduction: `${bName} found her soulmate in ${gName}, and ${gName} discovered his home in ${bName}. Together, they are two dreamers building one timeless world.`,
      ourStory: `A serendipitous conversation, late-night laughs, shared dreams under starlit skies, and a promise that turned into eternity.`,
      eventDescriptions: `Join us for joyous music, colorful mehendi swirls, vibrant dances, and the magical moment we take our seven sacred steps together.`,
      closingMessage: `We cannot wait to celebrate the beginning of our forever surrounded by the people who mean the world to us.`,
      whatsappMessage: `💖 *We're Getting Married!* 💖\n\nJoin us as we step into our happily ever after!\n\n*${bName}* ❤️ *${gName}*\n\n📅 Date: ${dateStr}\n📍 City: ${loc}\n\nView our wedding invitation & story:`
    };
  }

  // Default Traditional English
  return {
    welcomeMessage: `॥ Shree Ganeshay Namah ॥\nWith the divine blessings of Lord Ganesha and our beloved parents & elders, we cordially invite you to celebrate the wedding ceremony of ${bName} & ${gName}.`,
    invitationMessage: `As two families unite and two souls begin the sacred journey of Grihastha Ashram, we seek your warm presence and heartfelt blessings.`,
    coupleIntroduction: `${bName}, cherished daughter, and ${gName}, beloved son, unite their lives in sacred wedlock guided by enduring Indian values and timeless love.`,
    ourStory: `Brought together by destiny and supported by unconditional family love, their paths crossed to create a harmonious union of values, laughter, and lifelong devotion.`,
    eventDescriptions: `Experience the warmth of traditional ceremonies — auspicious Haldi, joyous Mehendi, vibrant Sangeet, and the solemn Muhurtham vows around the sacred agni.`,
    closingMessage: `Your blessings and loving presence are the most precious gifts we could ever receive as we embark upon this sacred journey.`,
    whatsappMessage: `💍 *Traditional Wedding Invitation* 💍\n\n॥ Shree Ganeshay Namah ॥\n\nTogether with their families, you are joyfully invited to the wedding celebration of\n*${bName}* & *${gName}*\n\n📅 Date: ${dateStr}\n📍 Location: ${loc}\n\nView our digital wedding invitation:`
  };
};

// @desc    Generate wedding invitation content with AI
// @route   POST /api/ai/generate
// @access  Private
export const generateWeddingContent = async (req, res) => {
  try {
    const {
      brideName,
      groomName,
      weddingDate,
      city,
      tone = 'traditional',
      language = 'en',
    } = req.body;

    const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are a master Indian wedding copywriter.
Generate traditional Indian wedding invitation copy for:
Bride: ${brideName || 'Bride'}
Groom: ${groomName || 'Groom'}
Date: ${weddingDate || 'Upcoming auspicious date'}
City: ${city || 'India'}
Tone: ${tone} (e.g. Traditional, Romantic, Elegant, Royal, Simple)
Language: ${language === 'hi' ? 'Hindi' : language === 'kn' ? 'Kannada' : 'English'}

Return ONLY a valid JSON object without markdown fences, with these exact keys:
{
  "welcomeMessage": "...",
  "invitationMessage": "...",
  "coupleIntroduction": "...",
  "ourStory": "...",
  "eventDescriptions": "...",
  "closingMessage": "...",
  "whatsappMessage": "..."
}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();
        const cleanedJson = responseText.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        const parsedData = JSON.parse(cleanedJson);

        return res.json({
          success: true,
          source: 'gemini-ai',
          data: parsedData,
        });
      } catch (aiErr) {
        console.warn('Gemini AI API call failed or timed out, using traditional template engine:', aiErr.message);
      }
    }

    // Fallback to high-quality curated traditional templates
    const fallbackData = generateFallbackContent({
      brideName,
      groomName,
      weddingDate,
      city,
      tone,
      language,
    });

    res.json({
      success: true,
      source: 'template-engine',
      data: fallbackData,
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
