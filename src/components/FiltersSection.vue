
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filterChange']);

const search = ref('');
const status = ref('all');
const sort = ref('id');
const limit = ref(10);

const handleFilterChange = () => {
    emit('filterChange', {
        search: search.value,
        status: status.value,
        sort: sort.value,
        limit: limit.value
    });
};
</script>

<template>
    <div class="filters">
        <input type="search" placeholder="Search title or description" v-model="search" @input="handleFilterChange">

        <select v-model="status" @change="handleFilterChange">
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
        </select>

        <select v-model="sort" @change="handleFilterChange">
            <option value="id">Newest first</option>
            <option value="todo">Title A-Z</option>
        </select>

        <select v-model="limit" @change="handleFilterChange">
            <option :value="5">5 / page</option>
            <option :value="10">10 / page</option>
            <option :value="20">20 / page</option>
        </select>
    </div>
</template>