import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
import Auth from "./Pages/Auth";

function App() {
  return (
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:code" element={<ProductDetail />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
