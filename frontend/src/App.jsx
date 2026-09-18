import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PublicInvitationPage } from './pages/PublicInvitationPage';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Root route is the Pure Traditional Indian Digital Wedding Invitation */}
          <Route path="/" element={<PublicInvitationPage />} />

          {/* Dynamic Slug route also renders the invitation */}
          <Route path="/w/:slug" element={<PublicInvitationPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
