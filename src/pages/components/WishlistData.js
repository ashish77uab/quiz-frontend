import React, { useEffect, useRef } from "react";

const WishlistData = () => {
    const widgetRef = useRef(null);

    useEffect(() => {
        // Ensure the script is added only once
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            title: "Indices",
            tabs: [
                {
                    title: "US & Canada",
                    title_raw: "US & Canada",
                    symbols: [
                        { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
                        { s: "FOREXCOM:NSXUSD", d: "US 100" },
                        { s: "CME_MINI:ES1!", d: "S&P 500" },
                        { s: "INDEX:DXY", d: "U.S. Dollar Currency Index" },
                        { s: "FOREXCOM:DJI", d: "Dow 30" },
                    ],
                },
                {
                    title: "Europe",
                    title_raw: "Europe",
                    symbols: [
                        { s: "INDEX:SX5E", d: "Euro Stoxx 50" },
                        { s: "FOREXCOM:UKXGBP", d: "UK 100" },
                        { s: "INDEX:DEU40", d: "DAX Index" },
                        { s: "INDEX:CAC40", d: "CAC 40 Index" },
                        { s: "INDEX:SMI", d: "SWISS MARKET INDEX SMI® PRICE" },
                    ],
                },
                {
                    title: "Asia/Pacific",
                    title_raw: "Asia/Pacific",
                    symbols: [
                        { s: "INDEX:NKY", d: "Nikkei 225" },
                        { s: "INDEX:HSI", d: "Hang Seng" },
                        { s: "BSE:SENSEX", d: "Sensex" },
                        { s: "BSE:BSE500", d: "S&P BSE 500 INDEX" },
                        { s: "INDEX:KSIC", d: "Kospi Composite" },
                    ],
                },
            ],
            width: "100%",
            height: "732",
            showChart: true,
            showFloatingTooltip: false,
            locale: "en",
            plotLineColorGrowing: "#2962FF",
            plotLineColorFalling: "#2962FF",
            belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
            belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
            belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
            belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
            gridLineColor: "rgba(240, 243, 250, 0)",
            scaleFontColor: "rgba(120, 123, 134, 1)",
            showSymbolLogo: true,
            symbolActiveColor: "rgba(41, 98, 255, 0.12)",
            colorTheme: "dark",
        });
        widgetRef.current.appendChild(script);

        // Clean up to avoid duplicate widgets
        // return () => {
        //     widgetRef?.current?.innerHTML = "";
        // };
    }, []);

    return (
        <div className="tradingview-widget-container" ref={widgetRef}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
};

export default WishlistData;
