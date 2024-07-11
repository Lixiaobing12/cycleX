import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import Airdrop from "./pages/Airdrop";
import Issus from "./pages/AssestIssus";
import Assets from "./pages/Assets";
import BlindBox from "./pages/BlindBox";
import Guide from "./pages/Guide";
import Home from "./pages/Home";
import IDO from "./pages/IDO";
import Login from "./pages/Login";
import NewsDetails from "./pages/NewsDetail";
import Platform from "./pages/Platform";
import Verify from "./pages/Verify";
import Wallet from "./pages/wallet";

function RouterProviders() {
  const size = useWindowSize();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assets/:id" element={
        <ConfigProvider
          theme={{
            components: {
              Select: {
                optionSelectedColor: "#fff",
              },
            },
          }}>
          <Assets />
        </ConfigProvider>} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/platform" element={<Platform />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/issus" element={<Issus />} />
      <Route path="/airdrop" element={<Airdrop />} />
      <Route path="/ido" element={<IDO />} />
      <Route path="/new/:id" element={<NewsDetails />} />
      <Route path='/blindbox' element={<BlindBox />}></Route>
      <Route
        path="/login"
        element={
          <>
            {size.width < 600 ? (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#000",
                    controlOutlineWidth: 1,
                    fontFamily: "nomal-font",
                  },
                  components: {
                    Select: {
                      optionSelectedColor: "#fff",
                    },
                    Tabs: {
                      inkBarColor: "#fff",
                      itemActiveColor: "#fff",
                      itemHoverColor: "#fff",
                      itemColor: "#9d9d9d",
                      itemSelectedColor: "#fff",
                    },
                    Form: {
                      labelColor: "#fff",
                    },
                  },
                }}>
                <Login />
              </ConfigProvider>
            ) : (
              <Login />
            )}
          </>
        }
      />
    </Routes>
  );
}

export default RouterProviders;
