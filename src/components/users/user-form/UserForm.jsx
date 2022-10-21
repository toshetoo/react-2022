import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { saveUser, getUserById } from '../../../utils/services/user-http-utils';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

import './UserForm.scss';

export function UserForm() {
    const emptyUser = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        photo: ''
    };
    const [currentUser, setCurrentUser] = useState(emptyUser);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getUserById(params.id)
                .then((response) => {
                    setCurrentUser(response.data);
                })
        } else {
            setCurrentUser(emptyUser);
        }
    }, [params.id]);

    const onFormControlChange = (event) => {
        setCurrentUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(currentUser);
        saveUser(currentUser).then(() => {
            navigate('/users');
        });
    }

    return (
        <div className="user-form-wrapper">
            <Form className="user-form" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={onFormControlChange} value={currentUser.firstName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={onFormControlChange} value={currentUser.lastName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email" onChange={onFormControlChange} value={currentUser.email} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter Address" onChange={onFormControlChange} value={currentUser.address} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={onFormControlChange} value={currentUser.password} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="text" name="photo" placeholder="Enter photo" onChange={onFormControlChange} value={currentUser.photo} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}