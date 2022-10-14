import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export function UserCard({ user }) {
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
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}