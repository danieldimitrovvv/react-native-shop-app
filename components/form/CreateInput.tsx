import { TextInputProps } from "react-native-paper";
import { formStyles } from "../../styles/form";
import { TextInput } from "react-native";

export default function CreateInput(props: TextInputProps) {
  return (
    <TextInput
      style={formStyles.input}
      autoCorrect={false}
      autoCapitalize="none"
      {...props}
    />
  );
}
