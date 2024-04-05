import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useHttp from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../errorPage/ErrorPage';
import { fetchData } from '../../reducers/newsSlice';

import './NewsList.css';

const NewsList = () => {
  const dispatch = useDispatch();
  const { loading, news, error } = useSelector(state => state.news);
  const { request } = useHttp();

  useEffect(() => {
    fetchData(dispatch, request);
  }, [dispatch, request]);

  if (loading) return <div><Spinner /></div>;
  if (error) return <div><ErrorPage /></div>;
  return (
    <ul className="news-list">
      {news.map((item, index) => (
        item && item.id ? (
          <li key={index} className="news-item">
            <Link to={`/news/${item.id}`} className="news-title">{item.title}</Link>
            <p className="news-author">Author: {item.by}</p>
            <p className="news-rating">Rating: {item.score}</p>
            <p className="news-date">Date: {new Date(item.time * 1000).toLocaleString()}</p>
          </li>
        ) : null
      ))}
    </ul>
  );
};

export default NewsList;
