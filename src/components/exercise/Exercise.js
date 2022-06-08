import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";

const Exercise = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch('md/Exercise.md')
            .then((res) => res.text())
            .then((text) => setMarkdown(text));
    }, []);

    return (
        <div>
            <ReactMarkdown>*React-Markdown* is **Awesome**</ReactMarkdown>
            <ReactMarkdown children={markdown}/>
        </div>
    )
}

export default Exercise;
