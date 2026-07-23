import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

export default function Map ({activeMark}){
    const position = [50.0638, 19.9451];
    const position2 = [50.0662, 19.9433];
    return(
        <main className={"bg-bg-main w-full h-full"}>
            <div className={"w-full h-full p-5 rounded-2xl"}>
                <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ width: '100%', height: '100%', borderRadius:'15px', zIndex:'0'}}
                >
                    <TileLayer
                        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={position}>
                        <Popup>
                            Siemanko! To jest darmowa mapa bez podpinania karty.
                        </Popup>
                    </Marker>
                    <Marker position={position2}>
                        <Popup>
                            Siemanko! To jest darmowa mapa bez podpinania karty.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </main>
    )
}