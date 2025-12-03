<template>
    <div class="navbar bg-base-100 border-2 border-base-200">
        <div class="navbar-start">
            <button class="btn btn-ghost btn-circle" @click="vm.onNavbarBtn">
                <ArrowLeftThin class="w-5 h-5"/>
            </button>
        </div>
        <div class="navbar-center">
            New Note
        </div>
        <div class="navbar-end">
        </div>
    </div>
    <div class="p-4 flex-grow flex flex-col gap-3">
    </div>
</template>

<script setup lang="ts">
import {useViewModel} from 'vue-mvvm';
import {NewNoteViewModel} from '@views/NewNote.model';
import ArrowLeftThin from '@icons/mdi/ArrowLeftThin.vue';

const vm: NewNoteViewModel = useViewModel(NewNoteViewModel);
</script>