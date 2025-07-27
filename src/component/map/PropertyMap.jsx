import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultPosition = [29.5334, 71.6336]; // Lodhran fallback

const DraggableMarker = ({ lat, lng, onChange }) => {
    useMapEvents({
        click(e) {
            onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
        }
    });

    const markerIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <Marker position={[lat, lng]} icon={markerIcon}>
            <Popup>
                You selected this location
                <br />
                Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
            </Popup>
        </Marker>
    );
};

const PropertyMap = ({ lat, lng, onChange }) => {
    useEffect(() => {
        if (!lat || !lng) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    onChange({ lat: latitude, lng: longitude });
                },
                () => {
                    onChange({ lat: defaultPosition[0], lng: defaultPosition[1] });
                }
            );
        }
    }, []);

    if (!lat || !lng) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500 border rounded">
                Loading map...
            </div>
        );
    }

    return (
        <div className="h-64 rounded overflow-hidden relative">
            <MapContainer
                center={[lat, lng]}
                zoom={13}
                scrollWheelZoom
                className="h-full w-full z-10"
                key={`${lat},${lng}`}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                <DraggableMarker lat={lat} lng={lng} onChange={onChange} />
            </MapContainer>
        </div>
    );
};

export default PropertyMap;
