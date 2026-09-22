
export default function UserSettingsWindow (){


    return (
        <div className="w-screen h-screen fixed z-50 bg-gray-800/80 top-0 left-0" onClick={(e) => e.stopPropagation()}>
            <div className="bg-bg-card border-2 border-accent rounded-xl absolute h-[95%] top-1/2 left-1/2 -translate-x-1/2
                         -translate-y-1/2 shadow-gray-500 shadow-md flex flex-col gap-4 w-1/2 p-5">

            </div>
        </div>
    )
}