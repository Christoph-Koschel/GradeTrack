export enum SubjectIcon {
    BOOK,
    CALCULATOR,
    FLASK,
    GLOBE,
    PALETTE,
    MUSIC,
    RUN,
    ALPHABETIC,
    CASH,
    THEATER,
    MICROSCOPE,
    SCHOOL
}

export type SubjectModel = {
    id: number;
    name: string;
    color: string;
    icon: SubjectIcon;
    yearID: number;
    writingRatio: number;
    oralRatio: number;
    homeworkRatio: number;
    testRatio: number;
}