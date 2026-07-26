import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect} from "react";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import CircularProgress from '@mui/material/CircularProgress';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});
const selectedIcon = L.divIcon({
    className: '',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44">
        <path fill="red" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle fill="white" cx="12" cy="9" r="2.5"/>
    </svg>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
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

export default function Map({hotels, setSelectedHotel, selectedHotel}) {
    const startLocation = selectedHotel
        ? [selectedHotel.location.latitude, selectedHotel.location.longitude]
        : [50.0638, 19.9451];

    return (
        <main className={"bg-bg-main w-full h-full relative"}>
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
                            icon={selectedHotel?.id === hotel.id ? selectedIcon : new L.Icon.Default()}
                            key={hotel.id}
                            position={[hotel.location.latitude, hotel.location.longitude]}
                            eventHandlers = {{
                                click: ()=> setSelectedHotel(hotel),
                            }}
                            options={{ popupAnchor: [0, -40] }}
                        >
                            <Popup className={"bg-bg-input"}
                                   offset={[5, 0]}>
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