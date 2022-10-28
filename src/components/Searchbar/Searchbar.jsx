// import React, { Component } from 'react';
import { useState } from 'react';
import './Searchbar.scss';
import { BsSearch } from 'react-icons/bs';

export function Searchbar({ onSubmit }) {
  const [filter, setFilter] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(filter.trim());

    setFilter('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <BsSearch width="30" height="30" />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </form>
    </header>
  );
}
