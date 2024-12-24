import { reactIcons } from "./icons";
export const navbarLinks = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/strategy",
    title: "Strategy",
  },
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/pricing",
    title: "Pricing",
  },
  {
    path: "/contact",
    title: "Contact Us",
  },

]
export const userMenuLinks = [
  {
    path: "/user/dashboard",
    title: "Dashboard",
    icon: reactIcons.home

  },
  {
    path: "/user/markets",
    title: "Markets",
    icon: reactIcons.chart
  },
  {
    path: "/user/net-position",
    title: "Net Position",
    icon: reactIcons.giChart
  },

  {
    path: "/user/portfolio",
    title: "Portfolio",
    icon: reactIcons.list
  },
  {
    path: "/user/funds",
    title: "Funds",
    icon: reactIcons.money
  },




]
export const pathsRequireToggle = navbarLinks?.filter(item => item !== '/')?.map(item => item?.path)
export const homeSection2Data = [
  {
    img: "/images/s21.png",
    title: "Best Profitable Strategies to Deploy",
    description: 'When it comes to trading strategies, there are thousands of trade systems are available on the internet and they all work specific market conditions.'
  },
  {
    img: "/images/s22.png",
    title: "Backtesting",
    description: 'Algorithmic trading is a form of automated investing that lets you test your strategies before putting real money on the line. This gives traders to judge whether their strategy will work or not.'
  },
  {
    img: "/images/s23.png",
    title: "Emotionless Trading",
    description: 'To minimize the emotional strain on traders, algo trading systems keep their emotions in control and allow them to follow a strategy more easily.'
  },
  {
    img: "/images/s24.png",
    title: "Easy to Start",
    description: 'Algo trading is programmed to take trades on your behalf according to predetermined set of rules and automatically updated in real-time.'
  },


]

export const homeSection7Data = [
  {
    img: "/images/s71.png",
    title: "Risk Manager",
    description: 'Algo system detects false signal generations and ensures risk free trading.'
  },
  {
    img: "/images/s72.png",
    title: "Momentum Meter",
    description: 'An incredibly useful tool that will allow you to see the strength of trading symbols, which will give you market directions.'
  },
  {
    img: "/images/s73.png",
    title: "Naked Trading Option",
    description: 'A brilliantly simple but powerful tool identify opportunities in the future underlying and places the orders in the option contract like (ATM/ITM/ OTM).'
  },
  {
    img: "/images/s74.png",
    title: "Support & Resistance",
    description: 'Take away the guess work with our custom built tool know exactly where to draw your key areas & demand.'
  },


]
export const homeSection5Data = [
  {
    img: "/images/s51.png",
    title: "Get Started",
    description: 'Initiate by signing up or logging in to your account.'
  },
  {
    img: "/images/s52.png",
    title: "Select a Plan",
    description: 'Pick the right Algotrons Securities subscription plan for yourself.'
  },
  {
    img: "/images/s53.png",
    title: "Add a Broker",
    description: 'Add a suitable broker to your Algotrons Securities account.',
    description2: 'Open a new Demat account with us.'
  },
  {
    img: "/images/s54.png",
    title: "Select Strategy",
    description: 'Pick from a diverse range of strategies. Ensure that the investment size & risk factor matches your requirement'
  },
  {
    img: "/images/s55.png",
    title: "Start Trading",
    description: 'Ready, Set, Start Trading with a click of a button.'
  },
]

export const homeSection8Data = [
  {
    img: "/images/s81.svg",
    title: "Auto Login Features",
    description: 'You need not to worry about Login your trading account & connect with Algo platform daily. We provide Auto Login Feature as well so that access token will generate automatically daily.'
  },
  {
    img: "/images/s82.svg",
    title: "Competitive Pricing",
    description: 'We provide cheapest price possible for traders & Pricing plan for every level of dreams .'
  },
  {
    img: "/images/s83.svg",
    title: "Real time Execution",
    description: 'We provide real time execution of trades equipped by live trading data.',
  },
  {
    img: "/images/s84.svg",
    title: "Security",
    description: 'Our Platform works without direct access to your trading account to access your fund, it is totally in your control.'
  },
  {
    img: "/images/s85.svg",
    title: "Fast and Seamless",
    description: 'You can place multiple orders at lightning speed with our advanced Algo trading software.'
  },
]


