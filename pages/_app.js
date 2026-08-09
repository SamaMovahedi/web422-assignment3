import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import 'bootstrap/dist/css/bootstrap.min.css';

const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) throw new Error("Failed");
  return res.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
