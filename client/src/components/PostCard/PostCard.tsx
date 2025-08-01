import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../../types';
import { formatDate } from '../../services/dateFormatter';
import './PostCard.css';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    

    return (
        <div className="post-card">
            <Link to={`/post/${post.id}`} className="post-card__link">
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
