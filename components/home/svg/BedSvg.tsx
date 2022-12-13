import Svg, { Path, SvgProps } from "react-native-svg";

const SvgComponent = ({ width, height, ...props }: SvgProps) => (
  <Svg {...props} width={27.125} height={19.25}>
    <Path
      data-name="Path 918"
      d="M26.687 14.438h-.437v-3.5a1.752 1.752 0 0 0-1.75-1.75V1.75A1.752 1.752 0 0 0 22.75 0H4.375a1.752 1.752 0 0 0-1.75 1.75v7.438a1.752 1.752 0 0 0-1.75 1.75v3.5H.437a.437.437 0 0 0-.437.438v1.749a.437.437 0 0 0 .438.438h.438v1.75a.437.437 0 0 0 .438.438h1.311a.437.437 0 0 0 .429-.352l.368-1.836h20.281l.368 1.836a.437.437 0 0 0 .429.352h1.312a.437.437 0 0 0 .438-.437v-1.75h.438a.437.437 0 0 0 .437-.439v-1.75a.437.437 0 0 0-.437-.437ZM3.5 1.75a.876.876 0 0 1 .875-.875H22.75a.876.876 0 0 1 .875.875v7.438h-.875v-1.75A1.752 1.752 0 0 0 21 5.688h-5.25A1.752 1.752 0 0 0 14 7.438v1.75h-.875v-1.75a1.752 1.752 0 0 0-1.75-1.75h-5.25a1.752 1.752 0 0 0-1.75 1.75v1.75H3.5Zm18.375 5.688v1.75h-7v-1.75a.876.876 0 0 1 .875-.875H21a.876.876 0 0 1 .875.875Zm-9.625 0v1.75h-7v-1.75a.876.876 0 0 1 .875-.875h5.25a.876.876 0 0 1 .875.875Zm-10.5 3.5a.876.876 0 0 1 .875-.875H24.5a.876.876 0 0 1 .875.875v3.5H1.75Zm.512 7.437H1.75v-1.312h.779Zm23.109 0h-.509l-.262-1.312h.779Zm.875-2.187H.875v-.875H26.25Z"
      fill="#909090"
    />
  </Svg>
);

export default SvgComponent;
