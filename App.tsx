
import React, { useState } from 'react';
import LockScreen from './components/apps/LockScreen';
import Desktop from './components/apps/Desktop';
import { User } from './types';
import { DEFAULT_USER } from './constants';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setLoggedInUser(user);
    setIsLocked(false);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setIsLocked(true);
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      {isLocked ? (
        <LockScreen onLogin={() => handleLogin(DEFAULT_USER)} currentUser={DEFAULT_USER} />
      ) : (
        <Desktop loggedInUser={loggedInUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
