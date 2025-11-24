import { Component, computed, ComputedRef, ref, Ref } from "vue";
import { ViewModel } from "vue-mvvm";
import { RouteAdapter, RouterService } from "vue-mvvm/router";

import { YearService } from "@services/year.service";
import { SubjectSerivce } from "@services/subject.service";

import { YearModel } from "@models/year.model";
import { SubjectModel } from "@/models/subject.model";

import DashboardView from "@views/DashboardView.vue";
import {NewYearViewModel} from "@views/NewYearView.model";
import { NewSubjectViewModel } from "./NewSubjectView.model";

export class DashboardViewModel extends ViewModel {
    public static readonly component: Component = DashboardView;
    public static route: RouteAdapter = {
        path: "/"
    }

    private readonly routerService: RouterService;
    private readonly yearService: YearService;
    private readonly subjectService: SubjectSerivce;

    public totalAverage: ComputedRef<string> = computed(() => {
        if (this.subjects.value.length == 0) {
            return "N/A";
        }

        return "XX";
    });

    public subjects: Ref<SubjectModel[]> = ref([]);

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
        this.yearService = this.ctx.getService(YearService);
        this.subjectService = this.ctx.getService(SubjectSerivce);
    }

    async mounted(): Promise<void> {
        const year: YearModel | null = await this.yearService.getActiveYear();
        if (!year) {
            await this.routerService.navigateTo(NewYearViewModel);
            return;
        }

        this.subjects.value = await this.subjectService.getSubjectsOfYear(year.id);
    }

    public async onFABBtn(): Promise<void> {
        await this.routerService.navigateTo(NewSubjectViewModel);
    }
}