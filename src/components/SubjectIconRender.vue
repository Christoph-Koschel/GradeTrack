<script setup lang="ts">
import {SubjectIcon} from "@models/subject.model.ts";

import MusicClefTreble from "@icons/mdi/MusicClefTreble.vue";
import Calculator from "@icons/mdi/Calculator.vue";
import BookOpenVariantOutline from "@icons/mdi/BookOpenVariantOutline.vue";
import SchoolOutline from "@icons/mdi/SchoolOutline.vue";
import Globe from "@icons/mdi/Globe.vue";
import CashMultiple from "@icons/mdi/CashMultiple.vue";
import PaletteOutline from "@icons/mdi/PaletteOutline.vue";
import Alphabetical from "@icons/mdi/Alphabetical.vue";
import Flask from "@icons/mdi/Flask.vue";
import RunFast from "@icons/mdi/RunFast.vue";
import Microscope from "@icons/mdi/Microscope.vue";
import Theater from "@icons/mdi/Theater.vue";

const props = defineProps<{
    icon: SubjectIcon
}>();
</script>

<template>
    <BookOpenVariantOutline v-if="props.icon == SubjectIcon.BOOK"/>
    <Calculator v-else-if="props.icon == SubjectIcon.CALCULATOR"/>
    <Flask v-else-if="props.icon == SubjectIcon.FLASK"/>
    <Globe v-else-if="props.icon == SubjectIcon.GLOBE"/>
    <PaletteOutline v-else-if="props.icon == SubjectIcon.PALETTE"/>
    <MusicClefTreble v-else-if="props.icon == SubjectIcon.MUSIC"/>
    <RunFast v-else-if="props.icon == SubjectIcon.RUN"/>
    <Alphabetical v-else-if="props.icon == SubjectIcon.ALPHABETIC"/>
    <CashMultiple v-else-if="props.icon == SubjectIcon.CASH"/>
    <Theater v-else-if="props.icon == SubjectIcon.THEATER"/>
    <Microscope v-else-if="props.icon == SubjectIcon.MICROSCOPE"/>
    <SchoolOutline v-else/>
</template>

<style scoped>

</style>