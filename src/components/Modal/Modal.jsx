import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal(image, tags, closeModal) {

    useEffect(() => {
        const onEsc = (e) => {
            if (e.code === 'Escape') closeModal();
        };
        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc)
    });

     return (
            <div className={styles.Overlay}>
                <div className={styles.Modal}>
                    <img src={image} alt={tags} />
                </div>
            </div>
        );
}

// class Modal extends Component {

//     static propTypes = {
//         closeModal: PropTypes.func.isRequired,
//         image: PropTypes.string.isRequired,
//         tags: PropTypes.string.isRequired
//     }

//     componentDidMount() {
//         window.addEventListener('keydown', this.onEsc);
//     };

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.onEsc);
//     };
    
//     onEsc = (e) => {
//         if (e.code === 'Escape') this.props.closeModal();
//     };

//     render() {
//         const { image, tags } = this.props;
//         return (
//             <div className={styles.Overlay}>
//                 <div className={styles.Modal}>
//                     <img src={image} alt={tags} />
//                 </div>
//             </div>
//         );
//     }
// };

// export default Modal;

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
        image: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
}