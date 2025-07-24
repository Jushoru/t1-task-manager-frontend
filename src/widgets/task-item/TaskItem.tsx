import './TaskItem.css'
import type {TaskUi} from "../../entities/task/TaskTypes.ts";
import {Chip} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface TaskItemProps {
    task: TaskUi;
}

export const TaskItem: React.FC<TaskItemProps> = ({task}) => {
    const navigate = useNavigate();

    const viewTask = (task: TaskUi) => {
        const id = task.id;
        navigate('/task/' + id);
    };

    const formattedDate = dayjs(task.date).format('DD.MM.YYYY');

    return (
        <div className="taskItemWrapper" onClick={() => viewTask(task)}>
            <div>
                <h3>{task.title}</h3>
                {task.description && <p className="taskDescription">{task.description}</p>}
            </div>
            <div className="footerItemsWrap">
                <div className="tagsWrapper">
                    <Chip label={task.priority} color="secondary" size="small" className="chipBold"/>
                    <Chip label={task.category} color="primary" size="small" className="chipBold"/>
                </div>
                <p>{formattedDate}</p>
            </div>
        </div>

    )
}
