export const API_URL = `https://minizuba-fn.azurewebsites.net/api/orderlines`;
export const MAX_TYPE_ID = 14;

export const fetchOrders = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}?type_id=${id}`);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(`Failed to fetch data for type_id ${id}`);
        }
    } catch (error) {
        console.error(`Error fetching data for type_id ${id}:`, error);
    }
    return [];
}
