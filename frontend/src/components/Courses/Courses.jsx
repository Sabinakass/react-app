import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import Button from '../../common/Button/Button';
import './Courses.css';

const Courses = ({ courses, authors }) => {
	const navigate = useNavigate();

	const getAuthorsNames = (authorIds) => {
		return authorIds
			.map((id) => {
				const author = authors.find((author) => author.id === id);
				return author ? author.name : '';
			})
			.join(', ');
	};

	return (
		<div className='courses'>
			<div className='courses-header'>
				<Button
					buttonText='Add New Course'
					onClick={() => navigate('/courses/add')}
				/>
			</div>
			{courses.length > 0 ? (
				courses.map((course) => (
					<CourseCard
						key={course.id}
						course={course}
						onShowCourse={() => navigate(`/courses/${course.id}`)}
						getAuthorsNames={getAuthorsNames}
					/>
				))
			) : (
				<EmptyCourseList onAddNewCourse={() => navigate('/courses/add')} />
			)}
		</div>
	);
};

export default Courses;
