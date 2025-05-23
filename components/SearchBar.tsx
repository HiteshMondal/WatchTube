import { icons } from "@/constants/icons";
import { useRef } from "react";
import { Image, TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress, ...rest }: Props) => {
  const inputRef = useRef<TextInput | null>(null);

  const handlePress = () => {
    // Focus the TextInput on press
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (onPress) {
      onPress(); // Execute any additional onPress action
    }
  };

  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        ref={inputRef}
        onPressIn={handlePress}  // Ensure it focuses on press
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
        {...rest}
      />
    </View>
  );
};

export default SearchBar;
