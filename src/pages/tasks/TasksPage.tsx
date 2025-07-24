import {TaskList} from '../../widgets/task-list/TaskList';
import {EditTaskModal} from "../edit-task/EditTaskModal.tsx";
import {CreateTaskModal} from "../createTaskModal/CreateTaskModal.tsx";

export const TasksPage: React.FC = () => {

    return (
        <>
            <TaskList/>
            <CreateTaskModal/>
            <EditTaskModal/>
        </>
    );
};