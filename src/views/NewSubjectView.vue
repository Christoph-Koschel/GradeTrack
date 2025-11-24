<template>
    <div class="navbar bg-base-100 border-2 border-base-200">
        <div class="navbar-start">
            <button class="btn btn-ghost btn-circle" @click="vm.onNavbarBTN">
                <ArrowLeftThin class="w-5 h-5" />
            </button>
        </div>
        <div class="navbar-center">
            New Subject
        </div>
        <div class="navbar-end">
        </div>
    </div>
    <div class="flex-grow p-4 flex flex-col gap-3">
        <div>
            <label class="input validator w-full">
                <span class="label">Name</span>
                <input required type="text" v-model="vm.name.value" />
            </label>
        </div>
        <div>
            <h2 class="font-semibold">Choose Color</h2>
            <div class="grid grid-cols-6 gap-2">
                <div v-for="color of vm.availableColors" :key="color" class="w-13 h-13 rounded-md" :style="{
                    'background-color': color
                }" @click="vm.activeColor.value = color">
                  
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useViewModel } from "vue-mvvm";
import { NewSubjectViewModel } from "@views/NewSubjectView.model";
import ArrowLeftThin from "@icons/mdi/ArrowLeftThin.vue";

const vm: NewSubjectViewModel = useViewModel(NewSubjectViewModel);
</script>