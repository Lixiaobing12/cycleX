import { Route, Routes } from "react-router-dom";
import Airdrop from "./pages/Airdrop";
import Issus from "./pages/AssestIssus";
import Assets from "./pages/Assets";
import Guide from "./pages/Guide";
import Home from "./pages/Home";
import IDO from "./pages/IDO";
import Login from "./pages/Login";
import NewsDetails from "./pages/NewsDetail";
import Platform from "./pages/Platform";
import Verify from "./pages/Verify";
import Wallet from "./pages/wallet";

const router = [
  { path: "/", element: <Home /> },
  { path: "/assets/:id", element: <Assets /> },
  { path: "/login", element: <Login /> },
  { path: "/verify", element: <Verify /> },
  { path: "/wallet", element: <Wallet /> },
  { path: "/platform", element: <Platform /> },
  { path: "/guide", element: <Guide /> },
  { path: "/issus", element: <Issus /> },
  { path: "/airdrop", element: <Airdrop /> },
  { path: "/ido", element: <IDO /> },
  { path: "/new/:id", element: <NewsDetails /> },
  // { path: "/setting", element: <Setting /> },
];
function RouterProviders() {
  return (
    <Routes>
      {router.map((item) => (
        <Route path={item.path} element={item.element} key={item.path} />
      ))}
    </Routes>
  );
}

export default RouterProviders;