export const homeSection6Data = [
  {
    img: "/images/s61.png",
    title: "Diversification",
    description: 'Use your funds across trades with different trading strategies.'
  },
  {
    img: "/images/s62.png",
    title: "Risk Management",
    description: 'Choose your risk level for each strategy you follow.'
  },
  {
    img: "/images/s63.png",
    title: "Passive Income Strategies",
    description: 'Utilize your Capital to generate a Second source of Income and enjoy profits.',
  },
  {
    img: "/images/s64.png",
    title: "Total Security",
    description: 'Our Platform works without direct access to your funds.'
  },
  {
    img: "/images/s65.png",
    title: "Skin in the game",
    description: 'Traders risk their own funds when providing trades for copying.'
  },
  {
    img: "/images/s66.png",
    title: "Synced Portfolio",
    description: 'Align demat assets with the trader’s account in one click.'
  },


]


export const aboutInfo = [
  {
    icon: reactIcons.users,
    number: '1000k+',
    title: 'signups'
  },
  {
    icon: reactIcons.chart,
    number: '101k+',
    title: 'algos'
  },
  {
    icon: reactIcons.giChart,
    number: '500k+',
    title: 'live trades daily'
  },
  {
    icon: reactIcons.safety,
    number: '100+',
    title: 'broker APIs connected'
  },

]

