export interface PointHistoryItem {
    id: string;
    title: string;
    subtitle: string;
    points: number;
    time: string;
}

export interface PointHistorySection {
    date: string;
    data: PointHistoryItem[];
}
