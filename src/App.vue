<script setup>

/* Components */
import SideBar from '@/components/SideBar.vue'
import MetrixSection from '@/components/MetrixSection.vue'
import FiltersSection from '@/components/FiltersSection.vue'
import TaskListSection from '@/components/TaskListSection.vue'
import PaginationSection from '@/components/PaginationSection.vue'

/* Services */
import tasksService from '@/tasksService';

const tasks = ref([])

import { ref, onMounted } from 'vue';

onMounted(async () => {

  const response = await tasksService.useFetch();

  tasks.value = response.data.todos;
})
</script>

<template>
  <div class="app">
    <SideBar />

    <main class="content">
      <section class="topbar">
        <div>
          <h1>Task Manager</h1>
          <p class="sub">Static interface layout — to be made dynamic using Vue 3 Composition API.</p>
        </div>
        <div class="actions">
          <button class="secondary" type="button">Refresh</button>
          <button type="button">+ New Task</button>
        </div>
      </section>

      <MetrixSection :totalTasks="38" :activeTasks="24" :completedTasks="14" :highPriorityTasks="9" :overdueTasks="5" />

      <section class="panel">
        <FiltersSection />

        <TaskListSection :tasks="tasks" />

        <PaginationSection />
      </section>
    </main>
  </div>
</template>