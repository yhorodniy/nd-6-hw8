import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsAPI } from '../../services/api';
import PostCard from '../../components/PostCard/PostCard';
import Pagination from '../../components/Pagination/Pagination';
import type { Post, PaginatedResponse } from '../../types';
import './HomePage.css';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

const HomePage: React.FC = () => {
    const [paginatedData, setPaginatedData] = useState<PaginatedResponse<Post> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const pageSize: number = 10;

    const fetchPosts = async (page: number = 0) => {
        try {
            setLoading(true);
            const data = await newsAPI.getAllPosts({ page, size: pageSize });
            setPaginatedData(data);
            setError('');
        } catch (err) {
            setError('Error fetching posts');
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) return <Loading />

    if (error) return <Error message={error} />

    if (!paginatedData) return <Error message="No data available" />

    const { data: posts, pagination } = paginatedData;

    return (
        <div className="home-page">
            <header className="home-page__header">
                <h1>News</h1>
                <Link to="/create" className="btn btn--primary">
                    Add News
                </Link>
            </header>

            <div className="home-page__content">
                {posts.length === 0 ? (
                    <div className="empty-state">
                        <p>No posts available</p>
                        <Link to="/create" className="btn btn--secondary">
                            Create First Post
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="posts-info">
                            <p>
                                Showing {pagination.page * pagination.size + 1} - {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of {pagination.total} posts
                            </p>
                        </div>
                        <div className="posts-grid">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
