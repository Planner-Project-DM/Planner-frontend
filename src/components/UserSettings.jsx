export default function UserSettings(){
    return (
        <div className="bg-bg-card border-2 border-accent border-t-0 text-white rounded-xl absolute text-center w-80 min-h-160
                    right-0 shadow-gray-500 shadow-md border-r-0 rounded-t"
        onClick={e => e.stopPropagation()}>
            <div className={"flex flex-col text-text-main"}>
                <p>Ustawienia</p>
                <p>Dark / Light</p>
            </div>
            <hr/>
            <div className={"flex flex-col text-text-main"}>
                <ul>
                    <li>Znajomy</li>
                </ul>
            </div>
            <hr />
            <div className="text-text-main">
                <button>
                    + Dodaj znajomego
                </button>
            </div>
        </div>
    )
}