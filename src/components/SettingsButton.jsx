
export default function SettingsButton({text, emote, onClick}) {

    return (
        <button className={"flex-1 text-text-main hover:bg-accent transition duration-150 ease-out " +
            "hover:ease-in hover:text-white h-full rounded-xl flex items-center w-full justify-start gap-5 p-1"}
        onClick={onClick}>
            {emote} {text}
        </button>
    )
}