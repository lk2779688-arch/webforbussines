import { useState, useEffect } from 'react';
import api from '../services/api';
import RequirementCard from '../components/requirements/RequirementCard';
import { Search, Filter, MapPin } from 'lucide-react';

const Marketplace = () => {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/requirements?search=${search}&category=${category}`);
      setRequirements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, [category]);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-600 to-indigo-700 p-8 rounded-3xl text-white">
        <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
        <p className="text-primary-100 mb-8">Discover business requirements from all over the world.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" />
            <input 
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-slate-900 outline-none" 
              placeholder="Search requirements (e.g. Website development)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchRequirements()}
            />
          </div>
          <select 
            className="bg-white text-slate-900 px-6 py-3 rounded-xl outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="IT Services">IT Services</option>
            <option value="Marketing">Marketing</option>
            <option value="Construction">Construction</option>
            <option value="Design">Design</option>
          </select>
          <button onClick={fetchRequirements} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition">
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl"></div>)}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {requirements.map(req => (
            <RequirementCard key={req._id} req={req} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;