export enum YearType {
    AUG_SEP,
    JAN_DEC
}

export enum GradingStyle {
    WHOLE_NOTES,
    HALF_NOTES,
    COMMA_NOTES,
    POINTS,
    LETTERS
}

export type YearModel = {
    id: number;
    title: string;
    type: YearType;
    grading: GradingStyle;
    active: boolean;
}