import User from '../models/User.js';
import Wedding from '../models/Wedding.js';
import Event from '../models/Event.js';
import Story from '../models/Story.js';
import Media from '../models/Media.js';
import FamilyMember from '../models/FamilyMember.js';
import GuestbookMessage from '../models/GuestbookMessage.js';
import { generateGoogleMapsUrl, generateGoogleDirectionsUrl } from './mapsUtils.js';

export const seedSampleWedding = async () => {
  try {
    // Clear and re-seed to ensure authentic Indian photography and deities content
    await Promise.all([
      Wedding.deleteMany({ slug: 'prajwal-and-priya' }),
      User.deleteMany({ email: 'demo@wedding.com' }),
    ]);

    console.log('🌱 Seeding pure traditional Indian wedding with authentic photography & deities ("Priya & Prajwal")...');

    // 1. Create Demo User
    const demoUser = await User.create({
      name: 'Prajwal Patil',
      email: 'demo@wedding.com',
      password: 'Password123!',
    });

    // 2. Create Wedding with Authentic Indian Photos & Deities
    const weddingDate = new Date('2026-12-25T10:30:00.000Z');
    const wedding = await Wedding.create({
      userId: demoUser._id,
      brideName: 'Priya Kulkarni',
      groomName: 'Prajwal Patil',
      brideParents: 'Smt. Shailaja & Sri. Ramesh Kulkarni',
      groomParents: 'Smt. Sunanda & Sri. Mallikarjun Patil',
      brideBio: 'A devoted classical Bharatanatyam dancer and architect with a deep appreciation for temple architecture and age-old traditions.',
      groomBio: 'A technology strategist with a heartfelt love for Carnatic classical music, Indian heritage, and photography.',
      // High-quality authentic Indian bride, groom, and couple photography
      bridePhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      groomPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      couplePhoto: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85',
      weddingDate,
      weddingTime: '10:30 AM',
      city: 'Vijayapura',
      state: 'Karnataka',
      country: 'India',
      weddingHashtag: '#PriyaWedsPrajwal',
      weddingDescription: 'Two souls, one sacred bond. Blessed by Lord Ganesha and united under the divine grace of Sri Krishna & Rukmini Devi, we warmly invite you to celebrate our holy matrimony.',
      language: 'en',
      template: 'traditional-royal',
      status: 'published',
      slug: 'prajwal-and-priya',
      welcomeMessage: '॥ श्री गणेशाय नमः ॥\nWith the divine blessings of Lord Ganesha, Sri Krishna & Rukmini, and our beloved parents & elders, we invite you to join us as we begin this sacred chapter of Grihastha Ashram.',
      closingMessage: 'Your loving presence, prayers, and heartfelt blessings are the greatest gifts we could ever ask for as we take our seven sacred steps together.',
      musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-flute-meditation-112194.mp3',
      musicTitle: 'Auspicious Classical Shehnai & Bansuri',
      musicAutoplay: true,
      cinematicVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      liveStreamUrl: '',
      giftInfo: {
        enabled: false,
      },
      themeSettings: {
        primaryColor: '#580D1A',
        accentColor: '#D4AF37',
        fontStyle: 'serif',
        decorativeStyle: 'mandala',
      },
    });

    // 3. Create Traditional Indian Ceremonies with Working Google Maps Links
    const eventsData = [
      {
        name: 'Auspicious Haldi Ceremony (ಮಂಗಳ ಸ್ನಾನ)',
        description: 'A sacred morning of holy turmeric paste blessings, traditional mangala snanam, and lively folk songs.',
        date: new Date('2026-12-23T09:00:00.000Z'),
        startTime: '09:00 AM',
        endTime: '12:30 PM',
        dressCode: 'Sunshine Yellow & Traditional Silk',
        venueName: 'Patil Ancestral Heritage Home',
        venueAddress: 'Solapur Road, Vijayapura, Karnataka',
        image: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
        order: 1,
      },
      {
        name: 'Mehendi & Sangeet Utsav',
        description: 'An enchanting festive evening of intricate henna artistry, traditional dance performances, and feast.',
        date: new Date('2026-12-24T18:00:00.000Z'),
        startTime: '06:00 PM',
        endTime: '11:00 PM',
        dressCode: 'Royal Ethnic & Vibrant Silk',
        venueName: 'The Royal Orchid Convention Hall',
        venueAddress: 'Station Road, Vijayapura, Karnataka',
        image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
        order: 2,
      },
      {
        name: 'Sacred Muhurtham (ಮಾಂಗಲ್ಯ ಧಾರಣೆ)',
        description: 'The Vedic ceremony: Kanyadaana, Mangalasutra Dharana, and the sacred Saptapadi (seven vows around the holy agni).',
        date: new Date('2026-12-25T10:30:00.000Z'),
        startTime: '10:30 AM',
        endTime: '01:30 PM',
        dressCode: 'Traditional Kanjeevaram Sarees & Silk Dhotis',
        venueName: 'Sri Sai Convention Hall',
        venueAddress: 'Solapur Road, Vijayapura, Karnataka',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        order: 3,
      },
      {
        name: 'Grand Wedding Reception',
        description: 'An unforgettable evening of joy, felicitation, live Carnatic classical instrumental music, and royal dinner.',
        date: new Date('2026-12-26T19:00:00.000Z'),
        startTime: '07:00 PM',
        endTime: '11:00 PM',
        dressCode: 'Traditional Grand Attire & Evening Formals',
        venueName: 'The Royal Heritage Palace Grand Hall',
        venueAddress: 'Bagalkot Road, Vijayapura, Karnataka',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        order: 4,
      },
    ];

    for (const ev of eventsData) {
      await Event.create({
        weddingId: wedding._id,
        ...ev,
        googleMapsUrl: generateGoogleMapsUrl(ev.venueName, ev.venueAddress),
        googleDirectionsUrl: generateGoogleDirectionsUrl(ev.venueName, ev.venueAddress),
      });
    }

    // 4. Create Traditional Love Story Milestones
    const milestones = [
      {
        title: 'First Meeting with Blessings',
        date: 'October 2023',
        description: 'A serene introduction guided by families at the historic Badami temple courtyard over warm filter coffee.',
        photo: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
        order: 1,
      },
      {
        title: 'A Shared Bond of Values',
        date: 'December 2023',
        description: 'Discovering a shared reverence for classical art, ancient heritage, and family devotion.',
        photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
        order: 2,
      },
      {
        title: 'Blessings of Elders (ನಿಶ್ಚಿತಾರ್ಥ)',
        date: 'July 2024',
        description: 'With Vedic chanting and exchange of coconut & betel leaves, the families joyfully confirmed the engagement.',
        photo: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        order: 3,
      },
      {
        title: 'Forever Begins',
        date: 'December 2026',
        description: 'Taking our seven sacred steps around the holy fire, stepping into an auspicious lifetime together.',
        photo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        order: 4,
      },
    ];

    for (const m of milestones) {
      await Story.create({ weddingId: wedding._id, ...m });
    }

    // 5. Create Family Members
    const familyMembersData = [
      { name: 'Sri. Ramesh Kulkarni', relationship: "Father of the Bride", side: 'bride', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', order: 1 },
      { name: 'Smt. Shailaja Kulkarni', relationship: "Mother of the Bride", side: 'bride', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', order: 2 },
      { name: 'Sri. Mallikarjun Patil', relationship: "Father of the Groom", side: 'groom', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', order: 3 },
      { name: 'Smt. Sunanda Patil', relationship: "Mother of the Groom", side: 'groom', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', order: 4 },
    ];

    for (const f of familyMembersData) {
      await FamilyMember.create({ weddingId: wedding._id, ...f });
    }

    // 6. Create Authentic Indian Media Gallery
    const mediaItems = [
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80', category: 'couple', title: 'Traditional Silk Attire', isHero: true, isGallery: true, order: 1 },
      { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80', category: 'pre-wedding', title: 'Temple Arch Courtyard', isGallery: true, order: 2 },
      { url: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=1000&q=80', category: 'preparation', title: 'Floral Mandap & Brass Urli', isGallery: true, order: 3 },
      { url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80', category: 'events', title: 'Intricate Bridal Mehendi', isGallery: true, order: 4 },
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80', category: 'engagement', title: 'Sacred Garlands (ಮಾಲೆ)', isGallery: true, order: 5 },
      { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80', category: 'family', title: 'Elders Bestowing Akshate', isGallery: true, order: 6 },
    ];

    for (const item of mediaItems) {
      await Media.create({ weddingId: wedding._id, ...item });
    }

    // 7. Create Sample Heartfelt Blessings
    const blessings = [
      { name: 'Dr. Anand Joshi & Family', message: '॥ ॐ श्री गणेशाय नमः ॥ May your sacred marital union be endowed with boundless health, dharma, and joy. Looking forward to witnessing the sacred Muhurtham! 🙏✨' },
      { name: 'Meera & Raghavendra Rao', message: 'Heartiest congratulations Priya & Prajwal! A match blessed by Lord Krishna & Rukmini Devi. May your home always be filled with warmth and laughter.' },
      { name: 'Rajesh & Shweta Hegde', message: 'May the holy vows you exchange bring lifelong prosperity and spiritual peace to both families. Best wishes! 🌸' },
    ];

    for (const b of blessings) {
      await GuestbookMessage.create({ weddingId: wedding._id, ...b, status: 'approved' });
    }

    console.log('✅ Authentic Indian wedding successfully seeded! Accessible at root /');
  } catch (err) {
    console.error('Error seeding sample wedding:', err);
  }
};
