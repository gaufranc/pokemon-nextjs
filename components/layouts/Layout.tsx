import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui/Navbar';

type Props = {
    title: string
};

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<PropsWithChildren<Props>> = ({children, title}) => {
    
    
    
    return (
        <>
            <Head>
                <title>{title ?? 'Pokemon App'}</title>
                <meta name="author" content="Gaspar aufranc"/>
                <meta name="description" content="Information about pokemon xxxx"/>
                <meta name="keywords" content="xxxx"/>

                <meta property="og:title" content={`Informacion sobre ${title}`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
                <meta property="og:image" content={`${origin}/images/banner.png`} />
            </Head>
            <Navbar />
            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
