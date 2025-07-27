import React, { useState } from 'react';

const getStatusColor = (status) => {
  return status === 'pending' ? 'bg-red-500' : 'bg-green-500';
};

const TownPlot = () => {
  const [plots, setPlots] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      area: Math.floor(Math.random() * 500) + 100,
      status: Math.random() > 0.5 ? 'sold' : 'pending',
    }))
  );

  const [selectedPlot, setSelectedPlot] = useState(null);

  const handleStatusChange = (e) => {
    const updatedPlots = plots.map((plot) =>
      plot.id === selectedPlot.id ? { ...plot, status: e.target.value } : plot
    );
    setPlots(updatedPlots);
    setSelectedPlot(null); // close modal
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Plot Overview</h2>

      <div className="flex flex-wrap gap-2">
        {plots.map((plot) => (
          <div
            key={plot.id}
            onClick={() => setSelectedPlot(plot)}
            className={`cursor-pointer border rounded-xl shadow-md p-4 w-[140px] ${getStatusColor(
              plot.status
            )} text-white hover:scale-105 transition-transform duration-200`}
          >
            <div className="text-lg font-semibold">Plot #{plot.id}</div>
            <div className="text-sm">Area: {plot.area} sqft</div>
            <div className="mt-2 text-center px-2 py-1 rounded">
              {plot.status.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPlot && (
        <div className="fixed inset-0 bg-gray bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-center">
              Update Plot #{selectedPlot.id}
            </h3>
            <p className="mb-2">Area: {selectedPlot.area} sqft</p>
            <label className="block mb-2 font-medium">Change Status:</label>
            <select
              value={selectedPlot.status}
              onChange={handleStatusChange}
              className="w-full p-2 border rounded"
            >
              <option value="sold">Sold</option>
              <option value="pending">Pending</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedPlot(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TownPlot;
