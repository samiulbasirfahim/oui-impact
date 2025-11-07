import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export function useLoadFonts() {
    const [loaded] = useFonts({
        SuezOne: require("@/assets/fonts/SuezOne-Regular.ttf"),
    });

    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!loaded) {
            SplashScreen.hide();
            setReady(true);
        }
    }, [loaded]);

    return ready;
}
