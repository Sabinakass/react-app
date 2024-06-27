import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState('');
	const navigate = useNavigate();

	const validate = () => {
		const errors = {};
		if (!email) errors.email = 'Email is required';
		if (!password) errors.password = 'Password is required';
		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			const user = { email, password };
			try {
				const response = await fetch('http://localhost:4000/login', {
					method: 'POST',
					body: JSON.stringify(user),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const result = await response.json();
				console.log('Response from backend:', result); // Log the entire response
				if (response.ok && result.successful) {
					const token =
						result.result && result.result.startsWith('Bearer ')
							? result.result.split(' ')[1]
							: null; // Extract token from "Bearer <token>"
					const name =
						result.user && result.user.name ? result.user.name : null; // Extract name from user object
					console.log('Token:', token); // Log token
					console.log('Name:', name); // Log name
					if (token && name) {
						localStorage.setItem('token', token);
						localStorage.setItem('userName', name);
						navigate('/courses');
					} else {
						setApiError('Invalid response from server');
					}
				} else {
					setApiError(result.message || 'Login failed. Please try again.');
				}
			} catch (error) {
				console.error('Error during login:', error); // Log the error
				setApiError('Failed to login. Please try again.');
			}
		}
	};

	return (
		<form className='login-form' onSubmit={handleSubmit}>
			<h2>Login</h2>
			<Input
				labelText='Email'
				placeholderText='Enter your email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			{errors.email && <p className='error'>{errors.email}</p>}
			<Input
				labelText='Password'
				placeholderText='Enter your password'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{errors.password && <p className='error'>{errors.password}</p>}
			<Button buttonText='Login' />
			{apiError && <p className='error'>{apiError}</p>}
			<p>
				Don't have an account? <Link to='/registration'>Register</Link>
			</p>
		</form>
	);
};

export default Login;
