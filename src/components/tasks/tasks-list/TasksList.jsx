import { useState } from "react";
import { Table } from "react-bootstrap";
import { useEffect } from "react";
import { getTasks, deleteTask } from "../../../utils/services/task-http-utils";

import './TasksList.scss';
import { useNavigate } from "react-router";

const wrapperStyles = {
    margin: '20px'
};

export function TasksList() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks().then((response) => {
            setTasks(response.data);
        });
    }, [])

    const renderTableBody = () => {
        return tasks.map(task => {
            const onEdit = () => {
                navigate(`/tasks/edit/${task.id}`);
            }

            const onDelete = () => {
                deleteTask(task.id).then(() => {
                    setTasks((allTasks) => {
                        return allTasks.filter(t => t.id !== task.id);
                    });
                });
            }

            return <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.authorName}</td>
                <td>{task.createdDate}</td>
                <td className="action-buttons">
                    <button className="edit" onClick={onEdit}>Edit</button>
                    <button className="delete" onClick={onDelete}>Delete</button>
                </td>
            </tr>
        })
    }

    return (
        <div className="tasks-list" style={wrapperStyles}>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Status</td>
                        <td>Author</td>
                        <td>Created date</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </Table>
        </div>
    );
}