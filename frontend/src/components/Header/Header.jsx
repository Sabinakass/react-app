import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Header/components/Logo/Logo';
import Button from '../../common/Button/Button';
import './header.css';

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const token = localStorage.getItem('token');
	const userName = localStorage.getItem('userName');

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		navigate('/login');
	};

	// Don't render the header on login and registration pages
	if (location.pathname === '/login' || location.pathname === '/registration') {
		return null;
	}

	return (
		<header className='header'>
			<div className='logo'>
				<Logo />
			</div>
			{token && (
				<div className='user-info'>
					<span>Welcome, {userName}!</span>
					<Button buttonText='LOGOUT' onClick={handleLogout} />
				</div>
			)}
		</header>
	);
};

export default Header;
