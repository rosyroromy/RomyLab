import { motion } from 'motion/react';
import { Image } from '@phosphor-icons/react';

export default function PermissionModal({ onAllow, onDeny }: { onAllow: () => void, onDeny: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1A1A1A] w-full max-w-sm rounded-2xl p-6 border border-white/10 shadow-2xl text-center"
      >
        <div className="w-16 h-16 bg-[#FFB800]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-[#FFB800]" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Access Your Photos</h3>
        <p className="text-white/60 text-sm mb-6">
          MovieEcho needs access to your photo album to import movie screenshots and subtitles.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={onAllow}
            className="w-full py-3 bg-[#FFB800] text-black rounded-xl font-semibold"
          >
            Allow Access
          </button>
          <button 
            onClick={onDeny}
            className="w-full py-3 bg-white/5 text-white/60 rounded-xl font-medium hover:bg-white/10"
          >
            Not Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
