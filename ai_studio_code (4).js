import { create } from 'zustand';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  
  checkAuth: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const res = await axios.get(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          set({ user: { ...res.data, token }, loading: false });
        } catch (error) {
          set({ user: null, loading: false });
        }
      } else {
        set({ user: null, loading: false });
      }
    });
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  }
}));