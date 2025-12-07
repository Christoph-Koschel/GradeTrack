import {Action, ActionContext, UserControl} from "vue-mvvm";

import {GradingStyle} from "@models/year.model.ts";

export type NoteGradingPreview = {
    value: GradingStyle;
    title: string;
    preview: string;
}

export class NoteSelectControlModel extends UserControl implements Action<NoteGradingPreview> {
    private actionContext: ActionContext<NoteGradingPreview> | null = null;

    public readonly items: NoteGradingPreview[] = [
        {
            value: GradingStyle.GERMAN_WHOLE_1_6,
            title: "German (whole)",
            preview: "1, 2, ..., 6"
        },
        {
            value: GradingStyle.GERMAN_HALF_1_6,
            title: "German (half)",
            preview: "1, 1.5, ..., 6"
        },
        {
            value: GradingStyle.GERMAN_1_6,
            title: "German",
            preview: "1, 1.1, ..., 6"
        },
        {
            value: GradingStyle.GERMAN_PT_0_15,
            title: "German (points)",
            preview: "1pt, 2pt, ..., 15pt"
        },
        {
            value: GradingStyle.EU_0_20,
            title: "EU Scale",
            preview: "0, 1, ..., 20"
        },
        {
            value: GradingStyle.SWISS_1_6,
            title: "Swiss",
            preview: "6, 5, ..., 1"
        },
        {
            value: GradingStyle.US_LETTER,
            title: "US",
            preview: "A+, A, ... F"
        },
        {
            value: GradingStyle.PERCENTAGE,
            title: "Percentage",
            preview: "100%, ..., 0%"
        }
    ];

    public open: boolean = this.ref(false);

    public constructor() {
        super();
    }

    public onAction(ctx: ActionContext<NoteGradingPreview>): void {
        if (this.actionContext) {
            ctx.failAction(new Error("Action is already running"));
        }

        this.actionContext = ctx;
        this.open = true;
    }

    public fulfillAction(item: NoteGradingPreview): void {
        if (!this.actionContext) {
            return;
        }

        this.open = false;
        this.actionContext.completeAction(item);
        this.actionContext = null;
    }
}