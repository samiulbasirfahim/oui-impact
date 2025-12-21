import { useAuthStore } from "@/store/auth";
import { Redirect } from "expo-router";

export default function Index() {
    const { isLoggedIn } = useAuthStore();

    return (
        <Redirect
            href={isLoggedIn ? "/protected/(tabs)/chat" : "/public/auth/login"}
        />
    );
    // return (
    //     <View
    //         style={{
    //             flex: 1,
    //             justifyContent: "center",
    //             alignItems: "center",
    //             gap: 8,
    //         }}
    //     >
    //         <RNText size="xl" variant="title">
    //             Welcome to OUI IMPACT
    //         </RNText>
    //         <Link href={"/status"}>
    //             <RNText variant="accent" size="md">
    //                 Go to Status Screens
    //             </RNText>
    //         </Link>
    //
    //         <Link href={"/public/onboarding/first"}>
    //             <RNText variant="accent" size="md">
    //                 Go to Onboarding Screens
    //             </RNText>
    //         </Link>
    //
    //         <Link href={"/public/auth/reset-password"}>
    //             <RNText variant="accent" size="md">
    //                 Go to Reset Password Screen
    //             </RNText>
    //         </Link>
    //
    //         <Link href={"/public/auth/login"}>
    //             <RNText variant="accent" size="md">
    //                 Go to Login Screen
    //             </RNText>
    //         </Link>
    //
    //         <Link href={"/public/auth/register"}>
    //             <RNText variant="accent" size="md">
    //                 Go to Register Screen
    //             </RNText>
    //         </Link>
    //
    //         <Link href={"/protected/(tabs)/chat"}>
    //             <RNText variant="accent" size="md">
    //                 Go to Main App Screen
    //             </RNText>
    //         </Link>
    //     </View>
    // );
}
