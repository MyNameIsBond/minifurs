import Svg, { Path, SvgProps } from "react-native-svg";

const SvgComponent = ({ width, height, ...props }: SvgProps) => (
  <Svg {...props} width={18} height={18} fill="none">
    <Path
      d="M8.549.927c.3-.921 1.603-.921 1.902 0l1.406 4.328a1 1 0 0 0 .952.691h4.55c.97 0 1.372 1.24.588 1.81l-3.682 2.674a1 1 0 0 0-.363 1.118l1.407 4.329c.299.921-.756 1.687-1.54 1.118l-3.681-2.675a1 1 0 0 0-1.176 0L5.23 16.995c-.783.57-1.838-.197-1.538-1.118l1.406-4.329a1 1 0 0 0-.363-1.118L1.053 7.755c-.784-.57-.381-1.809.588-1.809h4.55a1 1 0 0 0 .952-.69L8.549.926Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
