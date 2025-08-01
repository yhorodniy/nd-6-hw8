import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { newsAPI } from '../../services/api';
import { formatDate } from '../../services/dateFormatter';
import type { Post } from '../../types';
import './PostDetailPage.css';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

const PostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) {
                setError('News ID not found');
                setLoading(false);
                return;
            }

            try {
                const fetchedPost = await newsAPI.getPostById(id);
                setPost(fetchedPost);
            } catch (err) {
                setError('Error fetching post');
                console.error('Error fetching post:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (!post || !id) return;

        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (!confirmed) return;

        try {
            await newsAPI.deletePost(id);
            navigate('/');
        } catch (err) {
            console.error('Error deleting post:', err);
            alert('Error deleting post');
        }
    };

    if (loading) return <Loading />;

    if (error || !post) return  <Error message={error || 'Post not found'} isShowBack={true} />;

    return (
        <div className="post-detail-page">
            <div className="post-detail__actions">
                <Link to="/" className="btn btn--secondary">
                    ← Back to list
                </Link>
                <div className="post-detail__actions-right">
                    <Link to={`/edit/${post.id}`} className="btn btn--primary">
                        Edit
                    </Link>
                    <button 
                        onClick={handleDelete} 
                        className="btn btn--danger"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <article className="post-detail__content">
                <header className="post-detail__header">
                    <h1 className="post-detail__title">{post.title}</h1>
                    {post.createDate && (
                        <div className="post-detail__date">
                            {formatDate(post.createDate)}
                        </div>
                    )}
                </header>

                <div className="post-detail__text">
                    {post.text.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default PostDetailPage;
