// src/common/Input/Input.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({
	labelText,
	placeholderText,
	value,
	onChange,
	type = 'text',
}) => (
	<div className='input-group'>
		<label>{labelText}</label>
		<input
			type={type}
			placeholder={placeholderText}
			value={value}
			onChange={onChange}
		/>
	</div>
);

Input.propTypes = {
	labelText: PropTypes.string.isRequired,
	placeholderText: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string,
};

export default Input;
