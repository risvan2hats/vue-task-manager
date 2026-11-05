<script setup>
const props = defineProps({
    tasks: {
        type: Array,
        required: true
    }
})

</script>

<template>
    <p><span class="status">Ready</span> Showing 10 of 38 tasks</p>

    <table>
        <thead>
            <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.todo }}</td>
                <td><span class="badge" :class="task.completed ? 'success' : 'danger'">{{ task.completed ? 'Completed' : 'Pending' }}</span></td>
                <td><button class="secondary" type="button">Complete</button> <button class="danger" type="button">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>