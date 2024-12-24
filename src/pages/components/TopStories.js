import React, { useEffect, useRef } from "react";

const TopStories = () => {
    const widgetRef = useRef(null);

    useEffect(() => {
        // Create and configure the script element
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            feedMode: "all_symbols",
            isTransparent: false,
            displayMode: "regular",
            width: '100%',
            height: '580',
            colorTheme: "light",
            locale: "en",
        });
        widgetRef.current.appendChild(script);

        // Clean up on component unmount to prevent duplicates

    }, []);

    return (
        <div className="tradingview-widget-container" ref={widgetRef}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
};

export default TopStories;
