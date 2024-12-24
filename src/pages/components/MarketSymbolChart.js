import React, { useEffect, useRef } from 'react';

const MarketSymbolChart = () => {
    const widgetRef = useRef(null);

    useEffect(() => {
        // Check if the widget container exists
        if (widgetRef.current) {
            // Create the script element
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
            script.async = true;

            // Add the widget settings as a JSON string in the script's innerHTML
            script.innerHTML = JSON.stringify({
                symbols: [
                    ["Apple", "AAPL|1D"],
                    ["Google", "GOOGL|1D"],
                    ["Microsoft", "MSFT|1D"]
                ],
                chartOnly: false,
                width: "100%",
                height: "400",
                locale: "en",
                colorTheme: "dark",
                autosize: true,
                showVolume: false,
                showMA: false,
                hideDateRanges: false,
                hideMarketStatus: false,
                hideSymbolLogo: false,
                scalePosition: "right",
                scaleMode: "Normal",
                fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
                fontSize: "10",
                noTimeScale: false,
                valuesTracking: "1",
                changeMode: "price-and-percent",
                chartType: "area",
                maLineColor: "#2962FF",
                maLineWidth: 1,
                maLength: 9,
                headerFontSize: "medium",
                lineWidth: 2,
                lineType: 0,
                dateRanges: [
                    "1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"
                ]
            });

            // Append the script to the widget container
            widgetRef.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container" ref={widgetRef}>
            <div className="tradingview-widget-container__widget"></div>

        </div>
    );
};

export default MarketSymbolChart;
