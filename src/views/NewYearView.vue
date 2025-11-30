<template>
    <div class="navbar bg-base-100 border-2 border-base-200">
        <div class="navbar-start">
        </div>
        <div class="navbar-center">
            New Year
        </div>
        <div class="navbar-end">
        </div>
    </div>
    <form class="p-4 flex flex-col flex-grow gap-4" @submit.prevent="vm.onSubmit">
        <label class="input validator w-full">
            <span class="label">Title</span>
            <input required type="text" v-model="vm.title" />
        </label>
        <div>
            <h2 class="font-semibold pb-1">Academic Period</h2>
            <ul class="list bg-base-100 rounded-sm border border-base-300">
                <li class="list-row" @click="vm.timeRange = YearType.AUG_SEP">
                    <input type="radio" class="radio radio-primary radio-sm" :checked="vm.timeRange == YearType.AUG_SEP" />
                    <span class="text-sm">Aug. {{ vm.currentYear }} - Sep. {{ vm.nextYear }}</span>
                </li>
                <li class="list-row" @click="vm.timeRange = YearType.JAN_DEC">
                    <input type="radio" class="radio radio-primary radio-sm" :checked="vm.timeRange == YearType.JAN_DEC" />
                    <span class="text-sm">Jan. {{ vm.currentYear }} - Dec. {{ vm.currentYear }}</span>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="font-semibold pb-1">Grading System</h2>
            <ul class="list bg-base-100 rounded-sm border border-base-300">
                <li class="list-row" @click="vm.gradingSystem = GradingStyle.WHOLE_NOTES">
                    <input type="radio" class="radio radio-primary radio-sm" :checked="vm.gradingSystem == GradingStyle.WHOLE_NOTES" />
                    <span class="text-sm">Whole notes</span>
                    <span class="text-gray-400">1, 2, 3, ...</span>
                </li>
                <li class="list-row" @click="vm.gradingSystem = GradingStyle.HALF_NOTES">
                    <input type="radio" class="radio radio-primary radio-sm" :checked="vm.gradingSystem == GradingStyle.HALF_NOTES" />
                    <span class="text-sm">Half notes</span>
                    <span class="text-gray-400">1, 1.5, 2, ...</span>
                </li>
                <li class="list-row" @click="vm.gradingSystem = GradingStyle.COMMA_NOTES">
                    <input type="radio" class="radio radio-primary radio-sm" :checked="vm.gradingSystem == GradingStyle.COMMA_NOTES" />
                    <span class="text-sm">Comma notes</span>
                    <span class="text-gray-400">1, 1.1, 1.2, ...</span>
                </li>
                <li class="list-row" @click="vm.gradingSystem = GradingStyle.POINTS">
                    <input type="radio" class="radio radio-primary radio-sm" :checked="vm.gradingSystem == GradingStyle.POINTS" />
                    <span class="text-sm">Points</span>
                    <span class="text-gray-400">1pt, 2pt, ...</span>
                </li>
                <li class="list-row" @click="vm.gradingSystem = GradingStyle.LETTERS">
                    <input type="radio" class="radio radio-primary radio-sm" :checked="vm.gradingSystem == GradingStyle.LETTERS" />
                    <span class="text-sm">Letters</span>
                    <span class="text-gray-400">A, B, ...</span>
                </li>
            </ul>
        </div>
        <div>
            <span class="label" @click="vm.active = !vm.active">
                <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" :checked="vm.active" />
                <span>Set as active Year</span>
            </span>
        </div>
        <div class="flex-grow flex flex-col justify-end">
            <button type="submit" class="btn btn-primary">
                Erstellen
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useViewModel } from "vue-mvvm";
import { NewYearViewModel } from "@views/NewYearView.model";
import { GradingStyle, YearType } from "@models/year.model";

const vm: NewYearViewModel = useViewModel(NewYearViewModel);
</script>