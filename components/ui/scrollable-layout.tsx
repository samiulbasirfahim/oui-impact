import { ReactNode } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

type Props = {
    children?: ReactNode;
} & ScrollViewProps;

export function ScrollableLayout({ children, ...props }: Props) {
    return <ScrollView {...props}>{children}</ScrollView>;
}
