import Svg, { Path, SvgProps } from "react-native-svg";

const SvgComponent = ({ width, height, ...props }: SvgProps) => (
  <Svg {...props} width={28} height={20.125}>
    <Path
      data-name="Path 916"
      d="M27.563 0H.438A.438.438 0 0 0 0 .437v2.625a.438.438 0 0 0 .438.438H1.75v16.187a.438.438 0 0 0 .438.438h1.75a.438.438 0 0 0 .438-.437V3.5h19.25v16.187a.438.438 0 0 0 .438.438h1.75a.438.438 0 0 0 .438-.437V3.5h1.313A.438.438 0 0 0 28 3.062V.437A.438.438 0 0 0 27.563 0Zm-.437 2.625h-1.313a.438.438 0 0 0-.438.437V19.25H24.5V3.062a.438.438 0 0 0-.437-.437H3.938a.438.438 0 0 0-.438.437V19.25h-.875V3.062a.438.438 0 0 0-.437-.437H.875V.875h26.25Z"
      fill="#909090"
    />
  </Svg>
);

export default SvgComponent;
