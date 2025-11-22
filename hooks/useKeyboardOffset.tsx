import { Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

export const useKeyboardOffset = (hasHeader = true) => {
    const insets = useSafeAreaInsets();
    const headerHeight = hasHeader ? useHeaderHeight() : 0;

    if (Platform.OS === "ios") {
        return headerHeight || insets.top;
    }

    const statusBarHeight = StatusBar.currentHeight || 0;
    return hasHeader ? headerHeight : statusBarHeight + 20;
};
