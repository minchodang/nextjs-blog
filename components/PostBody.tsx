import styled from '@emotion/styled';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import PostType from '../types/common/post';
import { PostHeader } from './PostHeader';
SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

type Props = {
    post: PostType;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
`;
const ImageLoader = ({ src }: { src: string }) => {
    return src;
};
export const PostBody = ({ post }: Props) => {
    const customRenderers = {
        p(paragraph: { children?: any; node?: any }) {
            const { node } = paragraph;
            if (node.children[0].tagName === 'img') {
                const image = node.children[0].properties;
                return (
                    <div>
                        <Image
                            loader={ImageLoader}
                            src={image.src}
                            width={300}
                            height={300}
                            alt={image.alt}
                            placeholder="blur"
                            blurDataURL={image.src}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },
        code(code: any) {
            const { className, children } = code;

            if (className) {
                return (
                    <SyntaxHighlighter style={atomDark} language={className.split('-')[1]}>
                        {children}
                    </SyntaxHighlighter>
                );
            }
        },
    };
    return (
        <Container>
            <PostHeader title={post.title} image={post.coverImage} />
            <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
        </Container>
    );
};
