import React from 'react';
import Button from '../../../../common/Button/Button';
import './CourseCard.css';

const CourseCard = ({ course, onShowCourse, getAuthorsNames }) => {
	const { title, duration, creationDate, description, authors } = course;

	const formatDuration = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins} ${hours === 1 ? 'hour' : 'hours'}`;
	};

	return (
		<div className='course-card'>
			<div className='course-card-info'>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<div className='course-card-details'>
				<p>
					<strong>Authors:</strong> {getAuthorsNames(authors)}
				</p>
				<p>
					<strong>Duration:</strong> {formatDuration(duration)}
				</p>
				<p>
					<strong>Created:</strong> {creationDate}
				</p>
				<div className='course-button'>
					<Button buttonText='Show Course' onClick={onShowCourse} />
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
