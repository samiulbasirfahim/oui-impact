export type IMPACT = {
    id: string;
    description: string;
    date: Date;
    donatedOn: "tree" | "water" | "healthcare" | "education" | "other";
    pointsEarned: number;
};
