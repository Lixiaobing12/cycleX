import { Route, Routes } from "react-router-dom";
import Assets from "./pages/Assets";
import Home from "./pages/Home";
import Login from "./pages/Login";

const router = [
  { path: "/", element: <Home /> },
  { path: "/assets/:id", element: <Assets /> },
  { path: "/login", element: <Login /> },
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
