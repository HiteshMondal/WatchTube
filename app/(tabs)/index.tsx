import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <Image source={images.bg} className="absolute size-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-4 mb-5 mx-auto" />
        {/* Add content here */}
      </ScrollView>
    </SafeAreaView>
  );
}
