import {Component, computed, ComputedRef, ref, Ref} from "vue";
import {ViewModel} from "vue-mvvm";
import {RouteAdapter, RouterService} from "vue-mvvm/router";
import NewSubjectView from "@views/NewSubjectView.vue";

import {SubjectIcon} from "@models/subject.model.ts";

import {SubjectService} from "@services/subject.service.ts";
import {YearService} from "@services/year.service.ts";
import {YearModel} from "@models/year.model.ts";

export class NewSubjectViewModel extends ViewModel {
    public static readonly component: Component = NewSubjectView;
    public static readonly route: RouteAdapter = {
        path: "/subject/new"
    }

    private readonly routerService: RouterService;
    private readonly yearService: YearService;
    private readonly subjectService: SubjectService;

    public availableColors: string[] = [
        "#3b82f6",
        "#22c561",
        "#a755f7",
        "#f97216",
        "#ee4444",
        "#e84999",
        "#6366f1",
        "#14b8a6",
        "#e9b308",
        "#07b6d5",
        "#10b982",
        "#6b7380"
    ];

    public previewStyles: ComputedRef<string> = computed(() => {
        return `background-color: ${this.activeColor.value}24; color: ${this.activeColor.value}`;
    });

    public name: Ref<string> = ref("");
    public activeColor: Ref<string> = ref(this.availableColors[0]);
    public activeIcon: Ref<SubjectIcon> = ref(SubjectIcon.BOOK)

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
        this.yearService = this.ctx.getService(YearService);
        this.subjectService = this.ctx.getService(SubjectService);
    }

    public onNavbarBtn(): void {
        this.routerService.navigateBack();
    }

    public onCancel(): void {
        this.routerService.navigateBack();
    }

    public async onSubmit(): Promise<void> {
        const year: YearModel | null = await this.yearService.getActiveYear();
        if (!year) {
            return;
        }
        await this.subjectService.createSubject(this.name.value, this.activeColor.value, this.activeIcon.value, year.id);
        this.routerService.navigateBack();
    }
}