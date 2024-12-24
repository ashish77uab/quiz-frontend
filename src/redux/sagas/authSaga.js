import { call, put, select, takeLatest } from "redux-saga/effects";
import { getAllUserNotifications, deleteNotification, readNotification } from "../../api/api";
import {
  getUserNotifcationStart,
  getUserNotifcationSuccess,
  getUserNotifcationFailure,
  deleteNotificationStart,
  deleteNotificationComplete,
  readNotificationComplete,
  readNotificationStart,
} from "../features/authSlice";

function* fetchNotificationsWatcher(action) {
  try {
    const {  notifications }=yield select(state=>state?.auth)
    const { data, status } = yield call(getAllUserNotifications, action.payload);
    if(status===200){
      let tempData=data 
      if(notifications?.notifications?.length>0){
         tempData.notifications=[...notifications?.notifications, ...data?.notifications]
        yield put(getUserNotifcationSuccess(tempData));
      }else{
        yield put(getUserNotifcationSuccess(data));

      }
    }
   
  } catch (e) {
    yield put(getUserNotifcationFailure());
  }
}
function* deleteNotificationsWatcher(action) {
  try {
    const { id } = action.payload
    const { notifications } = yield select(state => state?.auth)
    const { status} = yield call(deleteNotification, action.payload?.id);
    if (status === 200) {
      let payload
      const tempNotifications = notifications?.notifications?.filter(item => item?._id !== id)
      const totalNotifications = notifications?.totalNotifications > 0? notifications?.totalNotifications-1:0
      payload = {
        ...notifications,
        notifications: tempNotifications,
        totalNotifications
      }
      yield put(deleteNotificationComplete(payload));
    }
  } catch (e) {
    yield put(deleteNotificationComplete());
  }
}
function* readNotifiationsWatcher(action) {
  try {
    const { id } = action.payload
    const {notifications}=yield select(state=>state?.auth)
    const { status } = yield call(readNotification, action.payload?.id);
   
    if(status===200){
      const tempNotifications = notifications?.notifications?.map(item => {
        if (item?._id === id){
          return { ...item, isRead:true }
        }
        return item
      })
      const payload = {
        ...notifications,
        notifications: tempNotifications,

      }
      yield put(readNotificationComplete(payload));
    }
   
  } catch (e) {
    yield put(readNotificationComplete());
  }
}
export default function* authWatcher() {
  yield takeLatest(getUserNotifcationStart.type, fetchNotificationsWatcher);
  yield takeLatest(deleteNotificationStart.type, deleteNotificationsWatcher);
  yield takeLatest(readNotificationStart.type, readNotifiationsWatcher);
}




