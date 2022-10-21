import './Main.scss';
import { Outlet } from 'react-router';

export function Main() {
    return (
        <div className="main-content">
            <Outlet />
        </div>
    );
}