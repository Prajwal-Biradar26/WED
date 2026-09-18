import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DiyaOrnament, MandalaOrnament } from '../components/common/TraditionalOrnaments';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please enter your email address to reset password');
      return;
    }
    setForgotSent(true);
    setError('');
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
            Welcome to Vangmaya
          </h1>
          <p className="text-stone-300 font-sans text-xs sm:text-sm mt-1">
            Sign in to manage your wedding invitation & RSVPs
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-6 rounded-xl bg-red-900/60 border border-red-500/50 text-red-200 text-xs font-sans">
            {error}
          </div>
        )}

        {forgotSent && (
          <div className="p-3.5 mb-6 rounded-xl bg-green-900/60 border border-green-500/50 text-green-200 text-xs font-sans">
            Password reset link sent to {email}.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-gold-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. prajwal@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-serif uppercase tracking-widest text-gold-300">
                Password *
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] text-gold-400 hover:underline font-sans"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-gold-500/40 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 text-maroon-950 font-serif font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:brightness-110 transition-all mt-4"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-6 p-3 rounded-xl bg-black/40 border border-gold-500/20 text-center text-xs text-gold-300/90 font-sans">
          <span>Quick Demo Login: </span>
          <strong className="text-gold-200">demo@wedding.com</strong> / <strong className="text-gold-200">Password123!</strong>
        </div>

        <p className="text-center text-stone-400 text-xs font-sans mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-gold-400 hover:underline font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};
