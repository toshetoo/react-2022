import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import { getLoggedUser } from '../../../utils/services/auth-http-utils';

export function UserCard({ user, onDelete }) {

    const navigate = useNavigate();

    const onDeleteClicked = () => {
        onDelete(user.id);
    }

    const navigateToUpdate = () => {
        navigate(`/users/edit/${user.id}`);
    }

    const renderActionButtons = () => {
        const loggedUser = getLoggedUser();
        if (loggedUser.id === user.id) {
            return <Card.Link onClick={navigateToUpdate} >Update</Card.Link>;
        }

        return <>
            <Card.Link onClick={navigateToUpdate} >Update</Card.Link>
            <Card.Link onClick={onDeleteClicked}>Delete</Card.Link>
        </>
    }

    return (
        <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Img variant="top" src={user.photo} />
            <Card.Body>
                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Address: {user.address}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email} </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                {renderActionButtons()}
            </Card.Body>
        </Card>
    );
}