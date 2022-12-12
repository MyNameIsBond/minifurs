import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";
import { SVGProps } from "../../../types/svgtypes";
const OfficeSvg = ({ width, height, ...props }: SVGProps) => (
  <Svg width={width} height={height} {...props}>
    <Defs>
      <ClipPath id="a">
        <Path data-name="Rectangle 777" fill="#fff" d="M0 0h28v28H0z" />
      </ClipPath>
    </Defs>
    <G data-name="Group 553" clipPath="url(#a)" fill="#606060">
      <Path
        data-name="Path 912"
        d="M11.693 19.114a7.96 7.96 0 0 0-7.951 7.951.935.935 0 0 0 .935.935h14.031a.935.935 0 0 0 .935-.935 7.96 7.96 0 0 0-7.95-7.951Zm-6.008 7.015a6.081 6.081 0 0 1 12.017 0Z"
      />
      <Path
        data-name="Path 913"
        d="M25.512 2.083a6.866 6.866 0 0 0-9.71 9.71.935.935 0 0 0 1.323 0l8.387-8.387a.935.935 0 0 0 0-1.323Zm-8.987 7.664a5 5 0 0 1 6.94-6.94Z"
      />
      <Path
        data-name="Path 914"
        d="M14.719.213a.934.934 0 0 0-1.237.043L2.507 10.639a.935.935 0 0 0-.026 1.334l8.543 8.73 1.337-1.309-7.878-8.05 9.685-9.162 1.638 1.347L17 2.084Z"
      />
    </G>
  </Svg>
);

export default OfficeSvg;
