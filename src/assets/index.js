//Icons for product pages
import {
  ChartBarIcon,
  LifebuoyIcon,
  LightBulbIcon,
  PresentationChartBarIcon,
  TrophyIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
//Main page logos
import hivetechLogo from './hivetech-logo.png';
import logo from './hivetech.svg';
//Images of product logos
import {
  default as al,
  default as bbm,
  default as cfo,
  default as fcva,
  default as sa,
  default as ss,
} from './hivetech.svg';
//Images of product logos with text
import {
  default as al_with_text,
  default as bbm_with_text,
  default as cfo_with_text,
  default as fcva_with_text,
  default as sa_with_text,
  default as ss_with_text,
} from './hivetech-logo.png';
//Sidebar
import close from './close.svg';
import menu from './menu.svg';
//BBM
import BBMCircle from './BBM Circle.png';
import BBMOne from './DatabaseBBM.jpg';
import BBMLogo from './hivetech.svg';
//AL
import ALCircles from './AL 2.png';
import Pipes from './AL 3.png';
import ALLogo from './hivetech.svg';
//CFO
import CFODisk from './CFO Benefits.png';
import CFOSwirl from './CFO swirl.png';
import CFOLogo from './hivetech.svg';
//FCVA
import FCVAOne from './FCVA 1.png';
import FCVALast from './FCVA last.png';
import FCVALogo from './hivetech.svg';
//SA
import SAFirst from './SA 1.png';
import SALast from './SA last.png';
import SALogo from './hivetech.svg';
//SS
import SSFirst from './SA 1.png';
import SSLast from './SA last.png';
import SSLogo from './hivetech.svg';
//BBM page content
export const BBM = [
  {
    id: 'home',
    color: '#4e73dd',
    title: 'DataBenchmark Pro',
    logo: BBMLogo,
  },
  {
    id: 'analytics',
    color: '#4e73dd',
    img: BBMOne,
  },
  {
    id: 'features',
    feature: [
      {
        icon: ChartBarIcon,
      },
      {
        icon: TrophyIcon,
      },
      {
        icon: PresentationChartBarIcon,
      },
      {
        icon: LifebuoyIcon,
      },
    ],
    img: BBMCircle,
    logo: BBMLogo,
  },
];
//AL page content
export const AL = [
  {
    id: 'home',
    color: '#4e6856',
    title: 'VehicleVision Analytics',
    logo: ALLogo,
  },
  {
    id: 'analytics',
    color: '#4e6856',
    img: Pipes,
  },
  {
    id: 'features',
    feature: [
      {
        icon: ChartBarIcon,
      },
      {
        icon: TrophyIcon,
      },
      {
        icon: PresentationChartBarIcon,
      },
      {
        icon: LightBulbIcon,
      },
      {
        icon: UsersIcon,
      },
      {
        icon: LifebuoyIcon,
      },
    ],
    img: ALCircles,
  },
];
//CFO page content
export const CFO = [
  {
    id: 'home',
    color: '#51adad',
    title: 'FinanceFocus Navigator',
    logo: CFOLogo,
  },
  {
    id: 'analytics',
    color: '#51adad',
    img: CFODisk,
  },
  {
    id: 'features',
    feature: [
      {
        icon: ChartBarIcon,
      },
      {
        icon: ChartBarIcon,
      },
      {
        icon: TrophyIcon,
      },
      {
        icon: PresentationChartBarIcon,
      },
      {
        icon: LifebuoyIcon,
      },
      {
        icon: LifebuoyIcon,
      },
      {
        icon: LifebuoyIcon,
      },
    ],
    img: CFOSwirl,
  },
];
//FCVA page content
export const FCVA = [
  {
    id: 'home',
    color: '#8fbc55',
    title: 'FinanceGuard Assistant',
    logo: FCVALogo,
  },
  {
    id: 'analytics',
    color: '#8fbc55',
    img: FCVAOne,
  },
  {
    id: 'features',
    feature: [
      {
        icon: ChartBarIcon,
      },
      {
        icon: ChartBarIcon,
      },
      {
        icon: PresentationChartBarIcon,
      },
      {
        icon: LifebuoyIcon,
      },
    ],
    img: FCVALast,
  },
];
//SA page content
export const SA = [
  {
    id: 'home',
    color: '#46237a',
    title: 'SellMetrics Pro',
    logo: SALogo,
  },
  {
    id: 'analytics',
    color: '#46237a',
    img: SAFirst,
  },
  {
    id: 'features',
    feature: [
      {
        icon: ChartBarIcon,
      },
      {
        icon: ChartBarIcon,
      },
      {
        icon: TrophyIcon,
      },
      {
        icon: PresentationChartBarIcon,
      },
      {
        icon: LifebuoyIcon,
      },
      {
        icon: LifebuoyIcon,
      },
    ],
    img: SALast,
  },
];
//SS page content
export const SS = [
  {
    id: 'home',
    color: '#06B6D4',
    intro: 'Real Time Optimization Of The Inventory Against Both Supply-chain And Market Demand',
    title: 'SecureTransmit',
    attributes: 'Fast, flexible financing for',
    list_attributes: ['SIZE', 'PERF', 'EQ', 'QQ'],
    text: 'SellMetrics Pro OFFERS AN ANALYTICAL PERSPECTIVE ON KEY SALES METRICS',
    logo: SSLogo,
  },
  {
    id: 'analytics',
    color: '#06B6D4',
    intro: 'SecureTransmit',
    title: ' sample title',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus possimus similique, blanditiis, quidem amet, aspernatur nihil voluptatibus debitis dicta accusantium earum! Assumenda vel laborum, similique doloremque ipsa a magni officia.',
    img: SSFirst,
  },
  {
    id: 'features',
    title: 'SellMetrics Pro OFFERS AN INTUITIVE DASHBOARD OF THE SALES GOALS STREAMLINING FAST DECISION MAKING',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi itaque voluptatibus temporibus enim et, maxime vel ex veritatis ratione iste, harum reprehenderit consequuntur nemo quas rerum nostrum dolore accusamus praesentium.',
    feature: [
      {
        title: 'TO BOOST',
        text: 'Sale performance by identifying missed up-sell and cross-sell opportunities',
        icon: ChartBarIcon,
      },
      {
        title: 'TO IDENTIFY',
        text: 'Those products that sell best and bring most value',
        icon: ChartBarIcon,
      },
      {
        title: 'TO PROFILE',
        text: 'Those clients that bring you most value ',
        icon: TrophyIcon,
      },
      {
        title: 'TO ASSESS',
        text: 'Where you are from a target sales performance. How far away you are from the reference point chosen as a benchmark in the analysis',
        icon: PresentationChartBarIcon,
      },
      {
        title: 'TO REPORT',
        text: 'In an intuitive and dynamic format the sales performance against company objectives',
        icon: LifebuoyIcon,
      },
      {
        title: 'TO DECIDE',
        text: 'In advance, based on relevant data and information, the corrective actions necessary to ensure the desired sales performance course and the achievement of the assumed objectives',
        icon: LifebuoyIcon,
      },
    ],
    img: SSLast,
  },
];
//Product data for Navigation bar and product display
export const productData = [
  {
    id: 'bbm',
    title: 'DataBenchmark Pro',
    color: '#4e73dd',
    link: '/dataBenchmark-pro',
    icon: bbm,
    icon_with_text: bbm_with_text,
  },
  {
    id: 'al',
    title: 'VehicleVision Analytics',
    color: '#4e6856',
    link: '/vehicleVision-analytics',
    icon: al,
    icon_with_text: al_with_text,
  },
  {
    id: 'cfo',
    title: 'FinanceFocus Navigator',
    color: '#51adad',
    link: '/financefocus-navigator',
    icon: cfo,
    icon_with_text: cfo_with_text,
  },
  {
    id: 'fcva',
    title: 'FinanceGuard Assistant',
    color: '#8fbc55',
    link: '/financeguard-assistant',
    icon: fcva,
    icon_with_text: fcva_with_text,
  },
  {
    id: 'sa',
    title: 'SellMetrics Pro',
    color: '#46237a',
    link: '/sellmetrics-pro',
    icon: sa,
    icon_with_text: sa_with_text,
  },
  {
    id: 'ss',
    title: 'SecureTransmit',
    color: '#06B6D4',
    link: '/securetransmit',
    icon: ss,
    icon_with_text: ss_with_text,
  },
];
// Export Hivetech logo and Sidebar menu and close images
export { close, hivetechLogo, logo, menu };
