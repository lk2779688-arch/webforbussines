import { MapPin, IndianRupee, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequirementCard = ({ req }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full uppercase tracking-wider">
            {req.category}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
            <Clock size={14} /> {new Date(req.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{req.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">{req.description}</p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
            <IndianRupee size={16} className="text-green-500" />
            {req.budget}
          </div>
          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
            <MapPin size={16} className="text-red-500" />
            {req.location}
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-700 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={req.user.profilePicture} alt="" className="w-8 h-8 rounded-full" />
            <div className="text-xs">
              <p className="font-semibold">{req.user.businessName || req.user.fullName}</p>
              <p className="text-slate-500">{req.user.city}</p>
            </div>
          </div>
          <Link to={`/requirement/${req._id}`} className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1">
            Details <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequirementCard;