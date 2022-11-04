import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getLoggedUser } from '../../utils/services/auth-http-utils';

export function Header() {

    const navigate = useNavigate();

    const onLogout = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    const renderCreateUserLink = () => {
        const loggedUser = getLoggedUser();

        if (loggedUser.isAdmin) {
            return <Link className="nav-link" to="/users/create">Create user</Link>
        }
    }

    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/users">Users</Link>
                            {renderCreateUserLink()}
                            <Link className="nav-link" to="/tasks">Tasks</Link>
                            <Link className="nav-link" to="/tasks/create">Create task</Link>
                        </Nav>
                        <Link className="nav-link" onClick={onLogout} > Logout </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}