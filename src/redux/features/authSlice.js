import { createSlice } from "@reduxjs/toolkit";
import { getIsNewNotification } from "../../utils/constants";
const isNewNotification = getIsNewNotification('isNewNotification')
  ? JSON.parse(getIsNewNotification('isNewNotification'))
  : false
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
    notifications: {
      notifications:[],
      totalNotifications: 0,
    },
    notificationsLoading: false,
    updateLoading: false,
    isNewNotification: isNewNotification,
    usersToChat:{},
    isLoginOpen:false,
    isSignUpOpen:false
  },
  reducers: {
   
    setUsersToChat: (state, action) => {
      state.usersToChat = action.payload;
    },
    setModalToggle: (state, action) => {
      const {key, value} =  action.payload
      state[key]= value;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleNewNotification: (state, action) => {
      state.isNewNotification = action.payload;
    },
    updateNotification: (state, action) => {
      state.notifications = { ...state?.notifications, notifications: [action.payload,...state?.notifications?.notifications], totalNotifications: state?.notifications?.totalNotifications+1 };
    },
    updateUserWallet: (state, action) => {
      const newAmount=Number(state.user.wallet.amount)-Number(action.payload)
      state.user.wallet.amount = newAmount;
    },
    updateUserCarts: (state, action) => {
      state.user.carts = [...state.user.carts, action.payload];
    },
    setUserWishList: (state, action) => {
      state.user.whislistItems = [...state.user.whislistItems, action.payload];
    },
    updateWholeCarts: (state, action) => {
      state.user.carts = action.payload;
    },
    updateWishList: (state, action) => {
      state.user.whislistItems = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLogout: (state, action) => {
      localStorage.removeItem("loginToken");
      state.user = null;
    },
    deleteNotificationStart: (state, action) => {
      state.updateLoading = true;
    },
    deleteNotificationComplete: (state, action) => {
      state.notifications = action.payload;
      state.updateLoading = false;
    },
    readNotificationStart: (state, action) => {
      state.updateLoading = true;
    },
    readNotificationComplete: (state, action) => {
      state.notifications = action.payload;
      state.updateLoading = false;
    },
    getUserNotifcationStart: (state, action) => {
      state.notificationsLoading = true;
    },
    getUserNotifcationSuccess: (state, action) => {
      state.notifications = action.payload;
      state.notificationsLoading = false;
    },
    getUserNotifcationFailure: (state, action) => {
      state.notificationsLoading = false;
    },
    
  },
  extraReducers: {},
});

export const {
  setModalToggle,
  setUsersToChat,
  setUser,
  setLogout,
  updateUser,
  updateUserCarts,
  updateWholeCarts,
  setUserWishList,
  updateWishList,
  getUserNotifcationStart,
  getUserNotifcationSuccess,
  getUserNotifcationFailure,
  deleteNotificationStart,
  deleteNotificationComplete,
  readNotificationComplete,
  readNotificationStart,
  updateNotification,
  toggleNewNotification,
  updateUserWallet
} = authSlice.actions;

export default authSlice.reducer;
