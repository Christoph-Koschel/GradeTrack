import {GradingStyle} from "@models/year.model.ts";

export class GradingService {
    public constructor() {
    }

    public normalizeGrade(style: GradingStyle, note: number): number {
        switch (style) {
            case GradingStyle.GERMAN_HALF_1_6:
            case GradingStyle.GERMAN_WHOLE_1_6:
            case GradingStyle.GERMAN_1_6:
                return 100 - ((note - 1) / 5) * 100;
            case GradingStyle.GERMAN_PT_0_15:
                return (note / 15) * 100;
            case GradingStyle.EU_0_20:
                return (note / 20) * 100;
            case GradingStyle.US_LETTER:
                return ([
                    0, // F
                    60,
                    63,
                    67,
                    70,
                    73,
                    77,
                    80,
                    83,
                    87,
                    90,
                    95,
                    100 // A+
                ])[note];
            case GradingStyle.SWISS_1_6:
                return ((note - 1) / 5) * 100;
            case GradingStyle.PERCENTAGE:
                return note;
        }
    }

    public usLetterToNumber(letter: string): number {
        switch (letter) {
            case "A+":
                return 11;
            case "A":
                return 10;
            case "A-":
                return 9;
            case "B+":
                return 8;
            case "B-":
                return 7;
            case "C+":
                return 6;
            case "C":
                return 5;
            case "C-":
                return 4;
            case "D+":
                return 3;
            case "D":
                return 2;
            case "D-":
                return 1;
            case "F":
                return 0;
        }

        throw "Invalid US-Letter grade";
    }
}