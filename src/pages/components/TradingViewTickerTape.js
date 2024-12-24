import React, { useEffect, useRef } from "react";

const TradingViewTickerTape = () => {
    const widgetRef = useRef(null);

    useEffect(() => {
        // Create and configure the script element
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbols: [
                { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
                { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
                { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
                { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
            ],
            width: "100%",
            height: "100%",
            showSymbolLogo: true,
            isTransparent: false,
            displayMode: "adaptive",
            colorTheme: "light",
            locale: "en",
        });
        widgetRef.current.appendChild(script);


    }, []);

    return (
        <div style={{ height: 78 }} className="tradingview-widget-container" ref={widgetRef}>
            <div className="tradingview-widget-container__widget"></div>

        </div>
    );
};

export default TradingViewTickerTape;
