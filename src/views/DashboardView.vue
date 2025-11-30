<template>
    <div class="navbar bg-base-100 border-2 border-base-200">
        <div class="flex-1">
            <span class="text-xl">
                GradeTrack
            </span>
        </div>
        <div class="flex-none px-2">
            <Gear class="w-5 h-5"/>
        </div>
    </div>
    <div class="flex-grow p-4 flex flex-col">
        <div class="card bg-primary text-primary-content w-full">
            <div class="card-body gap-0">
                <div class="text-xs">Total overage</div>
                <div class="text-3xl">{{ vm.totalAverage }}</div>
            </div>
        </div>
        <div class="flex justify-between text-sm pt-4 pb-2">
            <h2 class="font-semibold pb-1">My Subjects</h2>
            <div>{{ vm.subjects.length }} subjects</div>
        </div>
        <div class="flex-grow flex flex-col gap-3">
            <div v-if="vm.subjects.length > 0"
                 v-for="subject in vm.subjects"
                 :key="subject.id"
                 class="card card-sm bg-base-100 border border-base-300"
                 @click="vm.onSubjectClick(subject)">
                <div class="card-body">
                    <div class="flex gap-2">
                        <div class="avatar">
                            <div
                                class="w-13 h-13 rounded aspect-square bg-primary/10 text-primary flex justify-center items-center"
                                :style="`background-color: ${subject.color}24; color: ${subject.color}`">
                                <SubjectIconRender :icon="subject.icon" class="w-6 h-6"/>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold text-lg mb-1">{{ subject.name }}</div>
                            <div class="text-xs">{{ vm.getSubjectCountText(subject) }}</div>
                        </div>
                        <div class="text-lg font-semibold h-full">{{ vm.getSubjectAverage(subject) }}</div>
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
            <button class="btn btn-xl btn-circle btn-primary" @click="vm.onFABBtn">
                <Add class="w-5 h-5"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useViewModel} from "vue-mvvm";
import Add from "@icons/mdi/Add.vue";
import Gear from "@icons/mdi/Gear.vue";
import SubjectIconRender from "@/components/SubjectIconRender.vue";
import {DashboardViewModel} from "@views/Dashboard.model";

const vm: DashboardViewModel = useViewModel(DashboardViewModel);
</script>