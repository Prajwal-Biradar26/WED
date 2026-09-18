import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DiyaOrnament, MandalaOrnament } from '../components/common/TraditionalOrnaments';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await register(formData);
      if (res.success) {
        navigate('/create');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D060E] via-[#3B0811] to-[#1A0307] text-stone-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <MandalaOrnament size={650} className="w-[650px] h-[650px] text-gold-400 animate-spin-slow" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#4A0A17] to-[#2B050E] p-8 sm:p-10 rounded-3xl border-2 border-gold-500/50 shadow-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <DiyaOrnament className="w-12 h-12 text-gold-400 mx-auto mb-2" />
          </Link>
          <h1 className="font-serif text-3xl font-bold text-gold-gradient">
            Create Your Account
          </h1>
          <p className="text-stone-300 font-sans text-xs sm:text-sm mt-1">
            Begin crafting your royal Indian wedding invitation
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-6 rounded-xl bg-red-900/60 border border-red-500/50 text-red-200 text-xs font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Prajwal Patil"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. prajwal@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 text-maroon-950 font-serif font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:brightness-110 transition-all mt-4"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-stone-400 text-xs font-sans mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-400 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
