<script setup>
const props = defineProps({
    totalPages: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['pagination']);

const handlePagination = (direction) => {
    const page = props.currentPage + direction;

    if (page >= 1 && page <= props.totalPages) {
        emit('pagination', page);
    }
}
</script>
<template>
    <div class="pager">
        <button class="secondary" type="button" @click="handlePagination(-1)">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="secondary" type="button" @click="handlePagination(1)">Next</button>
    </div>
</template>