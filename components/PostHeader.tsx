import styled from '@emotion/styled';
import Image from 'next/image';

type PostHeaderProps = {
    title: string;
    image: string;
};

const Header = styled.header`
    display: flex;
    flex-direction: column;
`;

const ImageLoader = ({ src }: { src: string }) => {
    return src;
};
export const PostHeader = ({ title, image }: PostHeaderProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <Image
                src={image}
                loader={ImageLoader}
                alt={title}
                width={'300'}
                height={'300'}
                objectFit="responsive"
                placeholder="blur"
                blurDataURL={image}
            />
        </div>
    );
};
