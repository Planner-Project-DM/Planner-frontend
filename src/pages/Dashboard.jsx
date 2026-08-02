import Navbar from "../components/Navbar.jsx";
import TripNavbar from "../components/TripNavbar.jsx";
import MainBar from "../components/MainBar.jsx";
import SocialBar from "../components/SocialBar.jsx"
import NewTripForm from "../components/NewTripForm.jsx";
import UserTripsWindow from "../components/UserTripsWindow.jsx";
import UserNotifications from "../components/UserNotifications.jsx";
import UserSettings from "../components/UserSettings.jsx"
import GroupAdd from "../components/GroupAdd.jsx"
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
    const [selectedTripItem, setSelectedTripItem] = useState(null);
    // triplist state
    const [tripItems, setTripItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const sortedItems = selectedCategory === 'ALL' ? tripItems : tripItems.filter((item) => item.category === selectedCategory);
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
    // Group states
    const [groupMembers, setGroupMembers] = useState(null);
    const [addGroup, setNewGroup] = useState(false);
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

            const res = await api.get('/api/friendships/my-requests', {
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

            const res = await api.get(`/api/friendships?status=ACCEPTED`, {
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

    // Trips get from backend function mapped in UserTripsWindow
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
    async function getTripGroupMem(){
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
                if(activeTrip === null) {
                    return;
                } else {
                    const resp = await api.get(`/api/trips/${activeTrip.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (resp.data.data.tripGroup === null) {
                        setGroupMembers([])
                        return;
                    } else {
                        setGroupMembers(resp.data.data.tripGroup.groupUsers);
                    }
                }
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
            console.log(error)
        }
    }
    // Getting tripItems list by city function
    async function getCityMap (city){
        setLoading(true);
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            const resp = await api.get(`/api/trip-items/city/${city}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const items = resp.data.data;
            setTripItems(items);

            if (items.length === 0) {
                setSnackbar({ open: true, message: 'Brak wyników dla tej lokalizacji.', severity: 'info' });
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
    // Function adding item to bookmark "Przewodnik"
    async function addItemToTrip(item) {
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
            await api.post(`/api/trips/${activeTrip.id}/add-item`,{name: item.name},  {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setSnackbar({ open: true, message: 'Dodano do zakładki.', severity: 'success' });
        }
        catch(error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Musisz wybrać podróż!', severity: 'error' });
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
    function closeGroupForm (){
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
                    <MainBar activeMark={activeMark} tripItems={sortedItems} loading={loading}
                             setSelectedTripItem={setSelectedTripItem} selectedTripItem={selectedTripItem} />
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
                    <SocialBar activeMark={activeMark} tripItems={sortedItems} selectedTripItem={selectedTripItem}
                               setSelectedTripItem={setSelectedTripItem} activeTrip={activeTrip} loading={loading}
                               setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}
                               addItemToTrip={addItemToTrip} getTripGroupMem={getTripGroupMem} groupMembers={groupMembers}
                               setNewGroup={setNewGroup} closeGroupForm={closeGroupForm} />
                </aside>
            </main>
            {newTrip &&(
                <NewTripForm closeTripForm={closeTripForm} getTrips={getTrips} setActiveTrip={setActiveTrip} setSnackbar={setSnackbar}/>
            )}
            {newFriend && (
                <CreateFriendship closeFriendForm={closeFriendForm} setSnackbar={setSnackbar} />
            )}
            {addGroup && (
                <GroupAdd closeGroupForm={closeGroupForm} setSnackbar={setSnackbar} />
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
                    bgcolor: 'var(--bg-input)',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    width: 400
                }}>
                    <div className={"flex justify-between p-2 flex-col gap-5"}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight: 'bold', color: 'var(--text-main)'}}>
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