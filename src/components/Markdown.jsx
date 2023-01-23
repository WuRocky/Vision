import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
const Markdown = () => {
    const [markDown, setMarkdown] = useState();
    const markDonwHandler = (e) => {
        setMarkdown(e.target.value);
    };

    return (
        <div className="markDownContainer">
            <textarea
                className="textarea"
                value={markDown}
                onChange={markDonwHandler}
            />
            <hr />
            <ReactMarkdown
                className="output"
                children={markDown}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, "")}
                                style={tomorrowNightBlue}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            />
        </div>
    );
};

// const Component = ({ value, language }) => {
//     return (
//         <SyntaxHighlighter language={language && language} style={docco}>
//             {value && value}
//         </SyntaxHighlighter>
//     );
// };

export default Markdown;
