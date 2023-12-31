import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
type PostSlugType = {
    slug: string;
    fields: string[];
};

export type Items = {
    [key: string]: string;
};

const postsDirectory = join(process.cwd(), '_posts');

export const getPostSlugs = () => {
    return fs.readdirSync(postsDirectory);
};

export const getPostBySlug = ({ slug, fields = [] }: PostSlugType) => {
    const realSlug = slug?.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const items: Items = {};

    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug;
        }
        if (field === 'content') {
            items[field] = content;
        }

        if (typeof data[field] !== 'undefined') {
            items[field] = data[field];
        }
    });
    return items;
};

export const getAllPosts = (fields: string[] = []) => {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug({ slug, fields }))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
};
