import '../styles/globals.css'; // Import global CSS
import '../styles/recipe-card.css'; // Import component-specific CSS (optional)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
