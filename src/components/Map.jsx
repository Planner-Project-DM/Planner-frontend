import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect} from "react";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import CircularProgress from '@mui/material/CircularProgress';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

function FlyToCity({hotels}) {
    const map = useMap();

    useEffect(() => {
        if (hotels.length > 0) {
            map.flyTo(
                [hotels[0].location.latitude, hotels[0].location.longitude],
                13
            );
        }
    }, [hotels]);

    return null;
}
function FlyToHotel({selectedHotel}){
    const map = useMap();
    useEffect(() => {
        if (selectedHotel) {
            map.flyTo([selectedHotel.location.latitude , selectedHotel.location.longitude], 15)
        }
    }, [selectedHotel]);

    return null;
}

export default function Map({hotels, loading, setSelectedHotel, selectedHotel}) {
    if (loading) return <CircularProgress/>
    const startLocation = selectedHotel
        ? [selectedHotel.location.latitude, selectedHotel.location.longitude]
        : [50.0638, 19.9451];
    return (
        <main className={"bg-bg-main w-full h-full"}>
            <div className={"w-full h-full p-5 rounded-2xl"}>
                <MapContainer
                    center={startLocation}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{width: '100%', height: '100%', borderRadius: '15px', zIndex: '0'}}
                >
                    <FlyToCity hotels={hotels}/>
                    <FlyToHotel selectedHotel={selectedHotel} />
                    <TileLayer
                        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {hotels.map((hotel) => (
                        <Marker
                            key={hotel.id}
                            position={[hotel.location.latitude, hotel.location.longitude]}
                            eventHandlers = {{
                                click: ()=> setSelectedHotel(hotel),
                            }}
                        >
                            <Popup className={"bg-bg-input"}>
                                <div>
                                    <p className="font-bold text-xl">{hotel.name || "Brak informacji"}</p>
                                    <p style={{minHeight: '30px', padding: '5px'}}
                                       className={"bg-text-secondary text-white border border-border-col rounded "}>
                                        <p>Strona: {hotel.website ? <a href={hotel.website} target={"_blank"}  style={{color: 'white'}}>{hotel.website}</a> : "Brak informacji"}</p>
                                    </p>
                                    <p style={{minHeight: '30px', padding: '5px'}}
                                       className={"bg-text-secondary text-white border border-border-col rounded "}>
                                        {`Numer: ${hotel.phoneNumber || "Brak informacji"}`}
                                    </p>
                                    <p style={{minHeight: '30px', padding: '5px'}}
                                       className={"bg-text-secondary text-white border border-border-col rounded "}>
                                        {`Gwiazdki: ${hotel.stars || "Brak informacji"}`}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </main>
    )
}