import { ReadableGlobalContext } from "vue-mvvm";
import { DBService } from "@services/db.service";
import { SubjectModel } from "@/models/subject.model";

export class SubjectSerivce {
    private readonly db: DBService;

    public constructor(ctx: ReadableGlobalContext) {
        this.db = ctx.getService(DBService);
    }

    public async getSubjectsOfYear(yearID: number): Promise<SubjectModel[]> {
        const subjects: SubjectModel[] = await this.db.getAll("subject");
        return subjects.filter(subject => subject.yearID == yearID);
    }
}
