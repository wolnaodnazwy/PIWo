import React from 'react';

const SortDropdown = ({ sortOption, setSortOption }) => {
  return (
    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
      <option value="name">Name</option>
      <option value="location">Location</option>
      <option value="rating">Rating</option>
      <option value="price">Price</option>
    </select>
  );
};

export default SortDropdown;