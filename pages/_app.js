import '../styles/index.scss';
import '../styles/global.css';
import Nav from '../components/Nav/Nav';
import Head from 'next/head'; // Import Head from next/head

function MyApp({ Component, pageProps }) {
  return (
    <div className='app_wrapper'>
      <Head>
        {/* Google Analytics Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V047VZ19DY"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V047VZ19DY'); // Your Google Analytics tracking ID
            `,
          }}
        />
      </Head>
      <Nav />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;
