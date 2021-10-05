import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import axios from "axios";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (url) => axios.get(url).then((res) => res.data),
      }}
    >
      <Toaster />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SWRConfig>
  );
}

export default MyApp;
