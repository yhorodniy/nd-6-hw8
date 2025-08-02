import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../../types';
import { NewsGenre } from '../../types';
import { formatDate } from '../../services/dateFormatter';
import './PostCard.css';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const getGenreColor = (genre: string) => {
        switch (genre) {
            case NewsGenre.TECHNOLOGY:
                return '#e74c3c';
            case NewsGenre.BUSINESS:
                return '#3498db';
            case NewsGenre.HEALTH:
                return '#27ae60';
            case NewsGenre.OTHER:
                return '#95a5a6';
            default:
                return '#95a5a6';
        }
    };

    return (
        <div className="post-card">
            <Link to={`/post/${post.id}`} className="post-card__link">
                <div className="post-card__header">
                    <span 
                        className="post-card__genre"
                        style={{ backgroundColor: getGenreColor(post.genre) }}
                    >
                        {post.genre}
                    </span>
                    {post.isPrivate && (
                        <span className="post-card__private">🔒 Private</span>
                    )}
                </div>
                <h3 className="post-card__title">{post.title}</h3>
                <p className="post-card__text">{post.text}</p>
                <div className="post-card__date">
                    {formatDate(post.createDate)}
                </div>
            </Link>
        </div>
    );
};

export default PostCard;
