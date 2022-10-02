import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ image, tags, closeModal }) {
  
    useEffect(() => {
        const onEsc = (e) => {
            if (e.code === 'Escape') closeModal();
        };
        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc)
    }, [closeModal]);

     return (
            <div className={styles.Overlay}>
                <div className={styles.Modal}>
                    <img src={image} alt={tags} />
                </div>
            </div>
        );
};

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired
};