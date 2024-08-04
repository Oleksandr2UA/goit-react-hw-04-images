import toast, { Toaster } from 'react-hot-toast';

import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/Searchbar';
import { fetchImages } from './helpers/fetch';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonEl } from './Button/Button';

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const notify = number =>
    toast(`We have found ${number} images by your request`);

  const onClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSubmit = userInput => {
    if (userInput === '') return alert('Введи хоч шось');
    if (userInput === value) return notify(images.length);

    setValue(userInput);
    setImages([]);
    setPage(1);
    setNoMore(false);
    // this.setState({ value: userInput, images: [], page: 1, noMore: false });
  };

  useEffect(() => {
    //! To skip first render, if not, when enter page, we get random pictures
    if (value === '') return;
    setIsLoading(true);

    fetchImages(value, page)
      .then(data => {
        if (!data.ok) {
          console.log('throw an error');
          throw new Error(data.json()); // У цьому випадку тут текст помилки
        }
        return data.json();
      })
      .then(data => data.hits)
      .then(res => {
        if (res.length === 0) return alert('We havent found results');
        notify(res.length * page);
        if (res.length < 12) setNoMore(true);
        setImages(prevImages => [...prevImages, ...res]);
      })
      .catch(error => {
        console.log('catch an error: ', error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
        console.log('finally');
      });
  }, [page, value]);

  return (
    <>
      <div style={{ paddingBottom: '50px' }}>
        <SearchBar onSubmit={onSubmit} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            duration: 4000,
            style: {
              background: '#8ff5b4',
              color: '#b95c5c',
            },

            // Default options for specific types
          }}
        />

        {error && <h2>There has been an error :(</h2>}
        {images.length > 0 && <ImageGallery images={images} />}

        {images.length > 0 && !isLoading && !noMore && (
          <ButtonEl onClick={onClick} />
        )}
        {isLoading && <Loader />}
      </div>
    </>
  );
};
