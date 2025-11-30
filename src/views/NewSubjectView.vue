<template>
    <div class="navbar bg-base-100 border-2 border-base-200">
        <div class="navbar-start">
            <button class="btn btn-ghost btn-circle" @click="vm.onNavbarBtn">
                <ArrowLeftThin class="w-5 h-5"/>
            </button>
        </div>
        <div class="navbar-center">
            New Subject
        </div>
        <div class="navbar-end">
        </div>
    </div>
    <form class="flex-grow p-4 flex flex-col gap-3" @submit.prevent="vm.onSubmit">
        <div>
            <label class="input validator w-full">
                <span class="label">Name</span>
                <input required type="text" v-model="vm.name.value"/>
            </label>
        </div>
        <div>
            <h2 class="font-semibold pb-1">Choose Color</h2>
            <div class="grid grid-cols-6 grid-rows-2 gap-4">
                <div v-for="color of vm.availableColors" :key="color" class="w-full h-full aspect-square rounded-md flex justify-center items-center" :style="{
                    'background-color': color
                }" @click="vm.activeColor.value = color">
                    <Check v-if="vm.activeColor.value == color" class="w-5 h-5 text-gray-50" />
                </div>
            </div>
        </div>
        <div>
            <h2 class="font-semibold pb-1">Choose Icon</h2>
            <div class="grid grid-cols-6 grid-rows-2 gap-4">
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.BOOK }" @click="vm.activeIcon.value = SubjectIcon.BOOK">
                    <BookOpenVariantOutline class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.CALCULATOR }" @click="vm.activeIcon.value = SubjectIcon.CALCULATOR">
                    <Calculator class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.FLASK }" @click="vm.activeIcon.value = SubjectIcon.FLASK">
                    <Flask class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.GLOBE }" @click="vm.activeIcon.value = SubjectIcon.GLOBE">
                    <Globe class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.PALETTE }" @click="vm.activeIcon.value = SubjectIcon.PALETTE">
                    <PaletteOutline class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.MUSIC }" @click="vm.activeIcon.value = SubjectIcon.MUSIC">
                    <MusicClefTreble class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.RUN }" @click="vm.activeIcon.value = SubjectIcon.RUN">
                    <RunFast class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.ALPHABETIC }" @click="vm.activeIcon.value = SubjectIcon.ALPHABETIC">
                    <Alphabetical class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.CASH }" @click="vm.activeIcon.value = SubjectIcon.CASH">
                    <CashMultiple class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.THEATER }" @click="vm.activeIcon.value = SubjectIcon.THEATER">
                    <Theater class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.MICROSCOPE }" @click="vm.activeIcon.value = SubjectIcon.MICROSCOPE">
                    <Microscope class="w-5 h-5" />
                </div>
                <div class="icon-box" :class="{ 'selected': vm.activeIcon.value == SubjectIcon.SCHOOL }" @click="vm.activeIcon.value = SubjectIcon.SCHOOL">
                    <SchoolOutline class="w-5 h-5" />
                </div>
            </div>
        </div>
        <div>
            <h2 class="font-semibold pb-1">Preview</h2>
            <div class="card card-sm bg-base-100 border border-base-300">
                <div class="card-body">
                    <div class="flex gap-2">
                        <div class="avatar">
                            <div class="w-13 h-13 rounded aspect-square flex justify-center items-center" :style="vm.previewStyles.value">
                                <SubjectIconRender :icon="vm.activeIcon.value" class="w-6 h-6" />
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold text-lg mb-1">{{ vm.name.value || "&lt;name>" }}</div>
                            <div class="text-xs">No grades yet</div>
                        </div>
                        <div class="text-lg font-semibold h-full">1.0</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-grow flex flex-col justify-end">
            <div class="grid grid-cols-2 gap-3">
                <button type="button" class="btn w-full" @click="vm.onCancel">
                    Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                    Save Subject
                </button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import {useViewModel} from "vue-mvvm";
import {NewSubjectViewModel} from "@views/NewSubjectView.model";
import {SubjectIcon} from "@models/subject.model.ts";

import ArrowLeftThin from "@icons/mdi/ArrowLeftThin.vue";
import Check from "@icons/mdi/Check.vue";
import BookOpenVariantOutline from "@icons/mdi/BookOpenVariantOutline.vue";
import Calculator from "@icons/mdi/Calculator.vue";
import Flask from "@icons/mdi/Flask.vue";
import Globe from "@icons/mdi/Globe.vue";
import PaletteOutline from "@icons/mdi/PaletteOutline.vue";
import RunFast from "@icons/mdi/RunFast.vue";
import Alphabetical from "@icons/mdi/Alphabetical.vue";
import Theater from "@icons/mdi/Theater.vue";
import Microscope from "@icons/mdi/Microscope.vue";
import SchoolOutline from "@icons/mdi/SchoolOutline.vue";
import MusicClefTreble from "@icons/mdi/MusicClefTreble.vue";
import CashMultiple from "@icons/mdi/CashMultiple.vue";
import SubjectIconRender from "@/components/SubjectIconRender.vue";

const vm: NewSubjectViewModel = useViewModel(NewSubjectViewModel);
</script>

<style scoped>
@reference "../main.css";

.icon-box {
    @apply
        w-full
        h-full
        aspect-square
        rounded-md
        flex
        justify-center
        items-center
        bg-base-200
        border;
}

.icon-box:not(.selected) {
    @apply border-base-300;
}

.icon-box.selected {
    @apply border-primary ring ring-primary;
}
</style>