import Head from 'next/head';
import Image from 'next/image';

import { Channels, HikasenVtuber } from '@/src/features/Channels';
import { Suspense, useEffect } from 'react';
import { GetServerSideProps } from 'next';

interface Data<T> {
    status: number;
    message?: string;
    item?: T;
}

type Props = Data<HikasenVtuber[]>;

export default function Home({ status, message, item }: Props) {
    return (
        <div className="min-h-screen grid grid-rows-footer">
            <Head>
                <title>FFXIV - Vtubers</title>
                <meta name="description" content="ffxiv vtuber list" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="bg-gray-900 p-5">Header</header>
            <main className="bg-gray-800 h-full">
                <div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Channels ChannelsFirstPagenation={item} />
                    </Suspense>
                </div>
            </main>
            TEST
            <footer className="bg-gray-800 p-5">
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer">
                    Powered by{' '}
                    <span className="ml-2 h-4">
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const HOST = process.env.CHANNELLIST_URL;
    const response = await fetch(HOST, {
        method: 'GET',
    }).then(async (response) => {
        const data: HikasenVtuber[] = await response.json();
        if (!response.ok) {
            const err: Props = {
                message: 'Error',
                status: response.status,
            };
            return err;
        }

        return {
            item: data,
            status: response.status,
        };
    });
    return {
        props: response,
    };
};
