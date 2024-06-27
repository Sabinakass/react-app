import React from 'react';
import Button from '../../common/Button/Button';
import './EmptyCourseList.css';

const EmptyCourseList = ({ onAddNewCourse }) => {
	return (
		<div className='empty-course-list'>
			<h2>Your List Is Empty</h2>
			<p>Please use 'Add New Course' button to add your first course</p>
			<Button buttonText='Add New Course' onClick={onAddNewCourse} />
		</div>
	);
};

export default EmptyCourseList;
