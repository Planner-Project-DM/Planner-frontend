import {useState, useEffect} from 'react';

export default function TripNavbar() {

    return (
        <main className="bg-bg-card w-full h-full p-5 flex flex-col">
            <div className="flex flex-col flex-1 overflow-hidden max-h-160">
                <div className="h-12">
                    <p>Grupa • (nazwa)</p>
                </div>
                <div className="flex-1 overflow-y-scroll max-h-114 [&::-webkit-scrollbar]:hidden">
                    <ul id="groupList" className="flex flex-col gap-5">
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                        <li><p>Inicjały</p> ANDRZEJ DRZEWKO</li>
                    </ul>
                </div>
                <div className="p-5 flex justify-center items-center h-24 pt-20">
                    <button className="h-12 w-64 border-2 border-accent border-dashed text-accent bg-bg-input rounded-2xl
                     hover:text-bg-input hover:bg-accent font-bold">+ Dodaj członka grupy
                    </button>
                </div>
            </div>
            <hr/>
            <div className="shrink-0 flex flex-col gap-3">
                <p className={"flex text-xl mt-2"}>Wydatki:</p>
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex justify-between"}>
                        <p className={"font-bold"}>Budżet:</p>
                        <p className={"font-bold"}>5000 PLN</p>
                    </div>
                    <div className={"flex justify-between"}>
                        <p className={"text-text-secondary font-bold"}>Wydano:</p>
                        <p className={"text-accent font-bold"}>4500 PLN</p>
                    </div>
                </div>
                <hr className={"border-4 rounded"}/>
            </div>
        </main>
    )
}