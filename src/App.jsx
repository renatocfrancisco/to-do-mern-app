import Layout from "./components/layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/users" element={<Users />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
