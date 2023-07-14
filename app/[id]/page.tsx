import { Metadata } from 'next';
import { PostBody } from '../../components/PostBody';
import { getAllPosts, getPostBySlug } from '../../pages/api/api';

type Params = {
    params: {
        id: string;
    };
};
export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
    return {
        title: params.id,
        description: params.id,
    };
};

const getPostingData = async (id: string) => {
    const post = getPostBySlug({
        slug: id,
        fields: ['title', 'date', 'slug', 'author', 'content', 'ogImage', 'coverImage'],
    });
    return post;
};
export const generateStaticParams = async () => {
    const posts = getAllPosts(['slug']);
    return posts.map((value) => {
        return {
            params: { id: value.slug },
        };
    });
};

const PostDetail = async ({ params }: Params) => {
    const data = await getPostingData(params.id);

    return <PostBody>{data.content}</PostBody>;
};
export default PostDetail;
