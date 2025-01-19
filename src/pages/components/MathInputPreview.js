import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
const string = "What is the value of \\( \\int_{0}^{\\pi} \\sin(x) dx \\)?"
const MathInputPreview = () => {
    const [input, setInput] = useState(""); // State for user input

    const renderInput = (latexInput) => {
        // Replace spaces with LaTeX-compatible spaces
        return latexInput.replace(/ /g, "\\ ");
    };



    return (
        <div>
            <textarea
                className="w-full"
                id="mathInput"
                placeholder="Type your question or formula using LaTeX"
                value={input}
                onChange={(e) => setInput(e.target.value)} // Update state on input change
                rows={5}
                cols={50}
            />
            <MathJax>{`\\(${renderInput(input)}\\)`}</MathJax>
        </div>
    );
};

export default MathInputPreview;
