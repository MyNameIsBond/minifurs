import Svg, { Path } from "react-native-svg";
import { SVGProps } from "../../../types/svgtypes";

const SvgComponent = ({ width, height, ...props }: SVGProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      d="M25.667 5.867H25.2V2.6A2.336 2.336 0 0 0 22.867.267H5.133A2.336 2.336 0 0 0 2.8 2.6v3.267h-.467A2.336 2.336 0 0 0 0 8.2v7.467A2.336 2.336 0 0 0 2.333 18H2.8v3.267c0 .257.209.466.467.466H4.2c.195 0 .369-.12.437-.303L5.923 18h16.154l1.286 3.43a.467.467 0 0 0 .437.303h.933a.467.467 0 0 0 .467-.466V18h.467A2.336 2.336 0 0 0 28 15.667V8.2a2.336 2.336 0 0 0-2.333-2.333ZM3.733 2.6a1.4 1.4 0 0 1 1.4-1.4h17.734a1.4 1.4 0 0 1 1.4 1.4v3.267h-1.4a.467.467 0 0 0-.467.466v5.134H5.6V6.333a.467.467 0 0 0-.467-.466h-1.4V2.6Zm-2.8 5.6a1.4 1.4 0 0 1 1.4-1.4h2.334v4.667H.933V8.2Zm2.944 12.6h-.144V18h1.194l-1.05 2.8Zm20.39 0h-.144l-1.05-2.8h1.194v2.8Zm2.8-5.133a1.4 1.4 0 0 1-1.4 1.4H2.333a1.4 1.4 0 0 1-1.4-1.4V12.4h26.134v3.267Zm0-4.2h-3.734V6.8h2.334a1.4 1.4 0 0 1 1.4 1.4v3.267Z"
      fill="#909090"
    />
  </Svg>
);

export default SvgComponent;