import Svg, { Path } from "react-native-svg";
import { SVGProps } from "../../../types/svgtypes";

const SvgComponent = ({ width, height, ...props }: SVGProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      d="M27.563.938H.438A.438.438 0 0 0 0 1.375V4c0 .242.196.438.438.438H1.75v16.187c0 .242.196.438.438.438h1.75a.438.438 0 0 0 .437-.438V4.437h19.25v16.188c0 .242.196.438.438.438h1.75a.438.438 0 0 0 .437-.438V4.437h1.313A.438.438 0 0 0 28 4V1.375a.438.438 0 0 0-.438-.438Zm-.438 2.625h-1.313a.438.438 0 0 0-.437.437v16.188H24.5V4a.438.438 0 0 0-.438-.438H3.938A.438.438 0 0 0 3.5 4v16.188h-.875V4a.438.438 0 0 0-.438-.438H.875v-1.75h26.25v1.75Z"
      fill="#909090"
    />
  </Svg>
);

export default SvgComponent;
