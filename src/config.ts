import { AppShell, WritableGlobalContext } from "vue-mvvm";

import { NewYearViewModel } from "@views/NewYearView.model";
import { DashboardViewModel } from "@views/Dashboard.model";

import { SubjectSerivce } from "@services/subject.service";
import { DBService } from "@services/db.service";
import { YearService } from "@services/year.service";
import { NewSubjectViewModel } from "./views/NewSubjectView.model";

export default class AppConfig implements AppShell {
    router = {
        views: [
            DashboardViewModel, 
            NewYearViewModel,
            NewSubjectViewModel
        ]
    }
    configureServices(ctx: WritableGlobalContext): void {
        ctx.registerService(DBService, () => new DBService());
        ctx.registerService(YearService, ctx => new YearService(ctx));
        ctx.registerService(SubjectSerivce, ctx => new SubjectSerivce(ctx));
    }
}