import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import {
  Register,
  Login,
  Cart,
  Admin,
  Home,
  Reset,
} from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
