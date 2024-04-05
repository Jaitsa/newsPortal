import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ErrorPage from '../errorPage/ErrorPage';
import useHttp from '../../hooks/http.hook';
import { fetchNewsRequest, fetchComments, setOnNewsPage } from '../../reducers/newsSlice';

import './NewsPage.css';

const NewsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { news, error } = useSelector(state => state.news);
    const { request } = useHttp();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (id) {
            dispatch(fetchNewsRequest());
        }
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(setOnNewsPage(true));
        return () => {
            dispatch(setOnNewsPage(false));
        };
    }, [dispatch]);

    useEffect(() => {
        if (news.length > 0 && id) {
            const selectedNews = news.find(item => item && item.id === parseInt(id));
            if (selectedNews && selectedNews.kids) {
                fetchComments(request, selectedNews.kids, setComments)
                    .catch(err => console.error('Error fetching comments:', err));
            }
        }
    }, [news, id, request]);

    const selectedNews = news.find(item => item && item.id === parseInt(id));

    if (!selectedNews || error) return <ErrorPage />;

    return (
        <div className="container mt-5">
            {selectedNews && (
                <div className='selectedNews plan'>
                    <h2 className="mb-4">{selectedNews.title}</h2>
                    <p><strong>Date:</strong> {new Date(selectedNews.time * 1000).toLocaleDateString()}</p>
                    <p><strong>Author:</strong> {selectedNews.by}</p>
                    <p><strong>Comments:</strong> {selectedNews.kids ? selectedNews.kids.length : 'No comments'}</p>
                    <ul className="list-group">
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <li key={comment.id} className="list-group-item">
                                    <p><span className="author">{comment.by}:</span> <br /> {comment.text}</p>
                                    <p>Date: {new Date(comment.time * 1000).toLocaleDateString()}</p>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">No comments at the moment...</li>
                        )}
                    </ul>

                    <div className='moreInfo mt-3' >
                        <Link to="/" className="btn btn-primary me-2">
                            Return to News List
                        </Link>
                        <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Go to News
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsPage;
