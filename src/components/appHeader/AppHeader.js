import { useDispatch, useSelector } from 'react-redux'; 
import useHttp from '../../hooks/http.hook';
import { fetchData, setOnNewsPage } from '../../reducers/newsSlice'; // Импорт setOnNewsPage из Redux slice
import { Link } from 'react-router-dom';

import './AppHeader.css';

const AppHeader = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleUpdateClick = () => {
        fetchData(dispatch, request);
    };

    const isOnNewsPage = useSelector(state => state.news.isOnNewsPage);

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to={`/`} className='hackernews'>
                    <span>Hacker News</span>
                </Link>
            </h1>
            {!isOnNewsPage && (
                <button onClick={handleUpdateClick}>
                    Update info
                </button>
            )}
        </header>
    );
};

export default AppHeader;
