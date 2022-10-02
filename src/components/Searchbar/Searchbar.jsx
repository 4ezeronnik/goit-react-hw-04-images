import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchName.trim() === '') {
      toast.error('Please, enter, query name');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };


  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles.SearchFormButton}>
        <FiSearch className={styles.iconSearch} />
        <span className={styles.SearchFormButtonLabel}>Search</span>
      </button>
      <input
        className={styles.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={searchName}
        onChange={handleNameChange}
      />
    </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};