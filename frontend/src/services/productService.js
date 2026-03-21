const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";

export const createProduct = async (payload) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token found");
    
    const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

        console.log("Creating product with payload:", payload);
        console.log("API response status:", res.status);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to create product");
    }
    return data;//created product
}

export const fetchProducts = async (search = "") => {
    // Incorrect/incomplete line (kept for learning)
    // const url = search
    // Correct: build URL based on search
    const url = search
        ? `${API_BASE}/api/products?search=${encodeURIComponent(search)}`
        : `${API_BASE}/api/products`;

    const res = await fetch(url);
    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch products");
    }
    return data;//list of products
}
