import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ChatScreen() {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={100}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View
                        style={{ flex: 1, justifyContent: "flex-end", padding: 20, gap: 5 }}
                    >
                        <View style={{ alignItems: "flex-start" }}>
                            <Text
                                className="font-roboto text-sm text-[#fff]"
                                style={{
                                    backgroundColor: "#43788F",
                                    paddingVertical: 8,
                                    paddingHorizontal: 15,
                                    borderWidth: 1,
                                    borderColor: "#E26C39",
                                    maxWidth: "80%",
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}
                            >
                                Hello, this is Swadhin, your Medical Simulation Assistant. I’m
                                here to help support your training by providing realistic,
                                interactive simulations that improve clinical.
                            </Text>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text
                                className="font-roboto text-sm text-[#fff]"
                                style={{
                                    backgroundColor: "#43788F",
                                    paddingVertical: 8,
                                    paddingHorizontal: 15,
                                    borderWidth: 1,
                                    borderColor: "#E26C39",
                                    maxWidth: "80%",
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                    borderBottomLeftRadius: 15,
                                }}
                            >
                                Ok, I will assist you.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        paddingHorizontal: 20,
                        gap: 5,
                        borderWidth: 1,
                        marginHorizontal: 20,
                        marginBottom: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#43788F",
                        borderColor: "#43788F",
                        borderRadius: 50,
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,

                            // backgroundColor: '#EFEFEF',
                            // borderRadius: 8,
                            paddingHorizontal: 12,
                            paddingVertical: 15,

                            fontSize: 16,
                        }}
                        placeholder="Type Your Message"
                        placeholderTextColor="#FFFFFF"
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
