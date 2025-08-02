import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { newsAPI } from '../../services/api';
import type { Post, PostCreateRequest, PostUpdateRequest } from '../../types';
import { NewsGenre } from '../../types';
import './PostFormPage.css';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

interface FormValues {
    title: string;
    text: string;
    genre: string;
    isPrivate: boolean;
}

const validationSchema = Yup.object({
    title: Yup.string()
        .required('The title is required')
        .min(1, 'The title must be at least 1 character long')
        .max(50, 'The title cannot exceed 50 characters'),
    text: Yup.string()
        .required('The text is required')
        .min(1, 'The text must be at least 1 character long')
        .max(256, 'The text cannot exceed 256 characters'),
    genre: Yup.string()
        .required('Genre is required')
        .oneOf(Object.values(NewsGenre), 'Invalid genre selected'),
    isPrivate: Yup.boolean()
        .required('Privacy setting is required'),
});

const PostFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);
    
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(isEditMode);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (isEditMode && id) {
            const fetchPost = async () => {
                try {
                    const numericId = parseInt(id, 10);
                    if (isNaN(numericId)) {
                        setError('Invalid post ID');
                        setLoading(false);
                        return;
                    }
                    const fetchedPost = await newsAPI.getPostById(numericId);
                    setPost(fetchedPost);
                } catch (err) {
                    setError('Error fetching post for editing');
                    console.error('Error fetching post:', err);
                } finally {
                    setLoading(false);
                }
            };

            fetchPost();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            if (isEditMode && id) {
                const numericId = parseInt(id, 10);
                if (isNaN(numericId)) {
                    setError('Invalid post ID');
                    return;
                }
                
                const updateData: PostUpdateRequest = {};
                if (values.title !== post?.title) updateData.title = values.title;
                if (values.text !== post?.text) updateData.text = values.text;
                if (values.genre !== post?.genre) updateData.genre = values.genre as any;
                if (values.isPrivate !== post?.isPrivate) updateData.isPrivate = values.isPrivate;
                
                await newsAPI.updatePost(numericId, updateData);
            } else {
                const createData: PostCreateRequest = {
                    title: values.title,
                    text: values.text,
                    genre: values.genre as any,
                    isPrivate: values.isPrivate,
                };
                await newsAPI.createPost(createData);
            }
            
            navigate('/');
        } catch (err) {
            console.error('Error saving post:', err);
            setError(isEditMode ? 'Error updating post' : 'Error creating post');
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues: FormValues = {
        title: post?.title || '',
        text: post?.text || '',
        genre: post?.genre || NewsGenre.OTHER,
        isPrivate: post?.isPrivate || false,
    };

    if (loading) return <Loading />;

    if (error) return <Error message={error} isShowBack={true} />;

    return (
        <div className="post-form-page">
            <div className="post-form__header">
                <h1>{isEditMode ? 'Edit Post' : 'Create Post'}</h1>
                <Link to="/" className="btn btn--secondary">
                    ← Back to list
                </Link>
            </div>

            <div className="post-form__content">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ isSubmitting }) => (
                        <Form className="post-form">
                            <div className="form-group">
                                <label htmlFor="title" className="form-label">
                                    News Title *
                                </label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-input"
                                    placeholder="Enter news title (max 50 characters)"
                                />
                                <ErrorMessage 
                                    name="title" 
                                    component="div" 
                                    className="form-error" 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="text" className="form-label">
                                    News Text *
                                </label>
                                <Field
                                    as="textarea"
                                    id="text"
                                    name="text"
                                    className="form-textarea"
                                    placeholder="Enter news text (max 256 characters)"
                                    rows={6}
                                />
                                <ErrorMessage 
                                    name="text" 
                                    component="div" 
                                    className="form-error" 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="genre" className="form-label">
                                    Genre *
                                </label>
                                <Field
                                    as="select"
                                    id="genre"
                                    name="genre"
                                    className="form-select"
                                >
                                    <option value="">Select genre</option>
                                    <option value={NewsGenre.TECHNOLOGY}>Technology</option>
                                    <option value={NewsGenre.BUSINESS}>Business</option>
                                    <option value={NewsGenre.HEALTH}>Health</option>
                                    <option value={NewsGenre.OTHER}>Other</option>
                                </Field>
                                <ErrorMessage 
                                    name="genre" 
                                    component="div" 
                                    className="form-error" 
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label checkbox-label">
                                    <Field
                                        type="checkbox"
                                        name="isPrivate"
                                        className="form-checkbox"
                                    />
                                    Make this post private
                                </label>
                                <div className="form-help">
                                    Private posts are only visible to authorized users
                                </div>
                                <ErrorMessage 
                                    name="isPrivate" 
                                    component="div" 
                                    className="form-error" 
                                />
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn--primary"
                                >
                                    {isSubmitting 
                                        ? (isEditMode ? 'Saving...' : 'Creating...')
                                        : (isEditMode ? 'Save changes' : 'Create post')
                                    }
                                </button>
                                <Link 
                                    to={isEditMode && post ? `/post/${post.id}` : '/'}
                                    className="btn btn--secondary"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PostFormPage;