export const pricingFeatures = [
  'No. of Private Strategies you can create',
  'No. of Public Strategies you can create',
  'No. of algo strategies you can deploy',
  'No. of stockbag you can deploy',
  'Paper Trading Executions',
  'Live-Auto Executions',
  'Trade execution notifications',
  'API to connect from other platforms',
  ''
]
export const pricingFeaturesList = [
  {
    title: 'Free',
    price: '0',
    list: [
      {
        type: 'string',
        value: '10',
      },
      {
        type: 'icon',
        value: reactIcons.close
      },
      {
        type: 'string',
        value: '1'
      },
      {
        type: 'string',
        value: '1'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'icon',
        value: reactIcons.close
      },
      {
        type: 'string',
        value: 'Email'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      }
    ]
  },
  {
    title: 'Starter',
    price: '3000',
    list: [
      {
        type: 'string',
        value: 'Unlimited',
      },
      {
        type: 'string',
        value: 'Unlimited O on maketplace',
      },
      {
        type: 'string',
        value: '1'
      },
      {
        type: 'string',
        value: '1'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'string',
        value: 'Email , WhatsApp, SMS,'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
    ]
  },
  {
    title: 'Retail',
    price: '12000',
    list: [
      {
        type: 'string',
        value: 'Unlimited',
      },
      {
        type: 'string',
        value: 'Unlimited O on maketplace',
      },
      {
        type: 'string',
        value: '5'
      },
      {
        type: 'string',
        value: '2'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'string',
        value: 'Email , WhatsApp, SMS,'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
    ]
  },
  {
    title: 'Retail+',
    price: '25000',
    list: [
      {
        type: 'string',
        value: 'Unlimited',
      },
      {
        type: 'string',
        value: 'Unlimited O on maketplace',
      },
      {
        type: 'string',
        value: '12'
      },
      {
        type: 'string',
        value: '4'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'string',
        value: 'Email , WhatsApp, SMS,'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
    ]
  },
  {
    title: 'Creator',
    price: '50000',
    list: [
      {
        type: 'string',
        value: 'Unlimited',
      },
      {
        type: 'string',
        value: 'Unlimited 5 on maketplace',
      },
      {
        type: 'string',
        value: '25'
      },
      {
        type: 'string',
        value: '8'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'string',
        value: 'Email , WhatsApp, SMS,'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
    ]
  },
  {
    title: 'Creator+',
    price: '150000',
    list: [
      {
        type: 'string',
        value: 'Unlimited',
      },
      {
        type: 'string',
        value: 'Unlimited 20 on maketplace',
      },
      {
        type: 'string',
        value: '100'
      },
      {
        type: 'string',
        value: '16'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
      {
        type: 'string',
        value: 'Email , WhatsApp, SMS,'
      },
      {
        type: 'icon',
        value: reactIcons.check,
        isCheck: true
      },
    ]
  }
]
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
    path: "transactions",
    title: "Transactions",
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

export const STRATEGIES = [
  {
    time: '2 months ago',
    count: '94',
    title: 'Hybrid Index Strategy',
    description: 'Hybrid Index StrategyThe Hybrid Index Strategy combines multiple BankNifty and Nifty strategies to address a range of market conditions with a focus',
    createdBy: 'Market Star',
    category: ['NFO', 'Volatility', 'BFO', 'EarnTheta'],
    tradeCost: '458 (₹ 9.2 K)',
    drawDown: '₹ 10.4 K (2%)',
    minCapital: '₹ 530 K',
    monthlyFee: 'Free',
  },
  {
    time: '2 years ago',
    count: '144',
    title: 'Dynamic Money miner Nifty',
    description: 'DMM (NF): This is a Nifty options writing strategy. The strategy adjusts its position dynamically based on market conditions. It involves taking two ',
    createdBy: 'Get Set Algo',
    category: ['NFO', 'Volatility', 'SupportResistance', 'SpendTheta'],
    tradeCost: '136 (₹ 2.7 K)',
    drawDown: '₹ 13.8 K (8%)',
    minCapital: '₹ 165 K',
    monthlyFee: 'Free',
  },
  {
    time: '2 years ago',
    count: '144',
    title: 'Class A Crude Oil Options Selling 1530 PM',
    description: 'Live Shared Code: df9a9185-eb84-4a0f-9520-ca8582d4ebd2Important NoteF&O trading involves substantial risk. If you expect returns exceeding 10-14% ',
    createdBy: 'Sachin Jain',
    category: [
      'MCX',
      'EarnTheta',
      'NonDirectional',
      'SupportResistance',
      'LowFrequency',
      'TechnicalAnalysis',
      'Bullish',
      'Bearish',
      'Range'],
    tradeCost: '218 (₹ 4.4 K)',
    drawDown: '₹ 8.3 K (2%)',
    minCapital: '₹ 550 K',
    monthlyFee: 'Free',
  },
  {
    time: '2 years ago',
    count: '144',
    title: 'Index Premium Eater',
    description: 'INDEX PREMIUM EATERThe Index Premium Eater combines SENSEX and Nifty indices to create a unique semi-directional intraday strategy. It begins at 9:16',
    createdBy: 'Market Star',
    category: [
      'NFO',
      'BFO',
      'EarnTheta',
      'TrendFollowing',
      'Volatility',
      'EventBased',
      'MarketNeutral',
      'Directional',
      'Pairs',
      'Bullish',
      'Bearish',
      'Momentum',
      'Intraday',
    ],
    tradeCost: '300 (₹ 6 K)',
    drawDown: '₹ 18.6 K (8%)',
    minCapital: '₹ 220 K',
    monthlyFee: 'Free',
  },
  {
    time: '2 years ago',
    count: '144',
    title: 'GSA Smart Straddle V2',
    description: 'BNF Smart Straddle v2: This is an options selling strategy focused on a single lot of BNF options with additional OTM hedges. The adjustments in this',
    createdBy: 'Get Set Algo',
    category: [
      'NFO',
    ],
    tradeCost: '232 (₹ 4.6 K)',
    drawDown: '₹ 12.1 K (8%)',
    minCapital: '₹ 150 K',
    monthlyFee: 'Free',
  },
  {
    time: '2 years ago',
    count: '144',
    title: 'Expiry Strategy',
    description: 'Expiry Strategy OverviewThe Expiry Strategy is designed to operate on multiple indices, with trades assigned by weekday:Monday: BankexTuesday: FinNift ',
    createdBy: 'Get Set Algo',
    category: [
      'NFO',
      'BFO',
      'Expiry Trading',
    ],
    tradeCost: '84 (₹ 1.7 K)',
    drawDown: '₹ 3.9 K (16%)',
    minCapital: '₹ 25 K',
    monthlyFee: 'Free',
  },
  {
    time: '2 years ago',
    count: '100',
    title: 'Omega NIFTY INTRADAY',
    description: 'This stratagy for persons who want earn small profit with small capital.join our TG channel for more info.',
    createdBy: 'Omega Win Algos',
    category: [
      'NFO',
      'Volatility',
      'Momentum',
      'Intraday',
      'Scalping',
    ],
    tradeCost: '405 (₹ 8.1 K)',
    drawDown: '₹ 2.4 K (33%)',
    minCapital: '₹ 7.5 K',
    monthlyFee: 'Free',
  }
]

