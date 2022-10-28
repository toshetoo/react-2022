import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { saveTask, getTaskById } from "../../../utils/services/task-http-utils";
import { useNavigate, useParams } from "react-router";

import './TaskForm.scss';
import { useEffect } from "react";

export function TaskForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [currentTask, setCurrentTask] = useState({
        title: '',
        description: '',
        status: 'pending'
    });

    useEffect(() => {
        if (params.id) {
            getTaskById(params.id).then((response) => {
                setCurrentTask(response.data);
            });
        }
    }, [params.id])

    const onFormChange = (event) => {
        setCurrentTask((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        saveTask(currentTask).then(() => {
            navigate('/tasks');
        });
    }

    return (
        <div className="task-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" onChange={onFormChange} value={currentTask.title} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" onChange={onFormChange} value={currentTask.description} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status" onChange={onFormChange} value={currentTask.status}>
                        <option value="Pending">Pending</option>
                        <option value="InProgress" >In Progress</option>
                        <option value="Done">Done</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit">Save Task</Button>
            </Form>
        </div>
    );
}