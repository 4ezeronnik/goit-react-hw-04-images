import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
    state = {
      searchName: '',
    };
  
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

    handleNameChange = e => {
        this.setState({ searchName: e.currentTarget.value.toLowerCase() });
    };

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.searchName.trim() === '') {
            toast.error('Please, enter, query name');
            return;
        }
      this.props.onSubmit(this.state.searchName);
      this.setState({ searchName: ''});
    }

    render() {
        return (
            <header className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
              <button type="submit" className={styles.SearchFormButton}>
                <FiSearch className={styles.iconSearch}/>
                <span className={styles.SearchFormButtonLabel}>Search</span>
    </button>

    <input
                className={styles.SearchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.searchName}
      onChange={this.handleNameChange}                  
    />
  </form>
</header>
        )
    }
}