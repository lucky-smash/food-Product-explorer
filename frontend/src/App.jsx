import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard.jsx";

function App() {
  return (
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:code" element={<ProductDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
