import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './CourseInfo.css';

const CourseInfo = ({ courses, authors }) => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const course = courses.find((course) => course.id === courseId);

	if (!course) {
		return <p>Course not found</p>;
	}

	const getAuthorsNames = (authorIds) => {
		return authorIds
			.map((id) => {
				const author = authors.find((author) => author.id === id);
				return author ? author.name : '';
			})
			.join(', ');
	};

	return (
		<div className='course-info'>
			<h2>{course.title}</h2>
			<div className='course-details'>
				<div className='course-description'>
					<h3>Description:</h3>
					<p>{course.description}</p>
				</div>
				<div className='course-meta'>
					<p>
						<strong>ID:</strong> {course.id}
					</p>
					<p>
						<strong>Duration:</strong> {course.duration} minutes
					</p>
					<p>
						<strong>Created:</strong> {course.creationDate}
					</p>
					<p>
						<strong>Authors:</strong> {getAuthorsNames(course.authors)}
					</p>
				</div>
			</div>
			<div className='back-button'>
				<Button buttonText='Back' onClick={() => navigate('/courses')} />
			</div>
		</div>
	);
};

export default CourseInfo;
