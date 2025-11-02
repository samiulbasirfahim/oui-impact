import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";

export default function UserInfoScreen() {
    return (
        <Layout>
            <RNText
                style={{
                    alignSelf: "center",
                }}
                size="2xl"
                variant="title"
            >
                User Information
            </RNText>
            <RNText
                style={{
                    alignSelf: "center",
                    textAlign: "center",
                }}
                variant="secondary"
            >
                Please enter your profile. Don’t worry, only you can see your personal
                data. No one else will be able to see it. Or yor can skip it for now.
            </RNText>

            <RNInput label="Full name" />
        </Layout>
    );
}
