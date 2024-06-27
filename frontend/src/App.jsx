import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Header from './components/Header/Header';
import { mockedAuthorsList, mockedCoursesList } from './constants';

const App = () => {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const token = localStorage.getItem('token');

	const handleCreateCourse = (newCourse) => {
		setCourses((prevCourses) => [...prevCourses, newCourse]);
	};

	const handleAddAuthor = (newAuthor) => {
		setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
	};

	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route
					path='/courses'
					element={
						token ? (
							<Courses courses={courses} authors={authors} />
						) : (
							<Navigate to='/login' />
						)
					}
				/>
				<Route
					path='/courses/add'
					element={
						token ? (
							<CreateCourse
								onCreateCourse={handleCreateCourse}
								onAddAuthor={handleAddAuthor}
								authors={authors}
							/>
						) : (
							<Navigate to='/login' />
						)
					}
				/>
				<Route
					path='/courses/:courseId'
					element={
						token ? (
							<CourseInfo courses={courses} authors={authors} />
						) : (
							<Navigate to='/login' />
						)
					}
				/>
				<Route
					path='/'
					element={
						token ? <Navigate to='/courses' /> : <Navigate to='/login' />
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
