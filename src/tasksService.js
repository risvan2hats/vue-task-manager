import api from './api';

const tasksService = {

    useFetch() {
        
        return useLocalStorage('tasks', api.get('/todos'));
    }
};

function useLocalStorage(key, initialValue) {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
        return JSON.parse(storedValue);
    }
    return initialValue;
}

export default tasksService;