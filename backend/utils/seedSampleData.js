import User from '../models/User.js';
import Wedding from '../models/Wedding.js';
import Event from '../models/Event.js';
import Story from '../models/Story.js';
import Media from '../models/Media.js';
import FamilyMember from '../models/FamilyMember.js';
import GuestbookMessage from '../models/GuestbookMessage.js';
import RSVP from '../models/RSVP.js';
import { generateGoogleMapsUrl, generateGoogleDirectionsUrl } from './mapsUtils.js';

export const seedSampleWedding = async () => {
  try {
    const existingCount = await Wedding.countDocuments();
    if (existingCount > 0) {
      console.log('ℹ️ Database already has wedding records. Skipping sample seed.');
      return;
    }

    console.log('🌱 Seeding rich traditional Indian sample wedding ("Prajwal & Priya")...');

    // 1. Create or find demo user
    let demoUser = await User.findOne({ email: 'demo@wedding.com' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Prajwal Patil',
        email: 'demo@wedding.com',
        password: 'Password123!',
      });
    }

    // 2. Create Wedding
    const weddingDate = new Date('2026-12-25T10:30:00.000Z');
    const wedding = await Wedding.create({
      userId: demoUser._id,
      brideName: 'Priya Kulkarni',
      groomName: 'Prajwal Patil',
      brideParents: 'Smt. Shailaja & Sri. Ramesh Kulkarni',
      groomParents: 'Smt. Sunanda & Sri. Mallikarjun Patil',
      brideBio: 'A passionate classical dancer and architect who finds joy in temple architecture, morning filter coffee, and traditional arts.',
      groomBio: 'A technology strategist and heritage enthusiast with a deep love for Carnatic music, photography, and long conversations.',
      bridePhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      groomPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      couplePhoto: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      weddingDate,
      weddingTime: '10:30 AM',
      city: 'Vijayapura',
      state: 'Karnataka',
      country: 'India',
      weddingHashtag: '#PriyaWedsPrajwal',
      weddingDescription: 'Two souls, one sacred bond. Bound by tradition and blessed by elders, we warmly invite you to witness our holy matrimony.',
      language: 'en',
      template: 'traditional-royal',
      status: 'published',
      slug: 'prajwal-and-priya',
      welcomeMessage: 'With the divine blessings of Lord Ganesha and our beloved parents & elders, we invite you to join us as we celebrate our holy union.',
      closingMessage: 'Your loving presence, prayers, and heartfelt blessings are the greatest gifts we could ever ask for as we begin our sacred journey.',
      musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-flute-meditation-112194.mp3',
      musicTitle: 'Auspicious Classical Shehnai & Flute',
      musicAutoplay: true,
      cinematicVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      liveStreamUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      giftInfo: {
        enabled: true,
        title: 'Your Presence Is Our Greatest Gift',
        message: 'No physical gifts please, only your warm blessings and heartfelt prayers are requested.',
        upiId: 'prajwal.patil@upi',
      },
      themeSettings: {
        primaryColor: '#580D1A',
        accentColor: '#D4AF37',
        fontStyle: 'serif',
        decorativeStyle: 'mandala',
      },
    });

    // 3. Create Events with Venue & Google Maps links
    const eventsData = [
      {
        name: 'Auspicious Haldi Ceremony',
        description: 'A vibrant morning of auspicious turmeric blessings, traditional mangala snanam, and lively folk songs.',
        date: new Date('2026-12-23T09:00:00.000Z'),
        startTime: '09:00 AM',
        endTime: '12:30 PM',
        dressCode: 'Sunshine Yellow & Festive Traditional',
        venueName: 'Patil Ancestral Heritage Home',
        venueAddress: 'Vijayapura, Karnataka',
        image: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
        order: 1,
      },
      {
        name: 'Mehendi & Sangeet Celebration',
        description: 'An enchanting evening of henna artistry, dazzling dance performances, royal feasts, and festive melodies.',
        date: new Date('2026-12-24T18:00:00.000Z'),
        startTime: '06:00 PM',
        endTime: '11:00 PM',
        dressCode: 'Royal Indo-Western & Vibrant Ethnic',
        venueName: 'The Royal Orchid Convention Hall',
        venueAddress: 'Station Road, Vijayapura, Karnataka',
        image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
        order: 2,
      },
      {
        name: 'Sacred Muhurtham (Wedding Ceremony)',
        description: 'The auspicious Vedic ceremony: Kanyadaana, Mangalasutra Dharana, and the sacred Saptapadi (seven vows around the holy fire).',
        date: new Date('2026-12-25T10:30:00.000Z'),
        startTime: '10:30 AM',
        endTime: '01:30 PM',
        dressCode: 'Traditional Kanjeevaram Sarees & Pure Silk Dhotis',
        venueName: 'Sri Sai Convention Hall',
        venueAddress: 'Solapur Road, Vijayapura, Karnataka',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        order: 3,
      },
      {
        name: 'Grand Wedding Reception',
        description: 'An unforgettable evening of joy, felicitation, live Carnatic fusion music, and a celebratory royal dinner.',
        date: new Date('2026-12-26T19:00:00.000Z'),
        startTime: '07:00 PM',
        endTime: '11:00 PM',
        dressCode: 'Black Tie, Formal Sarees & Royal Sherwanis',
        venueName: 'The Leela Palace Grand Ballroom',
        venueAddress: 'Athani Road, Vijayapura, Karnataka',
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

    // 4. Create Love Story Milestones
    const milestones = [
      {
        title: 'First Meeting',
        date: 'October 2023',
        description: 'A serendipitous afternoon at a heritage bookstore in Bangalore over warm artisanal filter coffee.',
        photo: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
        order: 1,
      },
      {
        title: 'First Date',
        date: 'December 2023',
        description: 'A stroll through Lalbagh Botanical Gardens under ancient trees, sharing our childhood dreams and laughs.',
        photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
        order: 2,
      },
      {
        title: 'Meeting the Families',
        date: 'July 2024',
        description: 'Warm conversations, joyful blessings from our parents, and an unspoken knowing that this was home.',
        photo: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        order: 3,
      },
      {
        title: 'The Proposal',
        date: 'February 2025',
        description: 'At sunset overlooking the golden boulders of Hampi, Prajwal asked Priya to walk hand in hand forever.',
        photo: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
        order: 4,
      },
      {
        title: 'Forever Begins',
        date: 'December 2026',
        description: 'Taking our sacred seven steps together surrounded by all our cherished loved ones.',
        photo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        order: 5,
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
      { name: 'Ananya Kulkarni', relationship: "Sister of the Bride", side: 'bride', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', order: 5 },
      { name: 'Aditya Patil', relationship: "Brother of the Groom", side: 'groom', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', order: 6 },
    ];

    for (const f of familyMembersData) {
      await FamilyMember.create({ weddingId: wedding._id, ...f });
    }

    // 6. Create Gallery Media
    const mediaItems = [
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80', category: 'couple', title: 'Traditional Attire Portrait', isHero: true, isGallery: true, order: 1 },
      { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80', category: 'pre-wedding', title: 'Golden Hour Laughs', isGallery: true, order: 2 },
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80', category: 'engagement', title: 'Ring Exchange Ceremony', isGallery: true, order: 3 },
      { url: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=1000&q=80', category: 'preparation', title: 'Floral Mandap Arrangements', isGallery: true, order: 4 },
      { url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80', category: 'events', title: 'Intricate Mehendi Designs', isGallery: true, order: 5 },
      { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80', category: 'family', title: 'Grandparents Blessing', isGallery: true, order: 6 },
    ];

    for (const item of mediaItems) {
      await Media.create({ weddingId: wedding._id, ...item });
    }

    // 7. Create Sample Guestbook Messages
    const blessings = [
      { name: 'Dr. Anand Joshi & Family', message: 'May your sacred union be blessed with boundless health, joy, and peace. Wishing Prajwal & Priya a magnificent life ahead! 🙏✨' },
      { name: 'Meera Rao', message: 'Heartiest congratulations Priya & Prajwal! Looking forward to dancing at the Sangeet and witnessing the sacred Muhurtham.' },
      { name: 'Rajesh & Shweta Hegde', message: 'A truly divine match made in heaven. May Lord Ganesha bestow all his blessings upon both of you.' },
    ];

    for (const b of blessings) {
      await GuestbookMessage.create({ weddingId: wedding._id, ...b, status: 'approved' });
    }

    // 8. Create Sample RSVPs
    const rsvps = [
      { name: 'Vikram Deshmukh', phone: '+919876543210', attending: 'attending', guestsCount: 2, foodPreference: 'vegetarian', eventsAttending: ['Muhurtham', 'Reception'], message: 'Delighted to attend and celebrate with you both!' },
      { name: 'Sneha & Arun Nair', phone: '+919876543211', attending: 'attending', guestsCount: 4, foodPreference: 'non-vegetarian', eventsAttending: ['Sangeet', 'Reception'], message: 'Looking forward to the grand party!' },
      { name: 'Kavitha Shenoy', phone: '+919876543212', attending: 'attending', guestsCount: 1, foodPreference: 'jain', eventsAttending: ['Haldi', 'Muhurtham'], message: 'Wishing you both a joyous married life.' },
      { name: 'Rohit Verma', phone: '+919876543213', attending: 'declined', guestsCount: 1, foodPreference: 'vegetarian', eventsAttending: [], message: 'Deeply regret missing due to overseas travel. Sending all our love!' },
    ];

    for (const r of rsvps) {
      await RSVP.create({ weddingId: wedding._id, ...r });
    }

    console.log('✅ Rich traditional Indian sample wedding ("Prajwal & Priya") seeded successfully! Public URL: /w/prajwal-and-priya');
  } catch (err) {
    console.error('Error seeding sample wedding:', err);
  }
};
