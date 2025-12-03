<template>
    <svg viewBox="0 0 200 60" preserveAspectRatio="none" style="width: 100%; height: 100%;">
        <!-- Polyline connecting points -->
        <polyline
            :points="polylinePoints"
            fill="none"
            :stroke="color"
            stroke-width="1"
        />
        <!-- Circles at each point -->
        <circle
            v-for="(point, index) in points"
            :key="'circle-' + index"
            :cx="point.x"
            :cy="point.y"
            r="2"
            :fill="color"
        />
        <!-- Labels above each circle -->
        <text
            v-for="(point, index) in points"
            :key="'text-' + index"
            :x="point.x"
            :y="point.y - 5"
            font-size="7"
            text-anchor="middle"
        >
            {{ labels[index] }}
        </text>
    </svg>
</template>

<script>
export default {
    props: {
        values: {
            type: Array,
            required: true
        },
        labels: {
            type: Array,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        padding: {
            type: Number,
            default: 12,
        },
    },
    computed: {
        points() {
            if (!this.values.length) return [];

            const maxVal = Math.max(...this.values);
            const minVal = Math.min(...this.values);
            const width = 200;
            const height = 60;
            const stepX = (width - 2 * this.padding) / (this.values.length - 1);

            return this.values.map((val, index) => {
                const normalizedY =
                    this.padding + ((val - minVal) / (maxVal - minVal || 1)) * (height - 2 * this.padding);
                return {
                    x: this.padding + index * stepX,
                    y: normalizedY,
                };
            });
        },
        polylinePoints() {
            return this.points.map((p) => `${p.x},${p.y}`).join(' ');
        },
    },
};
</script>
