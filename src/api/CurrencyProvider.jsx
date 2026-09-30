import { useState, useEffect } from 'react';
import { CurrencyContext } from './CurrencyContext';

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState(() => localStorage.getItem("savedCurrency") || "PLN");
    useEffect(() => {
        localStorage.setItem('savedCurrency', currency);
    }, [currency]);
    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
}