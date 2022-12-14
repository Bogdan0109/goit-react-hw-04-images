// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Wrapper } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { addMaterial } from 'services/Pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import scrollToNewImages from 'services/Scroll-to-new-images';

export function App() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [pageHight, setPageHight] = useState(null);
  const [endOfCollection, setEndOfCollection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [waitingSearched, setWaitingSearched] = useState(true);

  const formSubmitHandler = data => {
    if (query === data) return;

    setQuery(data);
    setPhotos([]);
    setEndOfCollection(false);
    setPage(1);
  };

  useEffect(() => {
    if (query === '') return;

    setTimeout(() => scrollToNewImages(pageHight), 500);
    setIsLoading(true);
    setWaitingSearched(false);

    const controller = new AbortController();

    const resultFetch = async () => {
      try {
        const { hits, pages, totalHits } = await addMaterial(
          query,
          page,
          controller.signal
        );
        const normalizedHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        setPhotos(prevState => [...prevState, ...normalizedHits]);
        setTotalHits(totalHits);

        if (page === pages) {
          setEndOfCollection(true);
        }

        if (totalHits === 0) {
          setWaitingSearched(true);
        }
      } catch (error) {
        setError('Мы не смогли загрузить фото');
      } finally {
        setIsLoading(false);
      }
    };

    resultFetch();

    return () => {
      controller.abort();
    };
  }, [page, pageHight, query]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    setPageHight(document.body.scrollHeight);
  };

  return (
    <>
      {error && (
        <div style={{ margin: '0 auto', color: 'red' }}>
          <h1>Ошибка запроса:</h1>
          <h2
            style={{
              textDecoration: 'underline',
              fontStyle: 'italic',
              color: '#a10000',
            }}
          >
            !!! {error}
          </h2>
        </div>
      )}
      <Searchbar onSubmit={formSubmitHandler} />
      <Wrapper className="Reviews">
        {waitingSearched && (
          <h1 style={{ margin: '0 auto' }}>Let's find some images</h1>
        )}

        {totalHits !== 0 && <ImageGallery photos={photos} />}

        {isLoading && <Loader />}

        {!endOfCollection && !isLoading && !waitingSearched ? (
          <Button onClick={loadMore} />
        ) : null}
      </Wrapper>
    </>
  );
}
