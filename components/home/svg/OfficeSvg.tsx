import Svg, { Path, SvgProps } from "react-native-svg";

const OfficeSvg = ({ width, height, ...props }: SvgProps) => (
  <Svg {...props} width={20} height={22} fill="none">
    <Path
      d="m13.5 21 5.5-8L9 5m8 16H4m2.5 0v-2M1 5l5 5 4-7-2-2-7 4Z"
      stroke="#909090"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default OfficeSvg;
