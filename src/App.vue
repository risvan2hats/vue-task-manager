<script setup>

/* Components */
import SideBar from '@/components/SideBar.vue'
import MetrixSection from '@/components/MetrixSection.vue'
import FiltersSection from '@/components/FiltersSection.vue'
import TaskListSection from '@/components/TaskListSection.vue'
import PaginationSection from '@/components/PaginationSection.vue'
import TaskAddModal from '@/components/TaskAddModal.vue'

/* Services */
import tasksService from '@/tasksService';

import { ref, onMounted } from 'vue';

const tasks = ref([])
const showTaskModal = ref(false)

onMounted(async () => {
  tasks.value = await tasksService.useFetch();
});

// Add a new task
const handleNewTask = async ({ todo, completed }) => {
  tasks.value = await tasksService.addTask({
    id: Date.now(),
    todo,
    completed,
  });
};

// Complete a task
const handleCompleteTask = async (taskId) => {
  tasks.value = await tasksService.completeTask(taskId);
};

// Delete a task
const handleDeleteTask = async (taskId) => {
  tasks.value = await tasksService.removeTask(taskId);
};

// Refresh tasks
const handleRefresh = async () => {
  tasks.value = await tasksService.refreshTasks();
};

// Filter tasks
const handleFilterChange = async (filter) => {
  tasks.value = await tasksService.useFetch(filter);
};

// Paginate tasks
const handlePagination = async (page) => {
    tasks.value = await tasksService.useFetch({ page });
};
</script>

<template>
  <div class="app">
    <SideBar />

    <main class="content">
      <section class="topbar">
        <div>
          <h1>Task Manager</h1>
        </div>
        <div class="actions">
          <button class="secondary" type="button" @click="handleRefresh">Refresh</button>
          <button type="button" @click="showTaskModal = true">+ New Task</button>
        </div>
      </section>

      <MetrixSection :totalTasks="tasks.total" :activeTasks="tasks.total - tasks.completedTasks"
        :completedTasks="tasks.completedTasks" :highPriorityTasks="9" :overdueTasks="5" />

      <section class="panel">
        <FiltersSection @filter-change="handleFilterChange" />

        <TaskListSection :tasks="tasks" @delete-task="handleDeleteTask" @complete-task="handleCompleteTask" />

        <PaginationSection :totalPages="tasks.totalPages" :currentPage="tasks.page" @pagination="handlePagination" />
      </section>
    </main>

    <TaskAddModal :open="showTaskModal" @closeModal="showTaskModal = false" @submit="handleNewTask" />
  </div>
</template>