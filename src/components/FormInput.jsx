export default function FormInput({ label, id, placeholder, type = "text" , maxLength, max, value, onChange }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className={"text-text-main"}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                id={id}
                className="w-full bg-bg-input rounded-xl p-3 border border-border-col text-text-main"
                maxLength={maxLength}
                max={max}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}