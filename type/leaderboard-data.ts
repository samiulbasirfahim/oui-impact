import { ImageSourcePropType } from "react-native";

export type LeaderBoardItem = {
    id: string;
    name: string;
    avatar: ImageSourcePropType;
    points: number;
    wentUp: boolean;
};


export type LeaderBoardData = LeaderBoardItem[];
