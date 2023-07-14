'use client';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Items } from '../pages/api/api';
import Post from '../types/common/post';
type Props = {
    allPosts: Post[] | Items[];
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    div {
        cursor: pointer;
    }
`;

const PostList = ({ allPosts }: Props) => {
    return (
        <Container>
            <h1>All Posts</h1>
            {allPosts.map((value) => (
                <Link as={`/${value.slug}`} href={`/[id]`} key={value.slug}>
                    <div>{value.title}</div>
                </Link>
            ))}
        </Container>
    );
};

export default PostList;
