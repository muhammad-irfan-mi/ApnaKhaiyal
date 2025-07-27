import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  X, ChevronLeft, ChevronRight, Video, Home, ShoppingBag
} from 'lucide-react';

const PhaseModal = ({ isOpen, onClose, phase }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  if (!phase) return null;

  const nextImage = () => {
    if (phase.images.length === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % phase.images.length);
  };

  const prevImage = () => {
    if (phase.images.length === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + phase.images.length) % phase.images.length);
  };

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-[99]"
    >
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl">
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
              >
                <X size={20} />
              </button>
            </div>

            <div className="h-72 md:h-96 bg-gray-200 relative">
              {showVideo && phase.video ? (
                <div className="w-full h-full flex items-center justify-center">
                  <video src={phase.video} controls className="max-h-full max-w-full" />
                </div>
              ) : (
                phase.images.length > 0 ? (
                  <img
                    src={phase.images[currentImageIndex]?.path || ''}
                    alt={phase.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No images available
                  </div>
                )
              )}

              {!showVideo && phase.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              {phase.video && (
                <div className="absolute bottom-4 left-4">
                  <button
                    onClick={toggleVideo}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${showVideo ? 'bg-blue-800 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
                      }`}
                  >
                    <Video size={16} />
                    <span>{showVideo ? 'Show Images' : 'Watch Video'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            <Dialog.Title className="text-2xl font-bold text-blue-900 mb-4">
              {phase.name}
            </Dialog.Title>

            <div className="flex gap-4">
              <div className="bg-blue-50 px-4 py-3 rounded-lg flex items-center gap-2">
                <Home className="text-blue-800" size={20} />
                <div>
                  <div className="text-xs text-blue-700 mb-1">Plots</div>
                  <div className="font-semibold text-blue-900">
                    {Array.isArray(phase.plots)
                      ? phase.plots.reduce((sum, p) => sum + (p.quantity || 0), 0)
                      : 0}
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 px-4 py-3 rounded-lg flex items-center gap-2">
                <ShoppingBag className="text-amber-800" size={20} />
                <div>
                  <div className="text-xs text-amber-700 mb-1">Shops</div>
                  <div className="font-semibold text-amber-900">
                    {Array.isArray(phase.shops)
                      ? phase.shops.reduce((sum, p) => sum + (p.quantity || 0), 0)
                      : 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PhaseModal;
