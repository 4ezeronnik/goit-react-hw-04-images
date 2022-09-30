import PropTypes from 'prop-types';
import { func } from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
    picture: { image, largeImage, tags },
    handleModal
}) => {
    return (
        <li className={styles.ImageGalleryItem}>
            <img src={image} alt={tags}
                className={styles.ImageGalleryItemImage}
                onClick={() => handleModal(largeImage, tags)}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    picture: PropTypes.objectOf(PropTypes.string).isRequired,
    handleModal: func.isRequired
}

export default ImageGalleryItem;
