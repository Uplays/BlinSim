
import React, { useState, useEffect } from 'react';
import GlassmorphicCard from '../GlassmorphicCard';
import Input from '../Input';
import Button from '../Button';
import { User } from '../../types';

interface LockScreenProps {
  onLogin: () => void;
  currentUser: User;
}

const LockScreen: React.FC<LockScreenProps> = ({ onLogin, currentUser }) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [error, setError] = useState<string>(''); // No longer needed for fake login

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePasswordLogin = () => {
    // setError(''); // No longer needed for fake login
    // Modified for fake login: any password input will succeed
    onLogin();
  };

  const handleFingerprintLogin = () => {
    // setError(''); // No longer needed for fake login
    alert('Fingerprint scan simulated. Access Granted!');
    onLogin();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://picsum.photos/1920/1080?blur=5)` }}
      ></div>
      <div className="absolute inset-0 backdrop-filter backdrop-blur-lg bg-black/30"></div>

      <GlassmorphicCard className="z-10 text-white p-8 md:p-12 text-center max-w-lg w-full">
        <div className="mb-8">
          <p className="text-6xl md:text-8xl font-light mb-2">{time}</p>
          <p className="text-xl md:text-2xl opacity-80 capitalize">{date}</p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 rounded-full mb-3 border-2 border-white/50"
          />
          <p className="text-xl font-semibold">{currentUser.name}</p>
        </div>

        <div className="space-y-4 mb-6">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handlePasswordLogin();
            }}
          />
          {/* {error && <p className="text-red-300 text-sm">{error}</p>} */}
          <Button variant="glass" onClick={handlePasswordLogin} className="w-full">
            Unlock
          </Button>
          <Button variant="glass" onClick={handleFingerprintLogin} className="w-full flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v2.586a1 1 0 00.293.707l.707.707A1 1 0 0110 7.586V8a1 1 0 102 0v-.414a1 1 0 01.293-.707l.707-.707A1 1 0 0014 5.586V3a1 1 0 10-2 0v.414a1 1 0 01-.293.707l-.707.707A1 1 0 0010 6.414V7a1 1 0 10-2 0v-.414a1 1 0 01-.293-.707l-.707-.707A1 1 0 006 5.586V3a1 1 0 00-1-1zm3 10a1 1 0 00-1 1v4a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              <path d="M10 18a.75.75 0 00.75-.75V15a.75.75 0 00-1.5 0v2.25c0 .414.336.75.75.75zM10 2a1 1 0 00-1 1v2.586a1 1 0 00.293.707l.707.707A1 1 0 0110 7.586V8a1 1 0 102 0v-.414a1 1 0 01.293-.707l.707-.707A1 1 0 0014 5.586V3a1 1 0 10-2 0v.414a1 1 0 01-.293.707l-.707.707A1 1 0 0010 6.414V7a1 1 0 10-2 0v-.414a1 1 0 01-.293-.707l-.707-.707A1 1 0 006 5.586V3a1 1 0 00-1-1zm3 10a1 1 0 00-1 1v4a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 00-1-1h-2z" />
            </svg>
            <span>Use Fingerprint</span>
          </Button>
        </div>
        <div className="flex justify-between items-center text-sm opacity-70">
          <span>Wi-Fi Connected</span>
          <Button variant="glass" className="text-xs px-2 py-1">
            Switch User
          </Button>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default LockScreen;
