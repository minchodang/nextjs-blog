import styled from '@emotion/styled';
import Link from 'next/link';
import Post from '../types/common/post';
import { getAllPosts } from './api/api';
type Props = {
    allPosts: Post[];
};

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background: black;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 50px;
`;

const Home = ({ allPosts }: Props) => {
    return (
        <Container>
            <h1>All Posts</h1>
            {allPosts.map((value) => (
                <Link as={`/${value.slug}`} href={`/[id]`}>
                    <div>{value.title}</div>
                </Link>
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
