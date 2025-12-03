import { Component } from "vue";
import { ViewModel } from "vue-mvvm";
import { RouteAdapter, RouterService } from "vue-mvvm/router";
import NewNoteView from "@views/NewNoteView.vue";

export class NewNoteViewModel extends ViewModel {
    public static component: Component = NewNoteView;
    public static route = {
        path: "/subject/:id/new",
        params: {
            id: "integer"
        }
    } satisfies RouteAdapter;

    private readonly routerService: RouterService;

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
    }

    public onNavbarBtn() {
        this.routerService.navigateBack();
    }
}