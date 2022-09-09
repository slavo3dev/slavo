import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout, HeadBasePage, MainNavigation } from "../components"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <HeadBasePage
                title="Software Web Development | SEO | Web3.0 | Crypto- Home Page"
                metaDescription="My name is Slavo Popovic and I am an experienced software web engineer and freelance developer. The enthusiastic professional developer of web/chatbots/aws cloud who is used to fast-paced environments. Hardworking and effective as both a team leader and in an individual role" />
            <MainNavigation />
            <Component { ...pageProps } />
        </Layout>
    )
}

export default MyApp
