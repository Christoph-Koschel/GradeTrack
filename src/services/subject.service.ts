import {ReadableGlobalContext} from "vue-mvvm";
import {DBService} from "@services/db.service";
import {SubjectIcon, SubjectModel} from "@/models/subject.model";

export class SubjectService {
    private readonly db: DBService;

    public constructor(ctx: ReadableGlobalContext) {
        this.db = ctx.getService(DBService);
    }

    public async getSubjectsOfYear(yearID: number): Promise<SubjectModel[]> {
        const subjects: SubjectModel[] = await this.db.getAll("subject");
        return subjects.filter(subject => subject.yearID == yearID);
    }

    public async createSubject(name: string, color: string, icon: SubjectIcon, yearID: number): Promise<void> {
        await this.db.save<SubjectModel>("subject", {
            name: name,
            color: color,
            icon: icon,
            yearID: yearID,
            writingRatio: 1,
            oralRatio: 1,
            homeworkRatio: 1,
            testRatio: 1
        });
    }

    public async getSubject(subjectID: number): Promise<SubjectModel | null> {
        return await this.db.get("subject", subjectID);
    }
}
