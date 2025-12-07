<template>
    <div v-if="vm.open" class="fixed top-0 left-0 w-screen h-screen bg-base-100 p-4">
        <ul class="list rounded-sm border border-base-300">
            <li
                v-for="item of vm.items"
                :key="item.value"
                @click="vm.fulfillAction(item)"
                class="list-row">
                <span class="text-sm list-col-grow">{{ item.title }}</span>
                <span class="text-gray-400">{{ item.preview }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {useUserControl} from "vue-mvvm";

import {NoteSelectControlModel} from "@controls/NoteSelectControl.model.ts";

const vm: NoteSelectControlModel = useUserControl(NoteSelectControlModel);
</script>
