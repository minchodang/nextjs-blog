import { getAllPosts } from '../pages/api/api';
import PostList from './home-page';

const getPostData = async () => {
    const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);
    return allPosts;
};

const Home = async () => {
    const postingData = await getPostData();
    return <PostList allPosts={postingData} />;
};
export default Home;
