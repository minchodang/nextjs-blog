import styled from '@emotion/styled';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { useEffect, useState } from 'react';
hljs.registerLanguage('javascript', javascript);

type Props = {
    content: string;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    img {
        max-width: calc(100% - 0px);
    }
`;

const PostBody = ({ content }: Props) => {
    const [highlightedContent, setHighlightedContent] = useState(content);

    useEffect(() => {
        import('./../util/highlightCodeInHTML').then(({ highlightCodeInHTML }) => {
            setHighlightedContent(highlightCodeInHTML(content));
        });
    }, []);
    return (
        <Container>
            <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />
        </Container>
    );
};

export default PostBody;
