<script setup>
import { ref } from 'vue';

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['closeModal', 'submit']);

const todo = ref('');
const status = ref('completed');

const closeModal = () => {
    todo.value = '';
    status.value = 'completed';
    emit('closeModal');
};

const submit = () => {
    emit('submit', {
        todo: todo.value.trim(),
        completed: status.value === 'completed',
    });
    closeModal();
};
</script>

<template>
    <div v-if="open" class="modal-backdrop" @click.self="closeModal">
        <div class="modal" role="dialog" aria-labelledby="new-task-title">
            <h2 id="new-task-title">New Task</h2>
            <form @submit.prevent="submit">
                <label>
                    Task
                    <input v-model="todo" type="text" required />
                </label>
                <label>
                    Status
                    <select v-model="status">
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>
                <div class="modal-actions">
                    <button class="secondary" type="button" @click="closeModal">Cancel</button>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    </div>
</template>
