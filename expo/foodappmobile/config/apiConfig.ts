/**
 * API configuration for the application
 * Update this with your actual API URL
 */

export const API_URL = "https://foodapp-d0ov.onrender.com/api";

/**
 * Helper function to build API endpoints
 */
export const endpoints = {
  // Auth endpoints
  login: `${API_URL}/user/login`,
  register: `${API_URL}/user/register`,

  // User endpoints
  getUser: (userId: string) => `${API_URL}/user/${userId}`,

  // Product endpoints
  getAllProducts: `${API_URL}/product`,
  addProduct: `${API_URL}/product`,

  // Cart endpoints
  getCart: (userId: string) => `${API_URL}/cart/${userId}`,
  updateCart: (userId: string) => `${API_URL}/cart/${userId}`,
  addToCart: (userId: string) => `${API_URL}/cart/${userId}`,
  clearCart: (userId: string) => `${API_URL}/cart/${userId}`,

  // Order endpoints
  createOrder: `${API_URL}/order`,
  getUserOrders: (userId: string) => `${API_URL}/order/user/${userId}`,
  getOrder: (orderId: string) => `${API_URL}/order/${orderId}`,
  updateOrder: (orderId: string) => `${API_URL}/order/${orderId}`,
};

export default { API_URL, endpoints };
