import {Component} from "vue";
import {ViewModel} from "vue-mvvm";
import {RouteAdapter, RouterService} from "vue-mvvm/router";

import NewYearView from "@views/NewYearView.vue";
import {GradingStyle, YearType} from "@models/year.model";
import {YearService} from "@/services/year.service";

export class NewYearViewModel extends ViewModel {
    public static readonly component: Component = NewYearView;
    public static readonly route: RouteAdapter = {
        path: "/year/new"
    }

    private readonly routerService: RouterService;
    private readonly yearService: YearService;

    public readonly currentYear: string = this.computed(() => {
        return (new Date()).getFullYear().toString();
    });

    public readonly nextYear: string = this.computed(() => {
        return ((new Date()).getFullYear() + 1).toString();
    });

    public title: string = this.ref("");
    public timeRange: YearType = this.ref(YearType.AUG_SEP);
    public gradingSystem: GradingStyle = this.ref(GradingStyle.WHOLE_NOTES);
    public active: boolean = this.ref(true);

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
        this.yearService = this.ctx.getService(YearService);
    }

    public async onSubmit(): Promise<void> {
        await this.yearService.createYear(
            this.title,
            this.timeRange,
            this.gradingSystem,
            this.active
        );

        this.routerService.navigateBack();
    }
}