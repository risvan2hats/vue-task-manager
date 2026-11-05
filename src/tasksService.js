
import api from './api';

const tasksService = {

    /**
     * Fetch tasks from API if not cached
     */
    async useFetch() {
        // localStorage.removeItem('tasks');
        const tasks = getStoredTasks('tasks');

        if (!tasks.length) {
            const response = await api.get('/todos');

            return setStoredTasks('tasks', response.data.todos);
        }

        return tasks;
    },

    /**
     * Add a new task
     */
    addTask(task) {
        const tasks = getStoredTasks('tasks');

        tasks.push(task);

        return setStoredTasks('tasks', tasks);
    },

    /**
     * Remove a task by ID
     */
    removeTask(taskId) {
        console.log('removeTask', taskId);
        const tasks = getStoredTasks('tasks');

        const updatedTasks = tasks.filter(task => task.id !== taskId);

        return setStoredTasks('tasks', updatedTasks);
    }
};

function getStoredTasks(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function setStoredTasks(key, tasks) {
    localStorage.setItem(key, JSON.stringify(tasks));

    return tasks;
}

export default tasksService;
