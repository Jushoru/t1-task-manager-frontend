import './EditTask.css'
import type { TaskUi, StatusType, CategoryType, PriorityType} from "../../entities/task/TaskTypes";
import { useState } from 'react';
import {
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Button,
    IconButton,
} from '@mui/material';
import { validateTask } from '../../entities/task/TaskValidate';
import { useTaskStore } from "../../entities/task/TaskStore.ts";
import { DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export interface CreateTaskFormProps {
    editTask: TaskUi;
    onCancel: () => void;
}

export const EditTask = ({ editTask, onCancel }: CreateTaskFormProps) => {
    const { updateTask, deleteTask } = useTaskStore();

    const [title, setTitle] = useState(editTask.title);
    const [description, setDescription] = useState(editTask.description);
    const [category, setCategory] = useState(editTask.category);
    const [status, setStatus] = useState(editTask.status);
    const [priority, setPriority] = useState(editTask.priority);
    const [date, setDate] = useState<Dayjs | null>(editTask.date ? dayjs(editTask.date) : null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedTask: TaskUi = {
            id: editTask.id,
            date: date?.toISOString() || '',
            title,
            description,
            category: category as CategoryType,
            status: status as StatusType,
            priority: priority as PriorityType,
        };

        const errors = validateTask(updatedTask);

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        updateTask(editTask.id, updatedTask);
        onCancel();
    };

    const handleDelete = (id: string) => {
        const isConfirmed = window.confirm('Вы уверены, что хотите удалить эту задачу?');

        if (isConfirmed) {
            deleteTask(id);
            onCancel();
        }
    }

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
                multiline
                maxRows={4}
            />
            <TextField
                fullWidth
                label="Описание задачи"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                size="small"
                multiline
                maxRows={4}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="category-select-label" >
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
                    Статус
                    <span style={{ color: 'var(--color-2)'}}>*</span>

                </InputLabel>
                <Select
                    labelId="priority-select-label"
                    value={status}
                    label="Статус"
                    size="small"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="ToDo">ToDo</MenuItem>
                    <MenuItem value="InProgress">InProgress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
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
                    onChange={(newDate) => setDate(newDate)}
                    slotProps={{ textField: { size: 'small', fullWidth: true, margin: 'normal' } }}
                />
            </LocalizationProvider>
            <div className="buttonsWrapper">
                <div>
                    <Button
                        sx={{border: 'solid 1px var(--color-button)', color: 'var(--color-button)'}}
                        variant="outlined" onClick={onCancel} size="small"
                    >
                        Отмена
                    </Button>
                    <IconButton
                        sx={{border: 'solid 1px var(--color-2)', color: 'var(--color-2)', marginLeft: '1rem', borderRadius: '4px'}}
                        size="small"
                        children={<DeleteForeverIcon/>}
                        onClick={() => handleDelete(editTask.id)}
                    />
                </div>
                <Button sx={{backgroundColor: 'var(--color-button)'}}
                        type="submit" variant="contained" size="small"
                >
                    Сохранить изменения
                </Button>
            </div>
        </form>
    );
};