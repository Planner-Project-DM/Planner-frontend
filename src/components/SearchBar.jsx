import {FaSearch} from "react-icons/fa";
import {useState} from "react";

export default function SearchBar ({getCityMap}){

    const [search, setSearch] = useState("");

    return (
        <div className="relative w-full lg:w-144">
            <FaSearch onClick={() =>(
                if (search === null) return setSnackbar({open: true, message: 'Odczytano wszystkie powiadomienia!', severity: 'success'});
                getCityMap(search))}
                      className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 cursor-pointer"/>
            <input value={search}
                   onKeyDown={(e) =>{
                       if(e.key === "Enter") getCityMap(search);
                   }}
                   onChange={(e) => setSearch(e.target.value)}
                   className={"pl-10 lg:pl-12 pr-4 lg:pr-5 bg-bg-input flex items-center h-10 lg:h-12 w-full rounded-2xl " +
                       "py-2 border border-border-col text-sm lg:text-base"} placeholder="Szukaj miejsc, tras..."/>
        </div>
    )
}