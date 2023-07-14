import { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
    title: 'M.S.blog',
    description: '민수의 블로그입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
