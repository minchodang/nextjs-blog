import { MDXRemote } from 'next-mdx-remote/rsc';
// @ts-expect-error RSC
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import { mdxComponents } from './markdown-components';

export function PostBody({ children }: { children: string }) {
    return (
        <MDXRemote
            source={children}
            options={{
                mdxOptions: {
                    remarkPlugins: [
                        // 깃허브 Flavored 마크다운 지원 추가
                        remarkGfm,
                        // 이모티콘 접근성 향상
                        remarkA11yEmoji,
                        // 제목을 기반으로 목차를 생성합니다.
                        remarkToc,
                    ],
                    // 함께 작동하여 ID를 추가하고 제목을 연결합니다.
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                },
            }}
            components={mdxComponents}
        />
    );
}
