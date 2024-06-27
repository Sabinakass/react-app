// AuthorItem.js
import React from 'react';
import Button from '../../common/Button/Button';
import './AuthorItem.css';

const AuthorItem = ({ name, onButtonClick, buttonText }) => {
	return (
		<div className='author-item'>
			<span>{name}</span>
			<Button buttonText={buttonText} onClick={onButtonClick} />
		</div>
	);
};

export default AuthorItem;
