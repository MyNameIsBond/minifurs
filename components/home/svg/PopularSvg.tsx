import Svg, { Path } from "react-native-svg";
import { SVGProps } from "../../../types/svgtypes";

const SvgComponent = ({ width, height, ...props }: SVGProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      d="M11.549.927c.3-.921 1.603-.921 1.902 0l2.08 6.401a1 1 0 0 0 .951.691h6.73c.97 0 1.372 1.24.588 1.81l-5.445 3.955a1 1 0 0 0-.363 1.118l2.08 6.402c.3.921-.755 1.687-1.539 1.118l-5.445-3.956a1 1 0 0 0-1.176 0l-5.445 3.956c-.784.57-1.838-.197-1.539-1.118l2.08-6.401a1 1 0 0 0-.363-1.119L1.2 9.828c-.784-.57-.381-1.809.587-1.809h6.731a1 1 0 0 0 .951-.69L11.55.926Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
