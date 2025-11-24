export enum SubjectColor {
    BLUE,
    GREEN
}

export enum SubjectIcon {
    TEST_TUBE
}

export type SubjectModel = {
    id: number;
    name: string;
    color: SubjectColor;
    icon: SubjectIcon;
    yearID: number;
}