import Navbar from "../components/Navbar.jsx";
import TripNavbar from "../components/TripNavbar.jsx";
import MainBar from "../components/MainBar.jsx";
import SocialBar from "../components/SocialBar.jsx"
import NewTripForm from "../components/NewTripForm.jsx";
import UserTripsWindow from "../components/UserTripsWindow.jsx";
import UserNotifications from "../components/UserNotifications.jsx";
import UserSettings from "../components/UserSettings.jsx"
import api from "../api/axios.js";
import {useEffect, useState} from "react";
import CreateFriendship from "../components/CreateFriendship.jsx";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Dashboard({darkMode, isDark}){
    // Dropdown states
    const [myTrips, setMyTrips] = useState(false);
    const [myNotif, setMyNotif] = useState(false);
    const [mySettings, setMySettings] = useState(false);
    // Modal trip state
    const [newTrip, setNewTrip] = useState(false);
    // Spinner map state
    const [loading, setLoading] = useState(false);
    // Actual selected hotel state
    const [selectedHotel, setSelectedHotel] = useState(null);
    // Hotel's list state
    const [hotels, setHotels] = useState([]);
    // Users dropdown trips list state
    const [userTrips, setUserTrips] = useState([]);
    // Marks state
    const [activeMark, setActiveMark] = useState("map");
    // Actual trip state
    const [activeTrip, setActiveTrip] = useState(null);
    // Friendships states
    const [pendingFriends, setPendingFriends] = useState(null);
    const [newFriend, setNewFriend] = useState(false);
    const [friends, setFriends] = useState(null);
    const [friendToDelete, setFriendToDelete] = useState(null);
    // Modal delete user
    const [alertDelete, setAlertDelete] = useState(false);
    const alertOpen = () => setAlertDelete(true);
    const alertClose = () => setAlertDelete(false);
    // Snackbar state
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Friendships functions
    async function friendNotification (){

        try {

            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            const res = await api.get('/api/friendships?status=PENDING', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPendingFriends(res.data.data);
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
        }
    }
    async function acceptFriend(id){
        try{
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            await api.patch(`/api/friendships/${id}/accept`,{}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            friendNotification();
            setSnackbar({ open: true, message: 'Dodano znajomego!', severity: 'success' });
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
        }
    }
    async function rejectFriend(id){
        try{
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            await api.patch(`/api/friendships/${id}/reject`,{}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            friendNotification();
            setSnackbar({ open: true, message: 'Odrzucono zaproszenie.', severity: 'info' });
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
        }
    }
    async function blockFriend(id){
        try{
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            await api.patch(`/api/friendships/${id}/block`,{}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            friendNotification();
            setSnackbar({ open: true, message: 'Zablokowano użytkownika', severity: 'info' });
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
        }
    }
    async function getFriendsList(){
        try{
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            const res = await api.get(`/api/friendships`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFriends(res.data.data);
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
        }
    }
    async function deleteFriend () {
        try{
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
                console.log(friendToDelete)
            await api.delete(`/api/friendships`,  {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    email: friendToDelete
                }
            });

            alertClose()
            getFriendsList();
            setSnackbar({ open: true, message: 'Usunięto znajomego!', severity: 'info' });
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
        }
    }

    // Trips get from backend function
    async function getTrips(){
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            const resp = await api.get('/api/trips', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserTrips(resp.data.data);
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
        }
    }
    // Getting hotels list by city function
    async function getCityMap (city){
        setLoading(true);
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            const resp = await api.get(`/api/hotels/city/${city}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const sorted = resp.data.data.sort((a,b) => b.stars - a.stars)
            setHotels(sorted);
            if (sorted.length === 0) {
                setSnackbar({ open: true, message: 'Nie znaleziono hoteli w tej lokalizacji', severity: 'info' });
            }
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
        }
        finally {
            {
                setLoading(false)
            }
        }
    }
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
        getTrips();
        friendNotification()
    }, [])

    // Closing / opening (popups, dropdowns, modals) functions
    function showTrips (){
        setMyTrips(!myTrips);
        setMyNotif(false);
        setMySettings(false);
        setNewTrip(false);
    }
    function showNotif (){
        setMyNotif(!myNotif);
        setMyTrips(false);
        setMySettings(false);
        setNewTrip(false);
    }
    function showSettings (){
        setMySettings(!mySettings);
        setMyTrips(false);
        setMyNotif(false)
        setNewTrip(false);
    }
    function addNewTrip (){
        setNewTrip(true);
        setMySettings(false);
        setMyTrips(false);
        setMyNotif(false)
    }
    function closeTripForm (){
        setNewTrip(!newTrip);
    }
    function closeFriendForm (){
        setNewFriend(false);
    }
    useEffect(() => {
        function handleClick() {
            setMyTrips(false);
            setMyNotif(false);
            setMySettings(false);
        }
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick)
    }, []);

    return (
        <div className={"h-screen flex flex-col bg-bg-main font-playpen relative"}>

            <header className={"h-24 max-h-28 border-b-2 border-border-col"}>
                <Navbar showTrips={showTrips} showNotif={showNotif} showSettings={showSettings}
                        addNewTrip={addNewTrip} getCityMap={getCityMap}
                        pendingFriends={pendingFriends} getFriendsList={getFriendsList} />
            </header>
            <main className={"flex-1 flex flex-row relative"}>
                <aside className={"w-5/12 border-r-2 border-border-col"}>
                    <TripNavbar activeMark={activeMark} setActiveMark={setActiveMark} activeTrip={activeTrip}/>
                </aside >
                <div id="mainWindow" className={"w-full"} >
                    <MainBar activeMark={activeMark} hotels={hotels} loading={loading}
                             setSelectedHotel={setSelectedHotel} selectedHotel={selectedHotel} />
                </div>
                {myTrips && (
                    <UserTripsWindow userTrips={userTrips} setActiveTrip={setActiveTrip} activeTrip={activeTrip}/>
                )}
                {myNotif && (
                    <UserNotifications pendingFriends={pendingFriends} acceptFriend={acceptFriend}
                                       rejectFriend={rejectFriend} blockFriend={blockFriend}/>
                )}
                {mySettings && (
                    <UserSettings setNewFriend={setNewFriend} friends={friends} alertOpen={alertOpen}
                                  setFriendToDelete={setFriendToDelete} darkMode={darkMode} isDark={isDark}/>
                )}
                <aside className={"w-5/12 border-l-2 border-border-col"}>
                    <SocialBar activeMark={activeMark} hotels={hotels} selectedHotel={selectedHotel}
                               setSelectedHotel={setSelectedHotel} activeTrip={activeTrip} loading={loading}/>
                </aside>
            </main>
            {newTrip &&(
                <NewTripForm closeTripForm={closeTripForm} getTrips={getTrips} setActiveTrip={setActiveTrip} setSnackbar={setSnackbar}/>
            )}
            {newFriend && (
                <CreateFriendship closeFriendForm={closeFriendForm} setSnackbar={setSnackbar} />
            )}
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({...snackbar, open: false})}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
            <Modal
                open={alertDelete}
                onClose={alertClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    width: 400
                }}>
                    <div className={"flex justify-between p-2 flex-col gap-5"}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight: 'bold',}}>
                            Czy chcesz usunąć znajomego?
                        </Typography>
                    <div className={"flex justify-between"}>
                        <button onClick={alertClose} className={"bg-gray-400 border border-border-col w-24 h-10 rounded-xl " +
                            "hover:bg-gray-600 hover:text-white transition duration-150 ease-out hover:ease-in"}>Anuluj</button>
                        <button className={"bg-red-700 text-white rounded-2xl h-10 w-24 " +
                            "hover:bg-red-900 transition duration-150 ease-out hover:ease-in "} onClick={deleteFriend}>Usuń</button>
                    </div>
                    </div>
                </Box>
            </Modal>

        </div>
    )
}