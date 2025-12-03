import {ReadableGlobalContext} from "vue-mvvm";
import {DBService} from "./db.service";
import {GradingStyle, YearModel, YearType} from "@/models/year.model";

export class YearService {
    private readonly db: DBService;

    public constructor(ctx: ReadableGlobalContext) {
        this.db = ctx.getService(DBService);
    }

    public async getActiveYear(): Promise<YearModel | null> {
        const years: YearModel[] = await this.db.getAll("year");
        for (const year of years) {
            if (year.active) {
                return year;
            }
        }

        return null;
    }

    public async getYear(yearID: number): Promise<YearModel | null> {
        return await this.db.get("year", yearID);
    }

    public async createYear(title: string, type: YearType, grading: GradingStyle, active: boolean): Promise<void> {
        await this.db.save<YearModel>("year", {
            title: title,
            type: type,
            grading: grading,
            active: active
        });
    }
}