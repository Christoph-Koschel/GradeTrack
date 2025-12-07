export enum YearType {
    AUG_SEP,
    JAN_DEC
}

export enum GradingStyle {
    GERMAN_WHOLE_1_6,
    GERMAN_HALF_1_6,
    GERMAN_1_6,
    GERMAN_PT_0_15,
    EU_0_20,
    US_LETTER,
    SWISS_1_6,
    PERCENTAGE
}

export type YearModel = {
    id: number;
    title: string;
    type: YearType;
    grading: GradingStyle;
    active: boolean;
}