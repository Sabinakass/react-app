import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from '../AuthorItem/AuthorItem';
import './CreateCourse.css';
import { v4 as uuidv4 } from 'uuid';

const CreateCourse = ({ onCreateCourse, onAddAuthor, authors }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [availableAuthors, setAvailableAuthors] = useState([]);
	const [newAuthor, setNewAuthor] = useState('');
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		setAvailableAuthors(authors);
	}, [authors]);

	const addAuthorToCourse = (author) => {
		setCourseAuthors((prevCourseAuthors) => [...prevCourseAuthors, author]);
		setAvailableAuthors((prevAvailableAuthors) =>
			prevAvailableAuthors.filter((a) => a.id !== author.id)
		);
	};

	const removeAuthorFromCourse = (author) => {
		setAvailableAuthors((prevAvailableAuthors) => [
			...prevAvailableAuthors,
			author,
		]);
		setCourseAuthors((prevCourseAuthors) =>
			prevCourseAuthors.filter((a) => a.id !== author.id)
		);
	};

	const createNewAuthor = (e) => {
		e.preventDefault();
		if (newAuthor.trim().length >= 2) {
			const newAuthorObject = { id: uuidv4(), name: newAuthor };
			setAvailableAuthors((prevAvailableAuthors) => {
				const updatedAuthors = [...prevAvailableAuthors, newAuthorObject];
				// Prevent duplication by filtering out existing authors
				return updatedAuthors.filter(
					(author, index, self) =>
						index === self.findIndex((a) => a.id === author.id)
				);
			});
			onAddAuthor(newAuthorObject);
			setNewAuthor('');
			setErrors({ ...errors, newAuthor: '' });
		} else {
			setErrors({
				...errors,
				newAuthor: 'Author name must be at least 2 characters long',
			});
		}
	};

	const validate = () => {
		const errors = {};
		if (!title) errors.title = 'Title is required';
		if (title.length < 2) errors.title = 'Title must be at least 2 characters';
		if (!description) errors.description = 'Description is required';
		if (description.length < 2)
			errors.description = 'Description must be at least 2 characters';
		if (duration <= 0) errors.duration = 'Duration must be greater than 0';
		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			const newCourse = {
				id: uuidv4(),
				title,
				description,
				creationDate: new Date().toLocaleDateString('en-GB'),
				duration,
				authors: courseAuthors.map((author) => author.id),
			};
			onCreateCourse(newCourse);
			setTitle('');
			setDescription('');
			setDuration(0);
			setCourseAuthors([]);
			setErrors({});
			navigate('/courses');
		}
	};

	const formatDuration = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
	};

	return (
		<div>
			<h2>Course Edit/Create Page</h2>
			<form className='create-course-form' onSubmit={handleSubmit}>
				<div className='section'>
					<h3>Main Info</h3>
					<Input
						labelText='Title'
						placeholderText='Enter course title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{errors.title && <p className='error-text'>{errors.title}</p>}
					<div className='input-group'>
						<label>Description</label>
						<textarea
							placeholder='Enter course description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className={errors.description ? 'input-error' : ''}
						/>
						{errors.description && (
							<p className='error-text'>{errors.description}</p>
						)}
					</div>
				</div>
				<div className='section'>
					<h3>Duration</h3>
					<Input
						labelText='Duration (minutes)'
						placeholderText='Enter course duration'
						type='number'
						value={String(duration)}
						onChange={(e) => setDuration(Number(e.target.value))}
					/>
					{errors.duration && <p className='error-text'>{errors.duration}</p>}
					<p>Duration: {formatDuration(duration)}</p>
				</div>
				<div className='authors-section'>
					<div className='available-authors'>
						<h3>Available Authors</h3>
						{availableAuthors.map((author) => (
							<AuthorItem
								key={author.id}
								name={author.name}
								onButtonClick={() => addAuthorToCourse(author)}
								buttonText='Add Author'
							/>
						))}
					</div>
					<div className='course-authors'>
						<h3>Course Authors</h3>
						{courseAuthors.length === 0 ? (
							<p>Author list is empty</p>
						) : (
							courseAuthors.map((author) => (
								<AuthorItem
									key={author.id}
									name={author.name}
									onButtonClick={() => removeAuthorFromCourse(author)}
									buttonText='Remove Author'
								/>
							))
						)}
					</div>
				</div>
				<div className='new-author-section'>
					<h3>New Author</h3>
					<Input
						labelText='Author Name'
						placeholderText='Enter author name'
						value={newAuthor}
						onChange={(e) => setNewAuthor(e.target.value)}
					/>
					<Button
						buttonText='Create Author'
						onClick={createNewAuthor}
						type='button'
					/>
					{errors.newAuthor && <p className='error-text'>{errors.newAuthor}</p>}
				</div>
				<div className='create-course-button'>
					<Button buttonText='Create Course' />
				</div>
			</form>
		</div>
	);
};

export default CreateCourse;
