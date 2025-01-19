import { reactIcons } from "./icons";



export const links = [
  {
    path: ".",
    title: "Dashboard",
    icon: reactIcons.home,
  },
  {
    path: "users",
    title: "Users",
    icon: reactIcons.users,
  },
  {
    path: "quiz",
    title: "Quiz List",
    icon: reactIcons.list,
  },




];
export const colorsOptions = [
  '#c4b5fd',
  '#bef264',
  '#fbbf24',
  '#7dd3fc',
  '#5eead4',
  '#fca5a5',
  '#f9a8d4',
  '#fde047',
  '#a3e635'
]
export const sortBy = [
  { id: 1, value: '', name: 'Sort By', },
  { id: 2, value: 'desc', name: 'High to low', },
  { id: 3, value: 'asc', name: 'Low to high', },

]
export const BANNERS_VALUE = {
  homeBanner: 'Home homeBanner'
}
export const BANNERS_VALUES_ONLY = {
  homeBanner: 'homeBanner'
}
export const bannerTypes = [
  { id: 1, value: '', label: 'Select Banner Type', },
  { id: 2, value: BANNERS_VALUE.homeBanner, label: 'Home Banner', },

]


export const getUserToken = () => {
  return localStorage.getItem("loginToken")
}
export const getIsNewNotification = () => {
  return localStorage.getItem('isNewNotification')
}

export const RoleConstant = {
  WicketKeeper: "WicketKeeper",
  Batsman: "Batsman",
  AllRounder: "All-Rounder",
  Bowler: "Bowler",
}
export const DesignationConstant = {
  C: "C",
  VC: "VC",
  None: "None",
}
export const ACTIVE_TYPE = {
  deposit: 'Deposit',
  withdraw: 'Withdraw',
}
export const TRANSACTION_STATUS = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
}

export const answerObj = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D'
}



