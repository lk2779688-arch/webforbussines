import { useState } from 'react';
import { auth, googleProvider, setupRecaptcha } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [method, setMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Login Successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSendOtp = async () => {
    try {
      const verifier = setupRecaptcha('recaptcha-container');
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      setConfirmationResult(confirmation);
      toast.success('OTP Sent!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      toast.success('Phone Verified!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
      <h2 className="text-3xl font-bold mb-6 text-center">Login to NeedHub</h2>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setMethod('email')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${method === 'email' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}
        > Email </button>
        <button 
          onClick={() => setMethod('phone')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${method === 'phone' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}
        > Phone </button>
      </div>

      {method === 'email' ? (
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="email" 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="password" 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition flex items-center justify-center gap-2">
            Login <ArrowRight size={18} />
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div id="recaptcha-container"></div>
          {!confirmationResult ? (
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="+91 00000 00000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button onClick={handleSendOtp} className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-bold">Send OTP</button>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Enter OTP</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 outline-none"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={handleVerifyOtp} className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-bold">Verify OTP</button>
            </div>
          )}
        </div>
      )}

      <div className="relative my-8 text-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700"></div></div>
        <span className="relative px-4 bg-white dark:bg-slate-800 text-slate-400 text-sm">OR</span>
      </div>

      <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
        Don't have an account? <Link to="/register" className="text-primary-600 font-bold">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;