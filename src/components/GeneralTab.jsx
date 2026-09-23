
export default function GeneralTab() {

    return (
        <div className={"bg-bg-funds-card rounded-2xl shadow-lg h-24 w-full min-h-36 flex flex-col gap-3 p-3"}>
            <h2 className={"font-bold text-xl"}>Waluta</h2>
            <p>Zmiana waluty używanej na stronie.</p>
            <div className={"w-full flex justify-between"}>
                <div>
                    <select className={"rounded-xl h-12 cursor-pointer bg-bg-funds-card border-border-col"}>
                        <option value={"pln"}>PLN zł</option>
                        <option value={"dolar"}>Dolar $</option>
                    </select>
                </div>
                <button className={"w-24 h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                    "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in"}>Zapisz</button>
            </div>
        </div>
    )
}