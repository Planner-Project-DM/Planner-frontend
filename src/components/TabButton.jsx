export default function TabButton({ label, tabName, activeMark, setActiveMark }) {
    return (
        <button
            onClick={() => setActiveMark(tabName)}
            className={`flex items-center justify-center h-12 rounded-2xl border
                ${activeMark === tabName
                ? "bg-accent text-white border-accent"
                : "bg-bg-main text-text-main border-border-col hover:bg-bg-input"
            }`}
        >
            {label}
        </button>
    )
}