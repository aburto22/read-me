interface ISvgProps {
  name: string;
  className?: string;
  stroke?: number;
}

interface ISvgObj {
  [key: string]: JSX.Element;
}

const Svg = ({
  name,
  className = "h-6 w-6",
  stroke = 1,
}: ISvgProps): JSX.Element => {
  const svgObj: ISvgObj = {
    close: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    menu: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    ),
    mail: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    checkCircle: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    arrowRight: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
    arrowLeft: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
        />
      </svg>
    ),
    chevronDown: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    ),
    chevronUp: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ),
    github: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={className}
        viewBox="0 0 16 16"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
    freeCodeCamp: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 700.08435 482.89237"
        fill="currentColor"
      >
        <path
          transform="translate(0,-569.46988)"
          d="m 117.51293,1051.6318 c -12.14837,-2.9002 -29.728148,-18.1522 -49.221868,-42.7042 c -39.570999,-49.83893 -61.0574994,-105.73952 -67.38493937,-175.31253 c -1.21782,-13.3906 -1.20559,-47.2689 0.0216,-59.6663 c 5.78590997,-58.45296 26.23995037,-108.79162 63.77079937,-156.94389 c 11.49299,-14.74558 30.54062,-34.06267 39.663438,-40.22459 c 12.90812,-8.71862 21.03329,-9.42362 28.83032,-2.50149 c 3.18001,2.82319 3.91138,4.13656 4.31868,7.75537 c 0.7669,6.81375 -2.72585,12.13801 -18.96746,28.91356 c -22.696898,23.44307 -33.167868,36.49307 -44.766288,55.79234 c -26.338069,43.82543 -37.608569,89.91434 -35.992979,147.1875 c 0.86072,30.51293 4.12574,53.0042 11.32601,78.01991 c 6.48504,22.53075 14.26864,40.69688 25.924939,60.50619 c 11.70369,19.8898 21.53849,32.4739 41.204948,52.72393 c 17.25351,17.7655 21.53909,23.9358 21.53909,31.0118 c 0,7.0391 -4.96843,13.4053 -11.98224,15.3532 c -3.87451,1.0761 -4.13811,1.0789 -8.284,0.089 z m 455.44089,0.2665 c -3.6719,-0.7795 -10.2381,-7.8414 -10.9785,-11.8072 c -1.1931,-6.3904 2.6087,-12.0821 20.332,-30.4391 c 8.7214,-9.0333 19.4526,-20.90733 23.8469,-26.38683 c 32.1524,-40.09154 50.0156,-84.70127 54.7815,-136.80559 c 1.4691,-16.06232 0.7096,-57.4481 -1.3391,-72.96716 c -4.2915,-32.50699 -12.2125,-59.101 -25.932,-87.06485 c -13.128,-26.75819 -26.7099,-45.73656 -49.6485,-69.375 c -15.4037,-15.87371 -19.9446,-21.67017 -21.493,-27.43577 c -1.5177,-5.65161 -0.4267,-9.8484 3.8122,-14.66398 c 5.8143,-6.60538 12.4561,-7.1946 22.8501,-2.02712 c 12.5814,6.25493 28.8861,22.58937 47.8125,47.89962 c 38.0781,50.92197 57.7171,106.94211 62.4372,178.10225 c 4.0104,60.46144 -10.6568,121.66332 -41.3038,172.3482 c -21.1547,34.98623 -53.4295,70.83673 -70.6155,78.43883 c -4.4918,1.987 -10.9367,2.9534 -14.562,2.1837 z m -380.08337,-36.8677 c -10.28745,-3.1184 -16.25136,-13.4004 -13.77065,-23.74113 c 1.53405,-6.3947 7.95351,-12.9693 14.1986,-14.5418 c 6.29118,-1.5842 331.73282,-1.5842 338.02402,0 c 6.4375,1.6209 12.762,8.2164 14.1687,14.7756 c 1.8436,8.59633 -2.0197,17.39503 -9.5253,21.69413 l -3.9679,2.2727 l -168.28125,0.159 c -92.55469,0.088 -169.43548,-0.1909 -170.84622,-0.6185 z m 128.18997,-79.10931 c -31.25226,-11.36715 -57.25414,-33.51988 -70.56464,-60.11872 c -7.39978,-14.78724 -11.69506,-32.69699 -11.69168,-48.75 c 0.005,-21.70289 8.49132,-42.38356 34.34641,-83.69612 c 19.25748,-30.77058 22.53856,-36.37804 28.2009,-48.19613 c 7.53515,-15.72687 10.01962,-25.06764 10.17751,-38.264 c 0.15089,-12.61133 -1.7391,-20.09344 -7.5478,-29.88024 c -4.12329,-6.94714 -13.3994,-17.40446 -17.16656,-19.35253 c -6.13981,-3.17502 -7.41241,-7.48767 -3.05249,-10.3444 c 6.89544,-4.51807 25.73535,-1.65272 43.04416,6.54654 c 19.58504,9.27752 34.01993,22.59896 43.41986,40.07061 c 7.2448,13.46592 10.1658,23.78505 15.07964,53.27252 c 5.45287,32.72211 10.85838,43.10388 21.78902,41.84779 c 5.79215,-0.66561 9.40698,-2.86376 11.84605,-7.20349 c 3.88524,-6.91287 2.21986,-16.37519 -5.638,-32.03379 c -6.42005,-12.79345 -6.0227,-16.65931 1.50762,-14.66788 c 3.90047,1.03149 16.5567,11.36919 25.31937,20.68104 c 21.92392,23.29795 32.83524,44.46488 38.0824,73.87633 c 2.75216,15.42644 2.98126,41.00657 0.48698,54.375 c -3.14675,16.86545 -9.52427,32.78449 -18.58816,46.39825 c -10.10669,15.18002 -31.19068,34.38621 -46.51897,42.37585 c -6.92209,3.60805 -9.32469,3.82678 -12.71769,1.15785 c -4.22027,-3.31967 -3.32896,-5.62767 6.0003,-15.53749 c 14.01697,-14.88926 21.17338,-25.47392 25.32527,-37.45728 c 6.40578,-18.48865 3.21723,-44.26491 -7.50796,-60.69426 c -4.44225,-6.80483 -10.95335,-12.80542 -13.89487,-12.80542 c -1.6103,0 -1.34313,2.12472 1.64246,13.06159 c 1.04617,3.83232 1.90212,8.51603 1.90212,10.40824 c 0,10.00778 -14.12604,17.26255 -26.56914,13.64525 c -10.11201,-2.93965 -14.56941,-12.11029 -13.23012,-27.21961 c 0.41387,-4.66907 0.78411,-13.15351 0.82275,-18.8543 c 0.0682,-10.05201 -0.0289,-10.56052 -3.21099,-16.83594 c -6.2022,-12.2312 -20.54678,-24.83023 -28.27035,-24.83023 c -3.33075,0 -3.60465,0.20129 -3.60465,2.64908 c 0,1.64378 0.92404,3.51158 2.43498,4.92188 c 8.00106,7.46811 9.50696,22.7712 3.57025,36.28131 c -3.66922,8.35 -7.80677,13.07915 -21.93727,25.07385 c -18.59248,15.78227 -24.58362,23.29724 -28.29903,35.49682 c -1.71871,5.64339 -1.89614,7.93993 -1.4124,18.28125 c 0.81216,17.36174 4.35055,28.87034 12.62068,41.04864 c 6.34961,9.35021 13.78457,15.28248 23.88216,19.05527 c 4.85612,1.81441 5.39063,2.28304 5.39063,4.72627 c 0,2.83211 -2.15357,4.69364 -5.329,4.60634 c -0.93624,-0.026 -5.49913,-1.42784 -10.13975,-3.11574 z"
        />
      </svg>
    ),
    moon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    ),
    moon_full: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    ),
    sun: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    double_arrow_right: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M13 5l7 7-7 7M5 5l7 7-7 7"
        />
      </svg>
    ),
    double_arrow_left: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        />
      </svg>
    ),
    trash: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
    edit: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stroke}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  };

  return svgObj[name];
};

export default Svg;
