import { Button, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import './Styles/NavBarStyle.css';

export default function NavBar() {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    return (
        <Menu inverted vertical fixed="left" className="sidebar">
                <br />
                {token && (              
                <Menu.Item as={NavLink} to='/cars'>
                    <Button
                        className="button-menu"
                        content="Lista samochodów"
                        size="large"
                    />
                </Menu.Item>
                )}
                <br />
                {token &&
                (
                    <Menu.Item as={NavLink} to='/create'>
                    <Button
                        className="button-menu"
                        content="Stwórz samochód"
                        size="large"
                    />
                </Menu.Item>
                )}
                {token ? (
                <Menu.Item>
                    <Button
                        className="button-menu"
                        content="Wyloguj się"
                        size="large"
                        onClick={handleLogout}  // Wylogowanie po kliknięciu
                    />
                </Menu.Item>
            ) : (
                // Jeśli użytkownik nie jest zalogowany, pokaż przyciski logowania i rejestracji
                <>
                    <Menu.Item as={NavLink} to='/login'>
                        <Button
                            className="button-menu"
                            content="Logowanie"
                            size="large"
                        />
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/register'>
                        <Button
                            className="button-menu"
                            content="Rejestracja"
                            size="large"
                        />
                    </Menu.Item>
                </>
            )}
        </Menu>
    );
}
