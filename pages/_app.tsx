import type { AppProps } from "next/app";

import styles from ".styles/background.module.scss";
import ".styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-4 py-4 pl-4 sm:pl-32">
        <h2>BROCCOLI &amp; CO.</h2>
      </header>
      <main className={`flex flex-col grow shrink p-4 ${styles.gradient}`}>
        <Component {...pageProps} />
      </main>
      <footer className="border-t-4 text-center py-4">
        <p>Made with &#10084;</p>
        <p>Copyright &copy; {new Date().getFullYear()} Irsan Arisandy</p>
      </footer>
    </div>
  );
}
