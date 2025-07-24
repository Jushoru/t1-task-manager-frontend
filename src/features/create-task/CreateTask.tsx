import type { TaskUi, StatusType, CategoryType, PriorityType} from "../../entities/task/TaskTypes";
import { useState } from 'react';
import {
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Button,
} from '@mui/material';
import { validateTask } from '../../entities/task/TaskValidate';
import { useTaskStore } from "../../entities/task/TaskStore.ts";
import {nanoid} from "nanoid";
import dayjs, {Dayjs} from 'dayjs';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";


export interface CreateTaskFormProps {
    taskStatus: StatusType;
    onCancel: () => void;
}

export const CreateTask = ({ taskStatus, onCancel }: CreateTaskFormProps) => {
    const { createTask } = useTaskStore()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Test');
    const [priority, setPriority] = useState('Low');
    const [date, setDate] = useState<Dayjs>(dayjs());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const task: TaskUi = {
            id: nanoid(),
            date: date.toISOString(),
            title,
            description,
            category: category as CategoryType,
            status: taskStatus,
            priority: priority as PriorityType,
        };

        const errors = validateTask(task);

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        createTask(task);
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label={
                    <span>
                        Заголовок
                        <span style={{ color: 'var(--color-2)'}}>*</span>
                    </span>
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="dense"
                size="small"
            />
            <TextField
                fullWidth
                label="Описание задачи"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                size="small"

            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="category-select-label">
                    Категория
                    <span style={{ color: 'var(--color-2)'}}>*</span>
                </InputLabel>
                <Select
                    labelId="category-select-label"
                    value={category}
                    label="Категория"
                    size="small"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <MenuItem value="Bug">Bug</MenuItem>
                    <MenuItem value="Feature">Feature</MenuItem>
                    <MenuItem value="Documentation">Documentation</MenuItem>
                    <MenuItem value="Refactor">Refactor</MenuItem>
                    <MenuItem value="Test">Test</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="priority-select-label">
                    Приоритет
                    <span style={{ color: 'var(--color-2)'}}>*</span>
                </InputLabel>
                <Select
                    labelId="priority-select-label"
                    value={priority}
                    label="Приоритет"
                    size="small"
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Выберите дату создания"
                    value={date}
                    format="DD.MM.YYYY"
                    onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                            setDate(newDate);
                        }
                    }}
                    slotProps={{ textField: { size: 'small', fullWidth: true, margin: 'normal' } }}
                />
            </LocalizationProvider>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px' }}>
                <Button
                    sx={{border: 'solid 1px var(--color-button)', color: 'var(--color-button)'}}
                    variant="outlined" onClick={onCancel} size="small"
                >
                    Отмена
                </Button>
                <Button sx={{backgroundColor: 'var(--color-button)'}}
                        type="submit" variant="contained" size="small"
                >
                    Создать задачу
                </Button>
            </div>
        </form>
    );
};