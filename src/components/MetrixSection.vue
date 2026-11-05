<script setup>
const props = defineProps({
    totalTasks: {
        type: Number,
        required: true
    },
    activeTasks: {
        type: Number,
        required: true
    },
    completedTasks: {
        type: Number,
        required: true
    }
})
</script>
<template>
    <section class="metrics">
        <div class="metric"><b>{{ totalTasks }}</b><span>Total tasks</span></div>
        <div class="metric"><b>{{ activeTasks }}</b><span>Active</span></div>
        <div class="metric"><b>{{ completedTasks }}</b><span>Completed</span></div>
    </section>
</template>