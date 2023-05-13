import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Assembly from "./pages/dashboards/Assembly";
import Admin from "./pages/dashboards/Admin";
import Nav from "./components/Nav";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/assembly" element={<Assembly />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
