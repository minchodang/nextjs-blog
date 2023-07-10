import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const highlightCodeInHTML = (htmlString: any) => {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(htmlString, 'text/html');
    const codeBlocks = doc.querySelectorAll('pre code');

    codeBlocks.forEach((codeBlock) => {
        if (!codeBlock.textContent) {
            return;
        }
        const result = hljs.highlightAuto(codeBlock.textContent);
        codeBlock.innerHTML = result.value;
        codeBlock.classList.add('hljs');
    });

    return doc.documentElement.innerHTML;
};

export { highlightCodeInHTML };
