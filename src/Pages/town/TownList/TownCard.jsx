import React, { useContext, useState } from 'react';
import { MapPin, Home, ShoppingBag, ChevronRight } from 'lucide-react';
import PhaseModal from './PhaseModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../Context/ContextProvider';

const TownCard = ({ town }) => {
  const { theme } = useContext(Context);
  const [selectedImage, setSelectedImage] = useState(
    town.mainImage || town.phases[0]?.images[0]?.path || town.location
  );
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  const allImages = town.phases.flatMap(phase =>
    phase.images.map(img => img.path)
  );

  const openPhaseModal = (phase) => {
    setSelectedPhase(phase);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigateTownDetail = (id) => {
    navigate('/profile/town/detail', { state: { townId: id } });
  };

  console.log('object town', town)
  const totalPlots = town.phases.reduce((sum, phase) => {
    const phaseTotal = Array.isArray(phase.plots)
      ? phase.plots.reduce((acc, plot) => acc + (plot.quantity || 0), 0)
      : 0;
    return sum + phaseTotal;
  }, 0);

  const totalShops = town.phases.reduce((sum, phase) => {
    const phaseTotal = Array.isArray(phase.shops)
      ? phase.shops.reduce((acc, shops) => acc + (shops.quantity || 0), 0)
      : 0;
    return sum + phaseTotal;
  }, 0);


  return (
    <div className={`rounded-xl ${theme.boxbg} overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}>
      {/* Main Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden shadow-lg">
        <img
          src={selectedImage}
          alt={town.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      <div className="p-2 mt-3 bg-gray-50 flex overflow-x-auto gap-2 scrollbar-thin">
        {allImages.slice(0, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${selectedImage === image ? 'border-[#FDBE49] scale-110' : 'border-transparent hover:border-blue-300'
              }`}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
        {allImages.length > 5 && (
          <div className="min-w-16 h-16 flex items-center justify-center bg-blue-50 rounded-md text-blue-800">
            +{allImages.length - 5}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className='flex justify-between'>
          <h2 className={`text-xl font-bold  mb-2 ${theme.primaryColor2}`}>{town.name}</h2>
          <span onClick={() => handleNavigateTownDetail(town._id)} className={`${theme.primaryColor2}`}>
            <VisibilityIcon />
          </span>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{town.address}, {town.city}</span>
        </div>

        {/* <div className="flex gap-4 mb-6">
          <div className="bg-blue-50 px-3 py-2 rounded-lg">
            <div className="text-xs text-blue-700 mb-1">Total Plots</div>
            <div className="font-semibold text-blue-900">{totalPlots}</div>
          </div>
          <div className="bg-amber-50 px-3 py-2 rounded-lg">
            <div className="text-xs text-amber-700 mb-1">Total Shops</div>
            <div className="font-semibold text-amber-900">{totalShops}</div>
          </div>
        </div> */}

        <div className="mb-4">
          {/* <h3 className="text-md font-semibold text-gray-800 mb-3">Phases</h3> */}
          <div className="space-y-3">
            {town.phases.map((phase) => {
              const plotCount = Array.isArray(phase.plots)
                ? phase.plots.reduce((sum, plot) => sum + (plot.quantity || 0), 0)
                : 0;
              const shopCount = Array.isArray(phase.shops)
                ? phase.shops.reduce((sum, shop) => sum + (shop.quantity || 0), 0)
                : 0;

              return (
                <div
                  key={phase._id}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{phase.name}</h4>
                    <button
                      onClick={() => openPhaseModal(phase)}
                      className={`text-xs ${theme.primaryColor2} hover:text-blue-600 flex items-center`}
                    >
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <div className="flex items-center text-gray-700 text-sm">
                        <Home size={14} className="mr-1" />
                        <span>{plotCount} Plots</span>
                      </div>
                      <div className="flex items-center text-gray-700 text-sm">
                        <ShoppingBag size={14} className="mr-1" />
                        <span>{shopCount || 0} Shops</span>
                      </div>
                    </div>

                    <div className="flex -space-x-2">
                      {phase.images.slice(0, 3).map((image, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                        >
                          <img src={image.path} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {phase.images.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                          +{phase.images.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">Area: {town.area}</div>
            <button
              onClick={() => window.open(town.location, '_blank')}
              className={`"text-sm ${theme.primaryColor2} hover:text-blue-700"`}
            >
              View Map
            </button>
          </div>
        </div>
      </div>

      <PhaseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        phase={selectedPhase}
      />
    </div>
  );
};

export default TownCard;
