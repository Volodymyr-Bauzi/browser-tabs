// pages/_app.tsx
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <header>Global Header</header>
      <Component {...pageProps} />
      <footer>Global Footer</footer>
    </div>
  );
};

export default MyApp;
