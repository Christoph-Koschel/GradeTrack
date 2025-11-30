declare global {
    export interface Math {
        roundPrecise(value: number, postpoint?: number): number;
    }
}

Math.roundPrecise = function (value: number, postpoint: number = 2): number {
    const factor = Math.pow(10, postpoint);
    return Math.round(value * factor) / factor;
}

export {}