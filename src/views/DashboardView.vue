<template>
    <div class="navbar bg-base-100 border-2 border-base-200">
        <div class="flex-1">
            <span class="text-xl">
                GradeTrack
            </span>
        </div>
        <div class="flex-none px-2">
            <Gear class="w-5 h-5" />
        </div>
    </div>
    <div class="flex-grow p-4 flex flex-col">
        <div class="card bg-primary text-primary-content w-full">
            <div class="card-body gap-0">
                <div class="text-xs">Total overage</div>
                <div class="text-3xl">{{ vm.totalAverage.value }}</div>
            </div>
        </div>
        <div class="flex justify-between text-sm pt-4 pb-2">
            <h2 class="font-semibold">My Subjects</h2>
            <div>{{ vm.subjects.value.length }} subjects</div>
        </div>
        <div class="flex-grow flex flex-col gap-3">
            <div v-if="vm.subjects.value.length > 0" v-for="subject in vm.subjects.value" :key="subject.id" class="card card-sm bg-base-100 border border-base-300">
                <div class="card-body">
                    <div class="flex gap-2">
                        <div class="avatar">
                            <div class="w-10 rounded aspect-square bg-primary/10 text-primary flex justify-center items-center">
                                <TestTube class="w-5 h-5" />
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold text-md mb-1">Chemistry</div>
                            <div class="text-xs">12 grades recorded</div>
                        </div>
                        <div class="text-lg font-semibold h-full">9.2</div>
                    </div>
                </div>
            </div>
            <div v-else class="flex-grow flex items-center justify-center">
                <div class="text-center">
                    <div class="text-gray-400 text-xl">Found no subjects</div>
                    <div class="text-gray-400">Create on by pressing the Add button</div>
                </div>
            </div>
        </div>
        <div class="fab">
            <button class="btn btn-lg btn-circle btn-primary" @click="vm.onFABBtn">
                <Add class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Gear from "@icons/mdi/Gear.vue";
import Add from "@icons/mdi/Add.vue";
import TestTube from "@icons/mdi/TestTube.vue";
import { DashboardViewModel } from "./Dashboard.model";
import { useViewModel } from "vue-mvvm";

const vm: DashboardViewModel = useViewModel(DashboardViewModel);
</script>