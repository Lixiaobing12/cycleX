import Footers from "./components/Footers";
import HeaderComponent from "./components/Headers";
import RouterProviders from "./router";

function App() {
  return (
    <>
      <HeaderComponent />
      <RouterProviders />
      <Footers/>
    </>
  );
}

export default App;
