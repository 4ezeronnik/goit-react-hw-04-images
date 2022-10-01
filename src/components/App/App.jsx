import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from '../Searchbar/Searchbar';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchPicture } from 'services/api';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import mapperPictures from 'utils/mapperPictures';

import styles from '../App/App.module.css';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [activeButton, setActiveButton] = useState(true);

  const handleFormSubmit = (searchName) => {
    setSearchName(searchName);
    setPage(1);
    setPictures([]);
    setActiveButton(true);
  };

  useEffect(() => {

    if (!searchName) {
      return;
    }
    fetchImages(searchName, page);
  }, [searchName, page]);

  const fetchImages = (searchName, page) => {
    setIsLoading(true);

    fetchPicture(searchName, page)
      .then(({ data }) => {
        if (data.totalHits === 0) {
          Notiflix.Notify.warning('Oops, there is no image with that name');
          return;
        };
        if ((page - 1) * 12 > data.totalHits) {
          setActiveButton(false);
          Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
          return;
        }
        setPictures((prev) => [...prev, ...mapperPictures(data.hits)])
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  };

  const handlerLoadMore = () => {
    setPage((prev) => (prev + 1));
  };

  const openModal = (image, tags) => {
    setImage(image);
    setTags(tags);
  };

  const closeModal = () => {
    setImage('');
  };

  return (
<div className={styles.App}>
        
        <Searchbar onSubmit={handleFormSubmit} />
     
        {pictures.length > 1 && <ImageGallery pictures={pictures} handleModal={openModal} />}
        {pictures.length > 1 && activeButton && (
          <Button text="Load more" handleClick={handlerLoadMore} />)}
     
        {isLoading && <Loader />}
     
        {image && <Modal image={image} tags={tags} closeModal={closeModal} />}
    </div>
  );
};