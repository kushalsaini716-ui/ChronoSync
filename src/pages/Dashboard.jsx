import { useState } from "react";
import { useEffect } from "react";

import Navbar from "../components/Navbar";
import TaskGrid from "../components/Taskgrid";
import CreateTaskModal from "../components/CreateTaskModal";

import api from "../services/api";

import "../styles/Dashboard.css";

export default function Dashboard({ user,setUser }) {

    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);


    const loadTasks = async () => {
        try {
            const res = await api.get("/api/nexus/tasks");
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreateTask = async (task) => {
        try {
            await api.post("/api/nexus/tasks", task);

            loadTasks();
            setShowModal(false);

        } catch (err) {
            console.error(err);
        }
    };

    const deleteTask = async (id) => {
        try{
            await api.delete(`/api/nexus/tasks/${id}`);

            loadTasks();

        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);


    const handleLogout = async() => {
        try{
            await api.post("/api/auth/logout");

            setUser(null);
        }catch(error){
            console.error(error);
        }
    };


    return (

        <>

            <Navbar
                user={user}
                onNewTask={() => setShowModal(true)}
                onLogout={handleLogout}
            />
            <div className="dashboard">

                <h3>
                    ACTIVE TASKS ({tasks.length})
                </h3>

                <TaskGrid

                    tasks={tasks}

                    onDelete={deleteTask}

                />

                <CreateTaskModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreateTask}
                />

            </div>

        </>

    );

}