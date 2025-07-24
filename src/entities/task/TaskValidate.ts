import type {TaskUi} from "./TaskTypes.ts";

export const validateTask = (task: Partial<TaskUi>): string[] => {
    const errors: string[] = [];

    if (!task.title || task.title.trim().length === 0) {
        errors.push('Поле "Заголовок" обязательное');
    }

    if (!task.category) {
        errors.push('Поле "Категория" обязательное');
    }

    if (!task.priority) {
        errors.push('Поле "Приоритет" обязательное');
    }

    return errors;
};