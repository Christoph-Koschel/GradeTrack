import * as dayjs from "dayjs";

export type NoteModel = {
    id: number;
    subjectID: number;
    date: dayjs.Dayjs;
    remarks: string;
    raw: string;
    normalized: number;
}