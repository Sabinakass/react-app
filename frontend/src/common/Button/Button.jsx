import React from 'react';

const Button = ({ buttonText, onClick, ...props }) => {
	return (
		<button onClick={onClick} {...props}>
			{buttonText}
		</button>
	);
};

export default Button;
