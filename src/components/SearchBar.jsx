import {FaSearch} from "react-icons/fa";
import {useState} from "react";

export default function SearchBar ({getCityMap}){

    const [search, setSearch] = useState("");


    return (
        <div className="relative w-144">
            <FaSearch onClick={() => getCityMap(search)}
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"/>
            <input value={search}
                   onKeyDown={(e) =>{
                       if(e.key === "Enter") getCityMap(search);
                   }}
                   onChange={(e) => setSearch(e.target.value)}
                   className={"pl-8 bg-bg-input flex items-center h-12 w-full rounded-2xl " +
                "p-5 border border-b-border-col"} placeholder="Szukaj miejsc, tras..."/>
        </div>
    )
}