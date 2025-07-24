import {ModalDialog} from "../../widgets/ModalDialog.tsx";
import {CreateTask} from "../../features/create-task/CreateTask.tsx";
import {useState, useEffect} from "react";
import type {StatusType} from "../../entities/task/TaskTypes.ts";
import {useNavigate, useParams} from "react-router-dom";

const isStatusType = (value: string): value is StatusType => {
    return ['ToDo', 'InProgress', 'Done'].includes(value);
};

export const CreateTaskModal = () => {
    const { status } = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [currentTaskStatus, setCurrentTaskStatus] = useState<StatusType>('ToDo');

    useEffect(() => {
        if (status) {
            if (isStatusType(status)) {
                setCurrentTaskStatus(status);
                setOpen(true);
            } else {
                console.warn(`Invalid status: ${status}`);
                navigate('/');
            }
        } else {
            setOpen(false);
        }
    }, [status, navigate]);

    const closeModal = () => {
        navigate('/')
    }

    return (
        <ModalDialog open={open} handleOnClose={closeModal} title={"Создание задачи"}>
            <CreateTask taskStatus={currentTaskStatus} onCancel={closeModal}/>
        </ModalDialog>
    );
};