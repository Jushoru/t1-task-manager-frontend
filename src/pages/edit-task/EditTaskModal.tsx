import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type {TaskUi} from "@/entities/task/TaskTypes.ts";
import {ModalDialog} from "@/widgets/ModalDialog.tsx";
import {EditTask} from "@/features/edit-task/EditTask.tsx"
import {useTaskStore} from "@/entities/task/TaskStore.ts";
import {CircularProgress, Box} from "@mui/material";

export const EditTaskModal = () => {
    const { id: taskId } = useParams();
    const navigate = useNavigate();

    const [taskData, setTaskData] = useState<TaskUi | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const getTaskById = useTaskStore((state) => state.getTaskById);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchTask = async () => {
            if (!taskId) {
                setOpen(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const task = await getTaskById(taskId);
                setTaskData(task);
                setOpen(true);
            } catch (err) {
                setError('Не удалось загрузить задачу');
                console.error('Failed to fetch task:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [taskId, getTaskById]);

    const closeModal = () => {
        navigate('/');
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <ModalDialog open={true} handleOnClose={closeModal} title="Ошибка">
                <div>{error}</div>
            </ModalDialog>
        );
    }

    return (
        <>
            {taskData && (
                <ModalDialog open={open} handleOnClose={closeModal} title={"Задача"}>
                    <EditTask editTask={taskData} onCancel={closeModal}/>
                </ModalDialog>
            )}
        </>
    );
};