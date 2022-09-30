import PropTypes from 'prop-types'; 
import styles from './Button.module.css';

const Button = ({ handleClick, text }) => {
  return (
    <button type="button" className={styles.Button} onClick={handleClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;

