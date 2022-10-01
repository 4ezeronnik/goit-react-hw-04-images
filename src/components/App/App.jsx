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

// export class App extends Component {
//   state = {
//     searchName: '',
//     pictures: [],
//     page: 1,
//     isLoading: false,
//     image: '',
//     tags: '',
//     activeButton: true,
//   };

//   handleFormSubmit = (searchName) => {
//     this.setState({ searchName, page: 1, pictures: [], activeButton: true,});
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchName, page } = this.state;

//     if (prevState.page !== page || prevState.searchName !== this.state.searchName) {
//       this.fetchImages(searchName, page);
//     }
//   }

//   fetchImages = (searchName, page) => {
//     this.setState({ isLoading: true });
    
//       fetchPicture(searchName, page)
//         .then(({ data }) => {
//           if (data.totalHits === 0) {
//            Notiflix.Notify.warning('Oops, there is no image with that name');
//             return;
//           };
//           if ((page - 1) * 12 > data.totalHits) {
//             this.setState({ activeButton: false });
//               Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
//             return;
// }

//           this.setState((prevState) => ({
//             pictures: [...prevState.pictures, ...mapperPictures(data.hits)],
//           }))
//         }
//     )
//       .catch(console.log)
//       .finally(() => {
//         this.setState({ isLoading: false });
//     })
//   }

//   handlerLoadMore = () => {
//     this.setState((prevState) => ({ page: prevState.page + 1 }));
//   };

//   openModal = (image, tags) => {
//     this.setState({ image, tags });
//   };

//   closeModal = () => {
//     this.setState({image: ""});
//   };


//   render() {
//     const { pictures, isLoading, image, tags, activeButton } = this.state;
//     return(
//       <div className={styles.App}>
        
//         <Searchbar onSubmit={this.handleFormSubmit} />
        
//         {pictures.length > 1 && <ImageGallery pictures={pictures} handleModal={this.openModal} />}

//         {pictures.length > 1 && activeButton && (
//           <Button text="Load more" handleClick={this.handlerLoadMore} />)}
        

//         {isLoading && <Loader />}
        
//         {image && <Modal image={image} tags={tags} closeModal={this.closeModal} />}

//     </div>
//   );
//   }
  
// };
