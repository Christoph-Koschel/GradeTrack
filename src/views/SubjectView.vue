<template>
    <div class="navbar bg-base-100 border-2 border-base-200">
        <div class="navbar-start">
            <button class="btn btn-ghost btn-circle" @click="vm.onNavbarBtn">
                <ArrowLeftThin class="w-5 h-5"/>
            </button>
        </div>
        <div class="navbar-center">
            {{ vm.name }}
        </div>
        <div class="navbar-end">
        </div>
    </div>
    <div class="p-4 flex-grow flex flex-col gap-3">
        <div class="-mx-4 -mt-4 py-8 text-white flex flex-col items-center shadow-sm" :style="`background-color: ${vm.color}`">
            <div class="text-3xl font-semibold">8.7</div>
            <div class="font-thin">Current Average</div>
            <div class="mt-3 inline-flex gap-1 items-center">
                <GraphLine class="h-[1em]" />
                +0.3 this month
            </div>
        </div>
        <div class="-mx-4 p-4 grid grid-cols-3 grid-rows-1">
            <div class="w-full text-center">
                <div class="textarea-xl font-semibold">12</div>
                <div class="font-thin text-sm">Total Grades</div>
            </div>
            <div class="w-full text-center">
                <div class="textarea-xl font-semibold text-success">9.2</div>
                <div class="font-thin text-sm">Best Grade</div>
            </div>
            <div class="w-full text-center">
                <div class="textarea-xl font-semibold text-error">12</div>
                <div class="font-thin text-sm">Worst Grade</div>
            </div>
        </div>
        <div>
            <h2 class="font-semibold pb-1">Grade Trend</h2>
            <div class="w-full border border-base-200 p-1">
                <LineGraph :values="[1, 2, 3, 4, 4, 1, 2]" :color="vm.color" />
            </div>
        </div>
        <div>
            <h2 class="font-semibold pb-1">Grades</h2>
            <div class="card card-sm bg-base-100 border border-base-300">
                <div class="card-body">
                    <div class="flex gap-2">
                        <div class="avatar">
                            <div
                                class="w-13 h-13 rounded aspect-square bg-primary/10 text-primary flex justify-center items-center"
                                :style="`background-color: ${vm.color}24; color: ${vm.color}`">
                                <SubjectIconRender :icon="vm.icon" class="w-6 h-6"/>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold text-lg mb-1">{{ "WSD" }}</div>
                            <div class="text-xs">{{ "YYYY/MM/DD" }}</div>
                        </div>
                        <div class="text-lg font-semibold h-full">{{ "1.0" }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fab">
            <button class="btn btn-xl btn-circle btn-primary" @click="vm.onFABBtn">
                <Add class="w-5 h-5"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useViewModel} from "vue-mvvm";
import {SubjectViewModel} from "@views/SubjectView.model";

import ArrowLeftThin from "@icons/mdi/ArrowLeftThin.vue";
import GraphLine from "@icons/mdi/GraphLine.vue";
import Add from "@icons/mdi/Add.vue";

import LineGraph from "@/components/LineGraph.vue";
import SubjectIconRender from "@/components/SubjectIconRender.vue";

const vm: SubjectViewModel = useViewModel(SubjectViewModel);
</script>
