import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Registration.css';

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState('');
	const navigate = useNavigate();

	const validate = () => {
		const errors = {};
		if (!name) errors.name = 'Name is required';
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
			const newUser = { name, email, password };
			try {
				console.log('Sending request with data:', newUser); // Log the data being sent
				const response = await fetch('http://localhost:4000/register', {
					method: 'POST',
					body: JSON.stringify(newUser),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const result = await response.json();
				console.log('Response received:', result); // Log the response
				if (response.ok) {
					navigate('/login');
				} else {
					setApiError(result.message);
				}
			} catch (error) {
				console.error('Error during registration:', error); // Log the error
				setApiError('Failed to register. Please try again.');
			}
		}
	};

	return (
		<form className='registration-form' onSubmit={handleSubmit}>
			<h2>Registration</h2>
			<Input
				labelText='Name'
				placeholderText='Enter your name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			{errors.name && <p className='error'>{errors.name}</p>}
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
			<Button buttonText='Register' />
			{apiError && <p className='error'>{apiError}</p>}
			<p>
				Already have an account? <Link to='/login'>Login</Link>
			</p>
		</form>
	);
};

export default Registration;
