import {ReadableGlobalContext} from "vue-mvvm";
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
}