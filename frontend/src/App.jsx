import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";

function App() {
  return (
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:code" element={<ProductDetail />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
