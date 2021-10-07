import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "../pages/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          refreshInterval: 10000,
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <Toaster />
        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
