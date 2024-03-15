import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const router = [
  { path: "/", element: <Home /> }
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
