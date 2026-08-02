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
const categoryIcons = {
    HOTEL: L.divIcon({
        className: '',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
            <path fill="#378ADD" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle fill="white" cx="12" cy="9" r="2.5"/>
        </svg>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    }),
    ATTRACTION: L.divIcon({
        className: '',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
            <path fill="#639922" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle fill="white" cx="12" cy="9" r="2.5"/>
        </svg>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    }),
    OTHER: L.divIcon({
        className: '',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
            <path fill="#888887" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle fill="white" cx="12" cy="9" r="2.5"/>
        </svg>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    }),
};
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

function FlyToCity({tripItems}) {
    const map = useMap();

    useEffect(() => {
        if (tripItems.length > 0) {
            map.flyTo(
                [tripItems[0].location.latitude, tripItems[0].location.longitude],
                13
            );
        }
    }, [tripItems]);

    return null;
}

function FlyToHotel({selectedTripItem}) {
    const map = useMap();
    useEffect(() => {
        if (selectedTripItem) {
            map.flyTo([selectedTripItem.location.latitude, selectedTripItem.location.longitude], 15)
        }
    }, [selectedTripItem]);

    return null;
}

export default function Map({tripItems, setSelectedTripItem, selectedTripItem}) {
    const startLocation = selectedTripItem
        ? [selectedTripItem.location.latitude, selectedTripItem.location.longitude]
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
                    <FlyToCity tripItems={tripItems}/>
                    <FlyToHotel selectedTripItem={selectedTripItem}/>
                    <TileLayer
                        attribution='<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {tripItems.map((item) => (
                        <Marker
                            icon={selectedTripItem?.id === item.id ? selectedIcon : categoryIcons[item.category]}
                            key={item.id}
                            position={[item.location.latitude, item.location.longitude]}
                            eventHandlers={{
                                click: () => setSelectedTripItem(item),
                            }}
                            options={{popupAnchor: [0, -40]}}
                        >

                            <Popup className={"bg-bg-input rounded-2xl"}
                                   offset={[5, 0]}>
                                <div>
                                    <p className="font-bold text-xl">{item.name || "Brak informacji"}</p>
                                    <p style={{minHeight: '30px', padding: '5px'}}
                                       className={"bg-text-secondary text-white border border-border-col rounded "}>
                                        <p>Strona: {item.website ? <a href={item.website} target={"_blank"}
                                                                      style={{color: 'white'}}>{item.website}</a> : "Brak informacji"}</p>
                                    </p>
                                    <p style={{minHeight: '30px', padding: '5px'}}
                                       className={"bg-text-secondary text-white border border-border-col rounded "}>
                                        {`Numer: ${item.phoneNumber || "Brak informacji"}`}
                                    </p>
                                    {item.category === "HOTEL" ?
                                        <p style={{minHeight: '30px', padding: '5px'}}
                                           className={"bg-text-secondary text-white border border-border-col rounded "}>
                                            {`Gwiazdki: ${item.stars || "Brak informacji"}`}
                                        </p>
                                        :
                                        <p style={{minHeight: '30px', padding: '5px'}}
                                           className={"bg-text-secondary text-white border border-border-col rounded "}>
                                            {`E-mail: ${item.email || "Brak informacji"}`}
                                        </p>
                                    }
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </main>
    )
}