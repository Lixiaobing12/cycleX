import { useLocation } from "react-router-dom";
import Footers from "./components/Footers";
import HeaderComponent from "./components/Headers";
import RouterProviders from "./router";

function App() {
  const router = useLocation();
  return (
    <>
      <div style={{ display: router.pathname === "/login" ? "none" : "inherit" }}>
        <HeaderComponent />
      </div>
      <RouterProviders />
      <div style={{ display: router.pathname === "/login" ? "none" : "inherit" }}>
        <Footers />
      </div>
    </>
  );
}

export default App;
