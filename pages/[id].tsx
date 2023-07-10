import { useRouter } from 'next/router';
import PostBody from '../components/PostBody';
import PostType from '../types/common/post';
import { getAllPosts, getPostBySlug } from './api/api';
import markdownToHtml from './api/markdownToHtml';
type Params = {
    params: {
        id: string;
    };
};
type Props = {
    post: PostType;
    morePosts: PostType[];
    preview?: boolean;
};

const DetailPage = ({ post, morePosts, preview }: Props) => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    console.log(id, 'ssdff', post.content);
    return <PostBody content={post.content} />;
};

export default DetailPage;

export async function getStaticProps({ params }: Params) {
    const post = getPostBySlug({
        slug: params.id,
        fields: ['title', 'date', 'slug', 'author', 'content', 'ogImage', 'coverImage'],
    });
    const content = await markdownToHtml(post.content || '');

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug']);

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    id: post.slug,
                },
            };
        }),
        fallback: false,
    };
}
