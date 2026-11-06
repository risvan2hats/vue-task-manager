<script setup>
const emit = defineEmits(['deleteTask', 'completeTask']);

const props = defineProps({
    tasks: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const deleteTask = (taskId) => {
    emit('deleteTask', taskId);
}

const completeTask = (taskId) => {
    emit('completeTask', taskId);
}

</script>

<template>
    <p><span class="status">Ready</span> Showing {{ tasks.limit }} of {{ tasks.total }} tasks</p>
 
    <!-- Loading -->
    <div v-if="loading" class="loader">
        <div class="spinner"></div>
        <p>Loading tasks...</p>
    </div>

    <table v-else>
        <thead>
            <tr>
                <th>Task</th>
                <th>Status</th>
                <th width="25%">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="!tasks.tasks.length">
                <td colspan="3">
                    No tasks found.
                </td>
            </tr>

            <tr v-else v-for="task in tasks.tasks" :key="task.id">
                <td>{{ task.todo }}</td>
                <td><span class="badge" :class="task.completed ? 'success' : 'danger'">{{ task.completed ? 'Completed' : 'Pending' }}</span></td>
                <td>
                        <button class="secondary" type="button" @click="completeTask(task.id)"> {{ task.completed ? 'Mark as Pending' : 'Mark as Completed' }}</button> &nbsp;
                        <button class="danger" type="button" @click="deleteTask(task.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>