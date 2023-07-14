import { PostBody } from '../components/PostBody';
import PostType from '../types/common/post';
import { getAllPosts, getPostBySlug } from './api/api';
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

const DetailPage = ({ post }: Props) => {
    console.log(post);
    return <PostBody post={post} />;
};

export default DetailPage;

export async function getStaticProps({ params }: Params) {
    const post = getPostBySlug({
        slug: params.id,
        fields: ['title', 'date', 'slug', 'author', 'content', 'ogImage', 'coverImage'],
    });
    // const content = await markdownToHtml(post.content || '');

    return {
        props: {
            post: {
                ...post,
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
