import * as ImagePicker from "expo-image-picker";

export async function imagePicker(cb: (uri: string | null) => void) {
    const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        cb(null);
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (!result.canceled) {
        cb(result.assets[0].uri);
    } else {
        cb(null);
    }
}
