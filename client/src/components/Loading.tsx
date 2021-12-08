import Svg from "./common/svg";

const Loading = (): JSX.Element => (
  <div className="xl:pt-navbar maxs-w-screen-sm mx-auto min-h-screen-navbar flex flex-col justify-around items-center">
    <Svg name="spinner" className="h-20 w-20 animate-spin" />
  </div>
);

export default Loading;
