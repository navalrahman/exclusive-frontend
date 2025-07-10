// // import jwt_decode from 'jwt-decode';
// import { jwtDecode } from 'jwt-decode';

// export const isTokenValid = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return false;

//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000; // in seconds

//     return decoded.exp > currentTime;
//   } catch (error) {
//     console.error("Invalid token:", error.message);
//     return false;
//   }
// };


// src/hooks/useAutoLogout.js
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = (timeoutMinutes = 1) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // start initial timer

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);
};

export default useAutoLogout;
