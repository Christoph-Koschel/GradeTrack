import {AppShell, WritableGlobalContext} from "vue-mvvm";

import {NewYearViewModel} from "@views/NewYearView.model";
import {DashboardViewModel} from "@views/Dashboard.model";
import {SubjectViewModel} from "@views/SubjectView.model";
import {NewSubjectViewModel} from "@views/NewSubjectView.model";
import {NewNoteViewModel} from "@views/NewNote.model";

import {SubjectService} from "@services/subject.service";
import {DBService} from "@services/db.service";
import {YearService} from "@services/year.service";
import {NoteService} from "@services/note.service";

export default class AppConfig implements AppShell {
    router = {
        views: [
            DashboardViewModel,
            NewYearViewModel,
            NewSubjectViewModel,
            SubjectViewModel,
            NewNoteViewModel
        ]
    }

    configureServices(ctx: WritableGlobalContext): void {
        ctx.registerService(DBService, () => new DBService());
        ctx.registerService(YearService, ctx => new YearService(ctx));
        ctx.registerService(SubjectService, ctx => new SubjectService(ctx));
        ctx.registerService(NoteService, ctx => new NoteService(ctx));
    }
}