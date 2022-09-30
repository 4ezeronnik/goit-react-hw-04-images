import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ pictures, handleModal }) => {
    return (<ul className={styles.ImageGallery}> {
        pictures.map(({ id, ...restProps }) => 
            <ImageGalleryItem
                key={id}
                id={id}
                picture={restProps}
                handleModal={handleModal}
            />)}
        </ul>
    )
};

ImageGallery.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.shape).isRequired,
    handleModal: PropTypes.func.isRequired,
}

export default ImageGallery;

