import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserById } from "../../../utils/services/user-http-utils";
import { UserCard } from "../user-card/UserCard";

import './UserProfile.scss';
import { getTasks, saveTask } from "../../../utils/services/task-http-utils";

export function UserProfile() {
    const params = useParams();
    const [user, setUser] = useState({});
    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        if (params.id) {
            const promises = [getUserById(params.id), getTasks()];
            Promise.all(promises)
                .then(result => {
                    setUser(result[0].data);
                    setUserTasks(result[1].data);
                });
        }
    }, [params.id])

    return (
        <div className="user-profile">
            <div className="user-info">
                <UserCard user={user} />
            </div>
            <div className="user-tasks">
                {
                    userTasks && userTasks.map(task => {
                        const updateTask = (newStatus) => {
                            task.status = newStatus;
                            saveTask(task).then(() => {
                                setUserTasks((prevState) => {
                                    const taskToUpdate = prevState.find(t => t.id === task.id);
                                    taskToUpdate.status = newStatus;
                                    setUserTasks([...prevState]);
                                })
                            });
                        }

                        const renderActionButton = () => {
                            if (task.status === "Pending") {
                                return <button className="InProgress" onClick={() => updateTask("InProgress")}>Mark in progress</button>
                            }

                            if (task.status === "InProgress") {
                                return <button className="Done" onClick={() => updateTask("Done")}>Mark as Done</button>
                            }
                        }


                        const className = `user-task ${task.status}`;

                        return <div className={className} key={task.id}>
                            <div className="task-info">
                                <div>Title: {task.title}</div>
                                <div>Description: {task.description}</div>
                                <div>Status: {task.status}</div>
                                <div>Created date: {task.createdDate} </div>
                            </div>
                            <div className="action-button">
                                {renderActionButton()}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}