import type {StatusType} from "@/entities/task/TaskTypes.ts";
import { TaskItem } from "../task-item/TaskItem.tsx";
import {Button} from "@mui/material";
import './TaskList.css';
import AddIcon from '@mui/icons-material/Add';
import {useTaskStore} from "@/entities/task/TaskStore.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const TaskList = () => {
    const { getTasks, tasks } = useTaskStore(); // Используем tasks из стора
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                await getTasks(); // Загружаем задачи
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [getTasks]);

    const todoTasks = tasks.filter(task => task.status === 'ToDo');
    const inProgressTasks = tasks.filter(task => task.status === 'InProgress');
    const doneTasks = tasks.filter(task => task.status === 'Done');

    const createTask = (status: StatusType) => {
        navigate('task/new/' + status);
    }

    if (isLoading) {
        return <div>Loading...</div>; // Или любой другой индикатор загрузки
    }

    return (
        <div className="TaskBoard">
            <div className="TaskColumn">
                <h3>Открыто</h3>
                <div className="TaskColumnContent">
                    {todoTasks.map((task, index) => (
                        <TaskItem key={index} task={task} />
                    ))}
                </div>
                <Button
                    sx={{backgroundColor: 'var(--color-button)'}}
                    size="small" variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => createTask('ToDo')}
                >
                    Добавить задачу
                </Button>
            </div>

            <div className="TaskColumn">
                <h3>В работе</h3>
                <div className="TaskColumnContent">
                    {inProgressTasks.map((task, index) => (
                        <TaskItem key={index} task={task} />
                    ))}
                </div>
                <Button
                    sx={{backgroundColor: 'var(--color-button)'}}
                    size="small" variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => createTask("InProgress")}
                >
                    Добавить задачу
                </Button>
            </div>

            <div className="TaskColumn">
                <h3>Готово</h3>
                <div className="TaskColumnContent">
                    {doneTasks.map((task, index) => (
                        <TaskItem key={index} task={task} />
                    ))}
                </div>
                <Button
                    sx={{backgroundColor: 'var(--color-button)'}}
                    size="small" variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => createTask("Done")}
                >
                    Добавить задачу
                </Button>
            </div>
        </div>
    );
};