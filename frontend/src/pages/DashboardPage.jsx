import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Image,
  Palette,
  Share2,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  Download,
  CheckCircle,
  Eye,
  LogOut,
  Clock,
  Shirt,
  Volume2,
} from 'lucide-react';
import { weddingService, eventService, rsvpService, guestbookService, aiService, mediaService } from '../services/api';
import { generateGoogleMapsUrl, generateGoogleDirectionsUrl } from '../services/mapsService';
import { useAuth } from '../context/AuthContext';
import { TEMPLATES } from '../templates/templateStyles';
import { DiyaOrnament, MandalaOrnament } from '../components/common/TraditionalOrnaments';
import { WhatsAppShareModal } from '../components/invitation/WhatsAppShareModal';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [weddingData, setWeddingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Modals / sub-state
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    name: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    dressCode: '',
    venueName: '',
    venueAddress: '',
  });

  // AI Writer State
  const [aiTone, setAiTone] = useState('royal');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // RSVP filter
  const [rsvpFilter, setRsvpFilter] = useState('all');
  const [rsvpSearch, setRsvpSearch] = useState('');

  const loadWeddingData = async () => {
    try {
      setLoading(true);
      const res = await weddingService.getMyWeddings();
      if (res.data?.success && res.data.data?.length > 0) {
        // Load first wedding with full details
        const fullRes = await weddingService.getWeddingById(res.data.data[0]._id);
        if (fullRes.data?.success) {
          setWeddingData(fullRes.data.data);
        }
      } else {
        setWeddingData(null);
      }
    } catch (err) {
      console.warn('Error fetching wedding details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeddingData();
  }, []);

  const handleTogglePublish = async () => {
    if (!weddingData?.wedding) return;
    const current = weddingData.wedding.status;
    const nextStatus = current === 'published' ? 'draft' : 'published';

    try {
      const res = await weddingService.publishWedding(weddingData.wedding._id, nextStatus);
      if (res.data?.success) {
        setWeddingData((prev) => ({
          ...prev,
          wedding: { ...prev.wedding, status: nextStatus },
        }));
        setStatusMessage(`Wedding is now ${nextStatus}!`);
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await eventService.updateEvent(editingEvent._id, eventForm);
      } else {
        await eventService.createEvent(weddingData.wedding._id, eventForm);
      }
      setShowEventModal(false);
      setEditingEvent(null);
      loadWeddingData();
    } catch (err) {
      console.error('Error saving event:', err);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await eventService.deleteEvent(eventId);
      loadWeddingData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModerateBlessing = async (blessingId, status) => {
    try {
      await guestbookService.updateStatus(blessingId, status);
      loadWeddingData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlessing = async (blessingId) => {
    if (!window.confirm('Delete this blessing?')) return;
    try {
      await guestbookService.deleteBlessing(blessingId);
      loadWeddingData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAIWriter = async () => {
    if (!weddingData?.wedding) return;
    setAiGenerating(true);
    try {
      const res = await aiService.generateContent({
        brideName: weddingData.wedding.brideName,
        groomName: weddingData.wedding.groomName,
        weddingDate: weddingData.wedding.weddingDate,
        city: weddingData.wedding.city,
        tone: aiTone,
        language: weddingData.wedding.language,
      });

      if (res.data?.success) {
        setAiResult(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleApplyAICopy = async (key, value) => {
    try {
      await weddingService.updateWedding(weddingData.wedding._id, {
        [key]: value,
      });
      loadWeddingData();
      setStatusMessage('Content updated successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTemplateChange = async (templateId) => {
    try {
      await weddingService.updateWedding(weddingData.wedding._id, {
        template: templateId,
      });
      loadWeddingData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2D060E] text-gold-400 flex flex-col items-center justify-center p-4">
        <MandalaOrnament size={80} className="w-16 h-16 animate-spin-slow mb-4" />
        <h2 className="font-serif text-2xl font-bold">Loading Dashboard...</h2>
      </div>
    );
  }

  // If no wedding exists, show create prompt
  if (!weddingData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2D060E] to-[#1A0307] text-stone-100 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#4A0A17] p-8 rounded-3xl border-2 border-gold-500/50 text-center shadow-2xl">
          <DiyaOrnament className="w-14 h-14 text-gold-400 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-gold-gradient mb-2">
            Welcome, {user?.name || 'Couple'}!
          </h2>
          <p className="text-stone-300 font-sans text-sm mb-6">
            You haven't created your wedding invitation yet. Start now with our easy guided setup.
          </p>
          <Link
            to="/create"
            className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:brightness-110 transition-all inline-block"
          >
            Create Your Wedding Invitation
          </Link>
        </div>
      </div>
    );
  }

  const { wedding, events = [], rsvps = [], rsvpStats, guestbookMessages = [] } = weddingData;
  const publicUrl = `${window.location.origin}/w/${wedding.slug}`;

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter((r) => {
    if (rsvpFilter === 'attending' && r.attending !== 'attending') return false;
    if (rsvpFilter === 'declined' && r.attending !== 'declined') return false;
    if (rsvpSearch) {
      const q = rsvpSearch.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.phone.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#25050C] via-[#350811] to-[#180307] text-stone-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#25050C]/95 backdrop-blur-md border-b border-gold-500/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DiyaOrnament className="w-7 h-7 text-gold-400" />
          <span className="font-serif text-xl font-bold text-gold-gradient">
            Vangmaya Admin
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to={`/w/${wedding.slug}`}
            target="_blank"
            className="px-3.5 py-1.5 rounded-full bg-black/40 border border-gold-400/50 text-gold-300 text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-500 hover:text-maroon-950 transition-all"
          >
            <span>Live Card</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setShareModalOpen(true)}
            className="p-2 rounded-full bg-[#580D1A] border border-gold-400/50 text-gold-300 hover:bg-gold-500 hover:text-maroon-950 transition-all"
            title="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-full text-stone-400 hover:text-red-400"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          {/* Quick Wedding Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/40 shadow-royal mb-6 text-center">
            <span
              className={`inline-block px-3 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-widest mb-2 ${
                wedding.status === 'published'
                  ? 'bg-green-700/80 text-green-200 border border-green-500/40'
                  : 'bg-yellow-700/80 text-yellow-200 border border-yellow-500/40'
              }`}
            >
              {wedding.status}
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-100">
              {wedding.brideName} & {wedding.groomName}
            </h3>
            <p className="text-xs text-gold-300 font-sans mt-1">
              {new Date(wedding.weddingDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>

            <button
              onClick={handleTogglePublish}
              className={`mt-4 w-full py-2 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all ${
                wedding.status === 'published'
                  ? 'bg-yellow-600/80 hover:bg-yellow-600 text-stone-900'
                  : 'bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 hover:brightness-110 shadow-gold-glow'
              }`}
            >
              {wedding.status === 'published' ? 'Unpublish' : 'Publish Live'}
            </button>
          </div>

          {/* Navigation Links */}
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Users },
            { id: 'events', label: 'Ceremonies & Venues', icon: MapPin },
            { id: 'rsvps', label: 'RSVP Responses', icon: Users },
            { id: 'guestbook', label: 'Blessings Guestbook', icon: MessageSquare },
            { id: 'ai', label: 'AI Copywriter', icon: Sparkles },
            { id: 'templates', label: 'Theme & Template', icon: Palette },
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-serif text-sm transition-all text-left ${
                  activeTab === nav.id
                    ? 'bg-gold-500 text-maroon-950 font-bold shadow-gold-glow'
                    : 'bg-[#3B0811]/60 text-gold-300 hover:bg-[#4A0A17] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{nav.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Tab Content Panels */}
        <main className="flex-1 min-w-0">
          {statusMessage && (
            <div className="mb-6 p-4 rounded-xl bg-green-900/60 border border-green-500/50 text-green-200 text-xs font-sans">
              {statusMessage}
            </div>
          )}

          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Analytics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/40 text-center">
                  <span className="text-3xl font-serif font-bold text-gold-gradient block">
                    {rsvpStats?.total || 0}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-gold-300">Total RSVPs</span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/40 text-center">
                  <span className="text-3xl font-serif font-bold text-green-400 block">
                    {rsvpStats?.totalGuests || 0}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-gold-300">Expected Guests</span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/40 text-center">
                  <span className="text-3xl font-serif font-bold text-gold-400 block">
                    {events.length}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-gold-300">Ceremonies</span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/40 text-center">
                  <span className="text-3xl font-serif font-bold text-gold-400 block">
                    {guestbookMessages.length}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-gold-300">Blessings</span>
                </div>
              </div>

              {/* Share Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#580D1A] to-[#38060E] border-2 border-gold-500/50 shadow-royal flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-gold-gradient">
                    Your Digital Invitation Link
                  </h3>
                  <p className="text-xs text-stone-300 font-mono mt-1 break-all">
                    {publicUrl}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(publicUrl);
                      setStatusMessage('Invitation link copied to clipboard!');
                      setTimeout(() => setStatusMessage(''), 2500);
                    }}
                    className="px-4 py-2 rounded-full bg-black/40 border border-gold-400 text-gold-300 text-xs font-serif uppercase tracking-wider hover:bg-white/10"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110"
                  >
                    Share WhatsApp
                  </button>
                </div>
              </div>

              {/* Quick Details List */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/40 space-y-4">
                <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-500/20 pb-2">
                  Invitation Configuration
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-gold-400 block">Ceremony Location:</span>
                    <p className="text-stone-200">{wedding.city}, {wedding.state}, {wedding.country}</p>
                  </div>
                  <div>
                    <span className="text-gold-400 block">Selected Template:</span>
                    <p className="text-stone-200 capitalize">{wedding.template.replace(/-/g, ' ')}</p>
                  </div>
                  <div>
                    <span className="text-gold-400 block">Hashtag:</span>
                    <p className="text-stone-200">{wedding.weddingHashtag || 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-gold-400 block">Background Music:</span>
                    <p className="text-stone-200">{wedding.musicTitle || 'Traditional Shehnai'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. CEREMONIES & EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gold-gradient">
                    Wedding Ceremonies & Venues
                  </h2>
                  <p className="text-xs text-stone-300 font-sans">
                    Each ceremony supports a distinct venue with auto-generated Google Maps and Directions links.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setEventForm({
                      name: '',
                      description: '',
                      date: wedding.weddingDate ? wedding.weddingDate.slice(0, 10) : '',
                      startTime: '',
                      endTime: '',
                      dressCode: '',
                      venueName: '',
                      venueAddress: '',
                    });
                    setShowEventModal(true);
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Ceremony</span>
                </button>
              </div>

              {/* Event Cards */}
              <div className="space-y-4">
                {events.map((ev) => {
                  const mapsUrl = ev.googleMapsUrl || generateGoogleMapsUrl(ev.venueName, ev.venueAddress);
                  const directionsUrl = ev.googleDirectionsUrl || generateGoogleDirectionsUrl(ev.venueName, ev.venueAddress);

                  return (
                    <div
                      key={ev._id}
                      className="p-6 rounded-2xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/40 shadow-royal flex flex-col sm:flex-row justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-serif font-bold bg-[#580D1A] text-gold-300 px-3 py-0.5 rounded-full border border-gold-500/30">
                            {new Date(ev.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          {ev.startTime && (
                            <span className="text-xs text-gold-200/80">
                              {ev.startTime} {ev.endTime ? `– ${ev.endTime}` : ''}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-2xl font-bold text-stone-100">{ev.name}</h3>
                        {ev.description && <p className="text-stone-300 text-xs">{ev.description}</p>}

                        {(ev.venueName || ev.venueAddress) && (
                          <div className="pt-2">
                            <p className="text-xs text-gold-300 flex items-start gap-1">
                              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                              <span>
                                <strong>{ev.venueName}</strong> — {ev.venueAddress}
                              </span>
                            </p>

                            {/* Google Maps link verification */}
                            {mapsUrl && (
                              <div className="flex items-center gap-3 mt-2 text-[11px]">
                                <a
                                  href={mapsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gold-400 hover:underline flex items-center gap-1"
                                >
                                  <span>📍 Test View Location</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                                <span className="text-stone-500">|</span>
                                <a
                                  href={directionsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gold-400 hover:underline flex items-center gap-1"
                                >
                                  <span>🧭 Test Get Directions</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingEvent(ev);
                            setEventForm({
                              name: ev.name,
                              description: ev.description || '',
                              date: ev.date ? ev.date.slice(0, 10) : '',
                              startTime: ev.startTime || '',
                              endTime: ev.endTime || '',
                              dressCode: ev.dressCode || '',
                              venueName: ev.venueName || '',
                              venueAddress: ev.venueAddress || '',
                            });
                            setShowEventModal(true);
                          }}
                          className="p-2 rounded-lg bg-black/40 border border-gold-500/30 text-gold-300 hover:bg-gold-500 hover:text-maroon-950 transition-all"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev._id)}
                          className="p-2 rounded-lg bg-black/40 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. RSVPS TAB */}
          {activeTab === 'rsvps' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gold-gradient">
                    Guest RSVPs
                  </h2>
                  <p className="text-xs text-stone-300 font-sans">
                    Track guest attendance, dietary preferences, and export full roster to CSV.
                  </p>
                </div>

                <a
                  href={rsvpService.exportCSVUrl(wedding._id)}
                  download
                  className="px-4 py-2 rounded-full bg-[#580D1A] border border-gold-400 text-gold-300 font-serif text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-500 hover:text-maroon-950 transition-all shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </a>
              </div>

              {/* Food Preference Breakdown Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-black/30 border border-gold-500/20 rounded-xl text-center">
                  <span className="text-xs text-gold-400 block">Vegetarian</span>
                  <strong className="text-xl font-serif text-stone-100">{rsvpStats?.foodPreferences?.vegetarian || 0}</strong>
                </div>
                <div className="p-3 bg-black/30 border border-gold-500/20 rounded-xl text-center">
                  <span className="text-xs text-gold-400 block">Non-Vegetarian</span>
                  <strong className="text-xl font-serif text-stone-100">{rsvpStats?.foodPreferences?.nonVegetarian || 0}</strong>
                </div>
                <div className="p-3 bg-black/30 border border-gold-500/20 rounded-xl text-center">
                  <span className="text-xs text-gold-400 block">Jain</span>
                  <strong className="text-xl font-serif text-stone-100">{rsvpStats?.foodPreferences?.jain || 0}</strong>
                </div>
                <div className="p-3 bg-black/30 border border-gold-500/20 rounded-xl text-center">
                  <span className="text-xs text-gold-400 block">Declined</span>
                  <strong className="text-xl font-serif text-stone-100">{rsvpStats?.declined || 0}</strong>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search by guest name or phone..."
                  value={rsvpSearch}
                  onChange={(e) => setRsvpSearch(e.target.value)}
                  className="flex-1 bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-xs text-stone-100 placeholder-stone-500"
                />
                <select
                  value={rsvpFilter}
                  onChange={(e) => setRsvpFilter(e.target.value)}
                  className="bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-xs text-gold-300 font-serif"
                >
                  <option value="all">All Responses</option>
                  <option value="attending">Attending Only</option>
                  <option value="declined">Declined Only</option>
                </select>
              </div>

              {/* RSVPs Table */}
              <div className="overflow-x-auto rounded-2xl border border-gold-500/30 bg-[#380811]/70">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#4A0A17] text-gold-300 font-serif uppercase tracking-wider border-b border-gold-500/20">
                    <tr>
                      <th className="p-3">Guest Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Guests</th>
                      <th className="p-3">Diet</th>
                      <th className="p-3">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-500/10 text-stone-300">
                    {filteredRsvps.map((r) => (
                      <tr key={r._id} className="hover:bg-white/5">
                        <td className="p-3 font-semibold text-stone-100">{r.name}</td>
                        <td className="p-3">{r.phone}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-serif ${
                              r.attending === 'attending'
                                ? 'bg-green-800/60 text-green-200'
                                : 'bg-red-800/60 text-red-200'
                            }`}
                          >
                            {r.attending}
                          </span>
                        </td>
                        <td className="p-3">{r.guestsCount}</td>
                        <td className="p-3 capitalize">{r.foodPreference}</td>
                        <td className="p-3 max-w-xs truncate">{r.message || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. GUESTBOOK MODERATION TAB */}
          {activeTab === 'guestbook' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gold-gradient">
                  Blessings & Wishes Moderation
                </h2>
                <p className="text-xs text-stone-300 font-sans">
                  Review and moderate guest messages before or while they appear on your invitation page.
                </p>
              </div>

              <div className="space-y-4">
                {guestbookMessages.map((msg) => (
                  <div
                    key={msg._id}
                    className="p-5 rounded-2xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border border-gold-500/30 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif text-lg font-bold text-stone-100">{msg.name}</h4>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-serif ${
                            msg.status === 'approved'
                              ? 'bg-green-900/60 text-green-300'
                              : msg.status === 'hidden'
                              ? 'bg-stone-800 text-stone-400'
                              : 'bg-yellow-900/60 text-yellow-300'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-stone-300 text-xs font-sans italic leading-relaxed">
                        "{msg.message}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {msg.status !== 'approved' && (
                        <button
                          onClick={() => handleModerateBlessing(msg._id, 'approved')}
                          className="px-3 py-1 rounded-full bg-green-700 hover:bg-green-600 text-white text-[11px] font-serif uppercase"
                        >
                          Approve
                        </button>
                      )}
                      {msg.status !== 'hidden' && (
                        <button
                          onClick={() => handleModerateBlessing(msg._id, 'hidden')}
                          className="px-3 py-1 rounded-full bg-stone-700 hover:bg-stone-600 text-white text-[11px] font-serif uppercase"
                        >
                          Hide
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteBlessing(msg._id)}
                        className="p-1.5 rounded-full text-red-400 hover:bg-red-900/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. AI COPYWRITER TAB */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-b from-[#4A0A17] to-[#2B050E] border-2 border-gold-500/40 shadow-royal">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-gold-400" />
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gold-gradient">
                      AI Wedding Content Writer
                    </h2>
                    <p className="text-xs text-stone-300 font-sans">
                      Generate authentic traditional welcome shlokas, couple descriptions, and WhatsApp invitations.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <select
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-xs text-gold-300 font-serif"
                  >
                    <option value="royal">Royal Rajput / Dynasty Tone</option>
                    <option value="traditional">Traditional Vedic Tone</option>
                    <option value="romantic">Romantic & Warm Tone</option>
                    <option value="elegant">Elegant & Poetic Tone</option>
                    <option value="simple">Minimal & Graceful Tone</option>
                  </select>

                  <button
                    onClick={handleAIWriter}
                    disabled={aiGenerating}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow hover:brightness-110"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{aiGenerating ? 'Composing Auspicious Words...' : '✨ Generate Invitation Content'}</span>
                  </button>
                </div>
              </div>

              {aiResult && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-black/40 border border-gold-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg font-bold text-gold-300">Generated Welcome Message</h4>
                      <button
                        onClick={() => handleApplyAICopy('welcomeMessage', aiResult.welcomeMessage)}
                        className="px-3 py-1 rounded-full bg-gold-500 text-maroon-950 text-xs font-serif font-bold uppercase"
                      >
                        Apply to Invitation
                      </button>
                    </div>
                    <p className="text-stone-200 text-xs leading-relaxed whitespace-pre-line">
                      {aiResult.welcomeMessage}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-gold-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg font-bold text-gold-300">Generated Invitation Description</h4>
                      <button
                        onClick={() => handleApplyAICopy('weddingDescription', aiResult.invitationMessage)}
                        className="px-3 py-1 rounded-full bg-gold-500 text-maroon-950 text-xs font-serif font-bold uppercase"
                      >
                        Apply to Invitation
                      </button>
                    </div>
                    <p className="text-stone-200 text-xs leading-relaxed whitespace-pre-line">
                      {aiResult.invitationMessage}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-gold-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg font-bold text-gold-300">Generated WhatsApp Share Message</h4>
                    </div>
                    <p className="text-stone-200 text-xs leading-relaxed font-mono whitespace-pre-line bg-black/30 p-3 rounded-lg">
                      {aiResult.whatsappMessage}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. TEMPLATES & THEME TAB */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gold-gradient">
                  Select Wedding Aesthetic & Template
                </h2>
                <p className="text-xs text-stone-300 font-sans">
                  Switch instantly between 6 authentic Indian wedding styles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(TEMPLATES).map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    className={`cursor-pointer p-6 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                      wedding.template === t.id
                        ? 'border-gold-400 bg-[#580D1A] shadow-gold-glow scale-105'
                        : 'border-gold-500/30 bg-[#3B0811] hover:border-gold-500/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-gold-300 font-serif">
                          {t.badge}
                        </span>
                        {wedding.template === t.id && (
                          <CheckCircle className="w-5 h-5 text-gold-400" />
                        )}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-stone-100">{t.name}</h3>
                      <p className="text-stone-300 text-xs font-sans mt-2">{t.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: t.primaryColor }}></span>
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: t.accentColor }}></span>
                      </div>
                      <span className="text-xs font-serif uppercase tracking-wider text-gold-400">
                        {wedding.template === t.id ? 'Active' : 'Select'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-6 sm:p-8 rounded-3xl border-2 border-gold-500/50 shadow-2xl my-8">
            <h3 className="font-serif text-2xl font-bold text-gold-gradient mb-4">
              {editingEvent ? 'Edit Ceremony' : 'Add New Ceremony'}
            </h3>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-gold-200 mb-1">Ceremony Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sacred Muhurtham"
                  value={eventForm.name}
                  onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2.5 text-stone-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gold-200 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-gold-200 mb-1">Start Time</label>
                  <input
                    type="text"
                    placeholder="10:30 AM"
                    value={eventForm.startTime}
                    onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-gold-200 mb-1">End Time</label>
                  <input
                    type="text"
                    placeholder="01:30 PM"
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gold-200 mb-1">Dress Code / Attire</label>
                <input
                  type="text"
                  placeholder="e.g. Traditional Silk Sarees & Dhotis"
                  value={eventForm.dressCode}
                  onChange={(e) => setEventForm({ ...eventForm, dressCode: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-stone-100"
                />
              </div>

              {/* Venue & Google Maps Preview */}
              <div className="p-4 rounded-xl bg-maroon-950/60 border border-gold-500/30 space-y-3">
                <span className="font-serif text-xs uppercase text-gold-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Venue & Google Maps Navigation
                </span>
                <div>
                  <label className="block text-stone-300 mb-1">Venue Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sri Sai Convention Hall"
                    value={eventForm.venueName}
                    onChange={(e) => setEventForm({ ...eventForm, venueName: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Venue Address</label>
                  <input
                    type="text"
                    placeholder="e.g. Solapur Road, Vijayapura, Karnataka"
                    value={eventForm.venueAddress}
                    onChange={(e) => setEventForm({ ...eventForm, venueAddress: e.target.value })}
                    className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-stone-100"
                  />
                </div>

                {(eventForm.venueName || eventForm.venueAddress) && (
                  <p className="text-[11px] text-green-400 font-sans">
                    ✓ Google Maps link: {generateGoogleMapsUrl(eventForm.venueName, eventForm.venueAddress)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gold-200 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-2 text-stone-100 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gold-500/20">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-5 py-2 rounded-full border border-stone-600 text-stone-300 text-xs font-serif uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider shadow-gold-glow"
                >
                  Save Ceremony
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Share Modal */}
      <WhatsAppShareModal
        wedding={wedding}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
};
