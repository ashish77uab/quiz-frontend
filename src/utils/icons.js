import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaImage, FaMap, FaMoneyBill, FaUsers } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineMarkChatUnread, MdOutlineMarkChatRead } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa";
import {
  BiDollarCircle,
  BiEditAlt,
  BiHomeAlt2,
  BiInfoCircle,
  BiLogOutCircle,
  BiNotification,
  BiSearch,
  BiTrash,
} from "react-icons/bi";
import { HiOutlineSignal } from "react-icons/hi2";

import { IoIosArrowRoundBack, IoMdClose } from "react-icons/io";
import {
  BsCartCheck,
  BsCartX,
  BsCheckLg,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsFillBoxFill,
  BsFillCheckCircleFill,
  BsPlusLg,
  BsReply,
  BsThreeDotsVertical,
  BsWallet2,
} from "react-icons/bs";
import { HiOutlineChevronDown, HiChevronUp, HiMenu } from "react-icons/hi";
import {
  AiFillCamera,
  AiFillEye,
  AiFillEyeInvisible,
  AiFillHeart,
  AiFillLike,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineLike,
  AiOutlineMinus,
  AiOutlineStar,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaTrophy } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { FaPhone } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { GiChart } from "react-icons/gi";
import { AiOutlineSafety } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa6";
export const reactIcons = {
  userPlus: <FaUserPlus />,
  money: <FaMoneyBill />,
  whatsapp: <FaWhatsapp />,
  location: <FaMap />,
  chart: <IoBarChart />,
  safety: <AiOutlineSafety />,
  giChart: <GiChart />,
  plus: <CiCirclePlus />,
  minus: <CiCircleMinus />,
  trash: <BiTrash />,
  edit: <BiEditAlt />,
  eyeslash: <AiFillEyeInvisible />,
  eye: <AiFillEye />,
  arrowDown: <HiOutlineChevronDown />,
  arrowUp: <HiChevronUp />,
  unlike: <AiOutlineLike />,
  like: <AiFillLike />,
  check: <BsCheckLg />,
  camera: <AiFillCamera />,
  reply: <BsReply />,
  close: <IoMdClose />,
  heartFill: <AiFillHeart />,
  starFill: <AiFillStar />,
  starOutline: <AiOutlineStar />,
  heartOutline: <AiOutlineHeart />,
  home: <BiHomeAlt2 />,
  logout: <BiLogOutCircle />,
  list: <AiOutlineUnorderedList />,
  arrowleft: <BsChevronLeft />,
  arrowright: <BsChevronRight />,
  arrowdown: <BsChevronDown />,
  success: <BsFillCheckCircleFill />,
  info: <BiInfoCircle />,
  delete: <FiTrash2 />,
  search: <BiSearch />,
  menu: <HiMenu />,
  threeDots: <BsThreeDotsVertical />,
  eyes: <AiFillEye />,
  goback: <IoIosArrowRoundBack />,
  star: <AiOutlineStar />,
  profit: <BiDollarCircle />,
  vault: <BsWallet2 />,
  product: <BsFillBoxFill />,
  cart: <BsCartCheck />,
  emptyCart: <BsCartX />,
  inventory: <MdOutlineInventory />,
  gallery: <FaImage />,
  users: <FaUsers />,
  notification: <IoNotificationsOutline />,
  read: <MdOutlineMarkChatRead />,
  unread: <MdOutlineMarkChatUnread />,
  dotFill: <GoDotFill />,
  chat: <IoChatbubbleEllipsesOutline />,
  plane: <FaPaperPlane />,
  live: <HiOutlineSignal />,
  prize: <FaTrophy />,
  reset: <GrPowerReset />,
  mobile: <FaPhone />,
  email: <FaEnvelope />,
};
