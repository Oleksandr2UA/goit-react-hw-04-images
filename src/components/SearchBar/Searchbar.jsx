import { useState } from 'react';
export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const onInputChange = e => {
    setValue(e.currentTarget.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();

    onSubmit(value.trim());
    reset();
  };
  const reset = () => {
    setValue('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={onFormSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
};
