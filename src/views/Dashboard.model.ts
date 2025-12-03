import {Component} from "vue";
import {ViewModel} from "vue-mvvm";
import {RouteAdapter, RouterService} from "vue-mvvm/router";

import {YearService} from "@services/year.service";
import {SubjectService} from "@services/subject.service";

import {YearModel} from "@models/year.model";
import {SubjectModel} from "@/models/subject.model";

import DashboardView from "@views/DashboardView.vue";
import {NewYearViewModel} from "@views/NewYearView.model";
import {NewSubjectViewModel} from "@views/NewSubjectView.model";
import {NoteModel} from "@models/note.model.ts";
import {NoteService} from "@services/note.service.ts";
import {SubjectViewModel} from "@views/SubjectView.model.ts";

export class DashboardViewModel extends ViewModel {
    public static readonly component: Component = DashboardView;
    public static route: RouteAdapter = {
        path: "/"
    }

    private readonly routerService: RouterService;
    private readonly yearService: YearService;
    private readonly subjectService: SubjectService;
    private readonly noteService: NoteService;

    private year: YearModel | null = null;
    private readonly notesOfSubjects: Map<number, NoteModel[]> = new Map<number, NoteModel[]>();

    public totalAverage: string = this.computed(() => {
        const notes: NoteModel[] = Array.from(this.notesOfSubjects.values()).flat();
        if (!this.year || notes.length == 0) {
            return "\u2013";
        }

        return this.noteService.calculateAverage(this.year.grading, notes);
    });

    public subjects: SubjectModel[] = this.ref<SubjectModel[]>([]);

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
        this.yearService = this.ctx.getService(YearService);
        this.subjectService = this.ctx.getService(SubjectService);
        this.noteService = this.ctx.getService(NoteService);
    }

    async mounted(): Promise<void> {
        this.year = await this.yearService.getActiveYear();
        if (!this.year) {
            await this.routerService.navigateTo(NewYearViewModel);
            return;
        }

        this.subjects = await this.subjectService.getSubjectsOfYear(this.year.id);
        this.notesOfSubjects.clear();
        await Promise.all(
            this.subjects.map(subject =>
                this.noteService.getNotesOfSubject(subject.id)
                    .then(notes => this.notesOfSubjects.set(subject.id, notes))
            )
        );
    }

    public async onFABBtn(): Promise<void> {
        await this.routerService.navigateTo(NewSubjectViewModel);
    }

    public getSubjectCountText(subject: SubjectModel): string {
        const notes: NoteModel[] | undefined = this.notesOfSubjects.get(subject.id);
        if (!notes || notes.length == 0) {
            return "No grades yet";
        }

        return `${notes.length} grades recorded`;
    }

    public getSubjectAverage(subject: SubjectModel): string {
        const notes: NoteModel[] | undefined = this.notesOfSubjects.get(subject.id);
        if (!this.year || !notes || notes.length == 0) {
            return "\u2013";
        }

        return this.noteService.calculateAverage(this.year.grading, notes);
    }

    public async onSubjectClick(subject: SubjectModel): Promise<void> {
        await this.routerService.navigateTo(SubjectViewModel, {
            id: subject.id
        });
    }
}