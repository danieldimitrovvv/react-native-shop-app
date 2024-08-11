import CircularProgress from "react-native-circular-progress-indicator";
import { greyColor } from "../styles/colors";

type Props = {
  title: string;
  color?: string;
  value: number;
  maxValue: number;
  radius?: number;
};

export default function CircularComponent({
  title,
  value,
  color = "white",
  maxValue = 100,
  radius = 80,
}: Props) {
  let percentage = (value / maxValue) * 100;
  percentage = Math.floor(percentage * 10) / 10; // format

  return (
    <CircularProgress
      value={value}
      radius={radius}
      duration={2000}
      progressValueColor={color}
      activeStrokeColor={color}
      inActiveStrokeColor={greyColor.main.value}
      maxValue={maxValue}
      title={title}
      titleColor={color}
      titleStyle={{ fontWeight: "bold" }}
    />
  );
}
