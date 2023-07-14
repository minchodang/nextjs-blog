import { Code } from 'bright';
import { MDXComponents } from 'mdx/types';
import { MDXImage } from './mdx-image';

export const mdxComponents: MDXComponents = {
    pre: ({
        children,
        ...props
    }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLPreElement>) => {
        return (
            <Code {...props} theme="material-default">
                {children as any}
            </Code>
        );
    },
    // @ts-expect-error RSC
    img: MDXImage,
    Details: ({
        children,
        summary,
        ...props
    }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLDetailsElement> & {
        summary: string;
    }) => (
        // Necessary due to a hydration error I can't quite figure out
        <details {...props}>
            {summary && <summary>{summary}</summary>}
            {children}
        </details>
    ),
};
