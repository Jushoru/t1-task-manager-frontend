import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {TasksPage} from "../pages/tasks/TasksPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <TasksPage />,
        children: [
            {
                path: 'task/:id',
                element: null,
            },
            {
                path: 'task/new/:status',
                element: null,
            }
        ],
    },
    ],
    { basename: import.meta.env.BASE_URL }
);

function App() {

  return (
    <>
        <header>
            <div className="logoWrapper">
                <img src={`${import.meta.env.BASE_URL}/logo.svg`} alt="logo" width="35"/>
                <span className="logoTitle">Тасочный менеджеритель</span>
            </div>
        </header>
        <div className="mainWrapper">
            <RouterProvider router={router}/>
        </div>
    </>
  )
}

export default App
