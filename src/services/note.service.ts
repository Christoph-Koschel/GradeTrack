import {ReadableGlobalContext} from "vue-mvvm";
import * as dayjs from "dayjs";

import {DBService} from "@services/db.service.ts";
import {NoteModel} from "@models/note.model.ts";
import {GradingStyle} from "@models/year.model.ts";

export class NoteService {
    private readonly db: DBService;

    public constructor(ctx: ReadableGlobalContext) {
        this.db = ctx.getService(DBService);
    }

    public async getNotesOfSubject(subjectID: number): Promise<NoteModel[]> {
        const notes: NoteModel[] = await this.db.getAll("note");
        return notes.filter(note => note.subjectID == subjectID);
    }

    public calculateAverage(grading: GradingStyle, notes: NoteModel[]): string {
        switch (grading) {
            case GradingStyle.WHOLE_NOTES:
            case GradingStyle.HALF_NOTES:
            case GradingStyle.COMMA_NOTES:
                const sum: number = notes.reduce((a: number, b: NoteModel) => a + b.value as number, 0);
                return Math.roundPrecise(sum / notes.length, 1).toString();
            case GradingStyle.POINTS:
                // TODO add average calculation
                return "N/A";
            case GradingStyle.LETTERS:
                // TODO add average calculation
                return "N/A";
        }
    }

    public bestNote(grading: GradingStyle, notes: NoteModel[]): NoteModel {
        switch (grading) {
            case GradingStyle.WHOLE_NOTES:
            case GradingStyle.HALF_NOTES:
            case GradingStyle.COMMA_NOTES: {
                let bestNote: NoteModel = notes[0];

                for (const note of notes) {
                    if (note.value < bestNote.value) {
                        bestNote = note;
                    }
                }

                return bestNote;
            }
            case GradingStyle.POINTS:
                throw "Not implemented";
            case GradingStyle.LETTERS:
                throw "Not implemented";
        }
    }
    
    public worstNote(grading: GradingStyle, notes: NoteModel[]): NoteModel {
        switch (grading) {
            case GradingStyle.WHOLE_NOTES:
            case GradingStyle.HALF_NOTES:
            case GradingStyle.COMMA_NOTES: {
                let worstNote: NoteModel = notes[0];

                for (const note of notes) {
                    if (note.value > worstNote.value) {
                        worstNote = note;
                    }
                }

                return worstNote;
            }
            case GradingStyle.POINTS:
                throw "Not implemented";
            case GradingStyle.LETTERS:
                throw "Not implemented";
        }
    }

    public extractNotesOfMonth(notes: NoteModel[], date: dayjs.Dayjs): NoteModel[] {
        return notes.filter(note => note.date.isSame(date, "month"));
    }

    public calculateChangeOfMonth(grading: GradingStyle, notes: NoteModel[], date: dayjs.Dayjs): number {
        const notesOfLastMonth: NoteModel[] = this.extractNotesOfMonth(notes, date.subtract(1, "month"));
        const notesOfThisMonth: NoteModel[] = this.extractNotesOfMonth(notes, date);

        const averageLastMonth: number = notesOfLastMonth ? 0 : this.calculateAverage(grading, notesOfLastMonth);
        const averageThisMonth: number = notesOfThisMonth ? 0 : this.calculateAverage(grading, notesOfThisMonth);

        return averageLastMonth - averageThisMonth;
    }

}