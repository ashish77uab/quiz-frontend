import axios from "axios";
import { io } from "socket.io-client";
const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;
const baseURL = `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`
export const socketConnect = (namespace, token) => {

  return io(`${baseURL}${namespace}`, {
    auth: {
      token,
    },
    transports: ['websocket']
  });
}
const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("loginToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("loginToken")}`;
  }
  return req;
});
// Banners
export const getBanners = () => API.get("banners");
export const updateBanner = (id, formData) =>
  API.put(`banners/${id}`, formData);
export const addBanner = (formData) => API.post("banners", formData);
export const deleteBannerImage = (id, formData) =>
  API.put(`banners/delete-banner-image/${id}`, formData);


// Tournament API
export const getTournaments = () => API.get("tournaments");
export const addTournament = (formData) => API.post("tournaments", formData);
export const deleteTournament = (id) => API.delete(`tournaments/${id}`);
export const updateTournament = (id, formData) =>
  API.put(`tournaments/${id}`, formData);

// Teams
export const addTeam = (formData) =>
  API.post("team/add", formData);
export const deleteTeam = (id) => API.delete(`team/${id}`);
export const updateTeam = (id, formData) =>
  API.put(`team/${id}`, formData);
export const getAllTeam = ({ id }) =>
  API.get(`team/all/${id}`);
export const getTeam = (formData) =>
  API.get("team", formData);


// Match
export const addMatch = (formData) =>
  API.post("match/add", formData);
export const deleteMatch = (id) => API.delete(`match/${id}`);
export const distributeMoney = (id) => API.put(`match/distribute-money/${id}`);
export const updateMatch = (id, formData) =>
  API.put(`match/${id}`, formData);
export const getAllMatchOfTournament = ({ id }) =>
  API.get(`match/all/${id}`);
export const getMatch = (id) =>
  API.get(`match/${id}`);
export const getTopMatches = () =>
  API.get(`match/top`);

// Prize
export const createPrizePyramid = (formData) =>
  API.post("prize/add", formData);
export const deletePrizePyramid = (id) => API.delete(`prize/${id}`);
export const updtePrizePyramid = (id, formData) =>
  API.put(`prize/update/${id}`, formData);
export const getAllPrizePyramid = () =>
  API.get(`prize/all`);
export const getPrizePyramid = (id) =>
  API.get(`prize/${id}`);


// User Team
export const addUserTeam = (formData) =>
  API.post("match-team/add", formData);
export const getUserMatchTeam = ({ matchId, userId }) =>
  API.get(`match-team/${matchId}/${userId}`);
export const getEvents = (matchId) =>
  API.get(`match-team/event/${matchId}`);
export const deleteUserTeam = (id) => API.delete(`match-team/${id}`);
export const updateUserTeam = (id, formData) =>
  API.put(`match-team/${id}`, formData);
export const joinEvent = (formData) =>
  API.post(`match-team/event`, formData);


export const addPlayer = (formData) =>
  API.post("player/add", formData);
export const deletePlayer = (id) => API.delete(`player/${id}`);
export const updatePlayer = (id, formData) =>
  API.put(`player/${id}`, formData);
export const getAllPlayer = ({ id }) =>
  API.get(`player/all/${id}`);
export const getPlayer = (id) =>
  API.get(`player/${id}`);
export const updatePlayerPlayingStatus = (data) =>
  API.put(`player/playing`, data);
export const updatePlayerScore = (scoreId, data) =>
  API.put(`player/score/${scoreId}`, data);
export const getPlayerScore = (playerId) =>
  API.get(`player/score/${playerId}`);
export const resetPlayerData = (data) =>
  API.put(`player/score-reset`, data);

// wishlist
export const addToWishList = (formData) => API.post("wishlist/add", formData);
export const getWishlistItem = () => API.get("wishlist");
export const removeWishlistItem = (id) => API.delete(`wishlist/${id}`);

// orders
export const removeCartItem = (id) => API.delete(`orders/remove-item/${id}`);
export const updateOrderStatus = (data) => API.put(`orders`, data);
export const cancelOrder = (data) => API.put(`orders/cancel-order`, data);
// admin
export const getAllOrderList = (data) => API.get(`orders/admin/all?page=${data?.page}&limit=${data?.limit}`);


