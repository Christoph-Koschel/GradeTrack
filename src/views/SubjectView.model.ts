import {Component} from "vue";
import {ViewModel} from "vue-mvvm";
import {RouteAdapter, RouterService} from "vue-mvvm/router";

import SubjectView from "@views/SubjectView.vue";
import {SubjectIcon, SubjectModel} from "@models/subject.model";
import { NoteModel } from "@/models/note.model";
import {SubjectService} from "@services/subject.service";
import { NoteService } from "@/services/note.service";
import { GradingStyle, YearModel } from "@/models/year.model";
import { YearService } from "@/services/year.service";
import { NewNoteViewModel } from "./NewNote.model";

export class SubjectViewModel extends ViewModel {
    public static readonly component: Component = SubjectView;
    public static route = {
        path: "/subject/:id",
        params: {
            id: "integer"
        }
    } satisfies RouteAdapter;

    private readonly routerService: RouterService;
    private readonly yearService: YearService;
    private readonly subjectService: SubjectService;
    private readonly notesService: NoteService;

    private subject: SubjectModel | null = this.ref<SubjectModel | null>(null);
    private year: YearModel | null = this.ref<YearModel | null>(null);
    public notes: NoteModel[] = this.ref([]);

    public name: string = this.computed(() => {
        if (this.subject) {
            return this.subject.name;
        }

        return "";
    });

    public color: string = this.computed(() => {
        if (this.subject) {
            return this.subject.color;
        }

        return "";
    });

    public icon: SubjectIcon = this.computed(() => {
        if (this.subject) {
            return this.subject.icon;
        }

        return SubjectIcon.BOOK;
    });

    public subjectAverage: string = this.computed(() => {
        if (!this.year || this.notes.length == 0) {
            return "\u2013";
        }

        return this.notesService.calculateAverage(this.year.grading, this.notes);
    });


    public bestNote: any = this.computed(() => {
        if (!this.year || this.notes.length == 0) {
            return "\u2013";
        }

        return this.notesService.bestNote(this.year.grading, this.notes).value;
    });

    public worstNote: any = this.computed(() => {
        if (!this.year || this.notes.length == 0) {
            return "\u2013";
        }

        return this.notesService.worstNote(this.year.grading, this.notes).value;
    });

    public lineGraphValues: number[] = this.computed(() => {
        if (!this.year || this.notes.length == 0) {
            return [];
        }

        switch (this.year.grading) {
            case GradingStyle.WHOLE_NOTES:
            case GradingStyle.HALF_NOTES:
            case GradingStyle.COMMA_NOTES:
                return this.notes.map(note => note.value);
            case GradingStyle.POINTS:
            case GradingStyle.LETTERS:
                throw "Not implemented";
        }
    });

    public lineGraphLabels: string[] = this.computed(() => {
       return this.notes.map(note => note.value.toString()); 
    });

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
        this.yearService = this.ctx.getService(YearService);
        this.subjectService = this.ctx.getService(SubjectService);
        this.notesService = this.ctx.getService(NoteService);
    }

    public async mounted(): Promise<void> {
        try {
            const subjectID: number = this.routerService.params.getInteger("id");
            this.subject = await this.subjectService.getSubject(subjectID);
            if (!this.subject) {
                await this.routerService.navigateBack();
                return;
            }
            this.year = await this.yearService.getYear(this.subject.yearID);
            this.notes = await this.notesService.getNotesOfSubject(this.subject.id);
        } catch (e) {
            console.error(e);
            this.routerService.navigateBack();
        }
    }

    public onNavbarBtn(): void {
        this.routerService.navigateBack();
    }

    public async onFABBtn(): Promise<void> {
        if (!this.subject) {
            return;
        }

        await this.routerService.navigateTo(NewNoteViewModel, {
            id: this.subject.id
        });
    }
}