import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles, setCategory, setCurrentPage, setSearchTerm } from '../redux/actions';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import styles from './Articles.module.css';

export default function ArticleList() {
    const dispatch = useDispatch();
    const { articles, totalResults, category, searchTerm, currentPage, loading, error } = useSelector(state => state.articles);

    useEffect(() => {
        dispatch(fetchArticles(category, searchTerm, currentPage));
    }, [category, searchTerm, currentPage, dispatch]);

    const handleCategoryClick = (category) => {
        dispatch(setCategory(category));
    };

    const handleSearch = (keyword) => {
        dispatch(setSearchTerm(keyword));
    };

    const paginate = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    return (
        <>
            <div className={styles.search}>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.categoryContainer}>
                <ul className={styles.categoryList}>
                    {["Business", "Technology", "Entertainment", "Sports"].map((cat, index) => (
                        <li key={index} className={styles.categoryItem}>
                            <button
                                className={`${styles.categoryButton} ${category === cat ? styles.active : ''}`}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.articlecon}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <div className={styles.articlelist}>
                            {articles.length > 0 ? (
                                articles.map((article, index) => (
                                    <div key={index} className={styles.article}>
                                        {article.urlToImage && <img src={article.urlToImage} alt={article.title} className={styles.articleImage} />}
                                        <h3 className={styles.articleTitle}>{article.title}</h3>
                                        <p className={styles.articleDescription}>{article.description}</p>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.articleLink}>Read more</a>
                                    </div>
                                ))
                            ) : (
                                <p>No articles found</p>
                            )}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalResults / 5)}
                            paginate={paginate}
                        />
                    </>
                )}
            </div>
        </>
    );
}
