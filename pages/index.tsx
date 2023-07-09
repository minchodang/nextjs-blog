import styled from '@emotion/styled';
import Post from '../types/common/post';
import { getAllPosts } from './api/api';
type Props = {
    allPosts: Post[];
};

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background: blue;
`;

const Home = ({ allPosts }: Props) => {
    console.log(allPosts);

    return (
        <Container>
            {allPosts.map((value) => (
                <div>{value.excerpt}</div>
            ))}
        </Container>
    );
};

export default Home;

export const getStaticProps = async () => {
    const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

    return {
        props: { allPosts },
    };
};
