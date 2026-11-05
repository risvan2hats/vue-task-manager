
import api from './api';

const tasksService = {

    /**
     * Fetch tasks from API if not cached
     * Apply search, status, sorting and pagination locally
     */
    async useFetch(filter = {}) {
        let tasks = getStoredTasks('tasks');

        if (!tasks.length) {
            const response = await api.get('/todos?limit=0');
            setStoredTasks('tasks', response.data.todos);
            tasks = getStoredTasks('tasks');
        }

        let limit   = filter.limit || 10;
        let page    = filter.page || 1;
        let search  = filter.search || '';
        let status  = filter.status || 'all';
        let sort    = filter.sort || 'id';

        // Search tasks
        if (search) {
            tasks = tasks.filter(task =>
                task.todo.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter by status
        if (status !== 'all') {
            tasks = tasks.filter(task =>
                status === 'completed' ? task.completed : !task.completed
            );
        }

        // Sort tasks
        tasks.sort((a, b) => {
            if (sort === 'id') {
                return b.id - a.id; // Newest first
            }

            if (sort === 'todo') {
                return a.todo.localeCompare(b.todo); // Title A-Z
            }

            return 0;
        });

        // Pagination
        const total = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;

        const start = (page - 1) * limit;

        tasks = limit > 0
            ? tasks.slice(start, start + limit)
            : tasks;


        return {
            tasks,
            total,
            completedTasks,
            page,
            limit,
            totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
        };
    },

    /**
     * Add a new task
     */
    addTask(task) {
        const tasks = getStoredTasks('tasks');
        tasks.push(task);
        setStoredTasks('tasks', tasks);

        return this.useFetch();
    },

    /**
     * Remove a task by ID
     */
    removeTask(taskId) {
        const tasks = getStoredTasks('tasks');
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setStoredTasks('tasks', updatedTasks);

        return this.useFetch();
    },

    /**
     * Complete a task by ID
     */
    completeTask(taskId) {
        const tasks = getStoredTasks('tasks');
        const updatedTasks = tasks.map(task =>
            task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
        );
        setStoredTasks('tasks', updatedTasks);

        return this.useFetch();
    },

    /**
     * Refresh tasks, remove cached tasks and fetch new ones
     */
    refreshTasks() {
        localStorage.removeItem('tasks');

        return this.useFetch();
    },
};

/**
 * Get tasks from localStorage
 */
function getStoredTasks(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

/**
 * Set tasks in localStorage
 */
function setStoredTasks(key, tasks) {
    localStorage.setItem(key, JSON.stringify(tasks));
}

export default tasksService;