// Products
export const getProducts = (data) => API.get(`products?min=${data?.min || ''}&max=${data?.max || ''}&category=${data?.category || []}&sort=${data?.sort || ''}`);
export const getBrands = () => API.get("products/brands");
export const addProduct = (formData) => API.post("products", formData);
export const deleteProduct = (id) => API.delete(`products/${id}`);
export const updateProduct = (id, formData) =>
  API.put(`products/${id}`, formData);
export const deleteProductImage = (id, formData) =>
  API.put(`products/delete-product-image/${id}`, formData);
export const addProductReview = (formData) =>
  API.post(`products/add-product-review`, formData);
export const editProductReview = (id, formData) =>
  API.put(`products/edit-product-review/${id}`, formData);

export const addToCart = (formData) => API.post("orders/add-to-cart", formData);
export const getCartItems = () => API.get("orders/cart-items");
export const placeOrder = (formData) => API.post("orders", formData);
export const getAllUserOrders = () => API.get(`orders/user-orders`);



// Product API
export const getFeaturedProducts = () => API.get("products/featured");
export const getAllProducts = () => API.get("products");
export const getSingleProduct = (id) => API.get(`products/${id}`);

// User
export const login = (formData) => API.post(`auth/login`, formData);
export const register = (formData) => API.post(`auth/register`, formData);
export const updatePassword = (formData) => API.post(`auth/update-password`, formData);
export const addDeposit = (formData) => API.post(`auth/add-deposit`, formData);
export const withdrawFund = (formData) => API.post(`auth/withdraw-fund`, formData);
export const getUserTransactions = (data) => {
  const queryString = new URLSearchParams(data)?.toString()
  return API.get(`auth/transactions?${queryString}`)
};

export const getAllTransactionsList = (data) => {
  const queryString = new URLSearchParams(data)?.toString()
  return API.get(`transactions/all-transactions?${queryString}`)
};
export const updatTransactionStatus = (data) => API.put(`transactions/update-status`, data);
export const updateTransaction = (data, transactionId, userId) => API.put(`transactions/update-transaction/${transactionId}/${userId}`, data);
export const forgotRequest = (formData) =>
  API.post(`auth/requestResetPassword`, formData);
export const resetPassword = (formData) =>
  API.post(`auth/resetPassword`, formData);
export const getUser = () => API.get("auth/profile");
export const uploadProfileImage = (id, formData) =>
  API.post(`auth/profileImage/${id}`, formData);
export const uploadImage = (formData) => API.post("upload", formData);





export const getAllUsersList = (data) => API.get(`auth/all-users?page=${data?.page}&limit=${data?.limit}&search=${data?.search}`);
export const getSingleUserData = (userId) => API.get(`auth/single-user?userId=${userId}`);
export const getAllAdminList = () => API.get(`auth/all-admin`);
export const getAllUserNotifications = (data) => API.get(`auth/notifications?skip=${data?.skip}&take=${data?.take}`);
export const deleteNotification = (notificationId) => API.delete(`auth/notifications/delete/${notificationId}`);
export const readNotification = (notificationId) => API.put(`auth/notifications/read/${notificationId}`);

export const updateWallet = (userId, data) => API.post(`auth/update-wallet/${userId}`, data);
// dashboard
export const getDashboardData = () => API.get(`dashboard/all-data`);

// stock
export const getUserStocks = (data) => {
  const queryString = new URLSearchParams(data)?.toString()
  return API.get(`stock/user-stocks?${queryString}`)
}
export const createStock = (data) => API.post(`stock/create-stock`, data);
export const sellStock = (data) => API.post(`stock/sell-stock`, data);
export const updateStock = (data, stockId, isChecked) => API.put(`stock/update-stock/${stockId}?isChecked=${isChecked}`, data);
export const deleteStock = (stockId) => API.delete(`stock/delete-stock/${stockId}`);
export const settleStock = (stockId, stock) => API.post(`stock/settle-stock/${stockId}`, stock);

// holdings
export const getUserHoldings = (data) => {
  const queryString = new URLSearchParams(data)?.toString()
  return API.get(`holding/user-holdings?${queryString}`)
}
export const createHolding = (data) => API.post(`holding/create-holding`, data);
export const sellHolding = (data) => API.post(`holding/sell-holding`, data);
export const updateHolding = (data, holdingId, isChecked) => API.put(`holding/update-holding/${holdingId}?isChecked=${isChecked}`, data);
export const deleteHolding = (holdingId) => API.delete(`holding/delete-holding/${holdingId}`);

export const contactUsRequest = (formData) => API.post(`auth/contact-us`, formData);
