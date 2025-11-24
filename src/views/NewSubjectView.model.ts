import { Component, ref, Ref } from "vue";
import { ViewModel } from "vue-mvvm";
import { RouteAdapter, RouterService } from "vue-mvvm/router";
import NewSubjectView from "@views/NewSubjectView.vue";

export class NewSubjectViewModel extends ViewModel {
    public static readonly component: Component = NewSubjectView;
    public static readonly route: RouteAdapter = {
        path: "/subject/new"
    }

    private readonly routerService: RouterService;

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

    public name: Ref<string> = ref("");
    public activeColor: Ref<string> = ref(this.availableColors[0]);

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
    }

    public onNavbarBTN(): void {
        this.routerService.navigateBack();
    }
}