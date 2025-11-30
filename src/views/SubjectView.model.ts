import {Component} from "vue";
import {ViewModel} from "vue-mvvm";
import {RouteAdapter, RouterService} from "vue-mvvm/router";

import SubjectView from "@views/SubjectView.vue";
import {SubjectIcon, SubjectModel} from "@models/subject.model";
import {SubjectService} from "@services/subject.service";

export class SubjectViewModel extends ViewModel {
    public static readonly component: Component = SubjectView;
    public static route = {
        path: "/subject/:id",
        params: {
            id: "integer"
        }
    } satisfies RouteAdapter;

    private readonly routerService: RouterService;
    private readonly subjectService: SubjectService;

    private subject: SubjectModel | null = this.ref<SubjectModel | null>(null);

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


    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
        this.subjectService = this.ctx.getService(SubjectService);
    }

    public async mounted(): Promise<void> {
        try {
            const subjectID: number = this.routerService.params.getInteger("id");
            this.subject = await this.subjectService.getSubject(subjectID);
        } catch (e) {
            console.error(e);
            this.routerService.navigateBack();
        }
    }

    public onNavbarBtn(): void {
        this.routerService.navigateBack();
    }

    public onFABBtn() {
        // TODO open new note view
    }
}