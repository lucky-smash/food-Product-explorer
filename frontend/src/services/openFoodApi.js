const BASE_URL = "https://world.openfoodfacts.org";

export const searchProductsByName = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/cgi/search.pl?search_terms=${query}&page=${page}&json=true`
  );
  return response.json();
};
