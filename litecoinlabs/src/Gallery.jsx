// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './Gallery.css';

const filterColumns = ["Background", "Body", "Eyes", "Eyewear", "Headwear", "Mouth", "Outerwear"];

const uniqueValues = (data, key) => {
  if (!data) {
    return [];
  }
  const counts = data.reduce((acc, curr) => {
    acc[curr[key]] = (acc[curr[key]] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).map(([value, count]) => ({ value, count }));
};

function Gallery() {
  const [data, setData] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(
    filterColumns.reduce((acc, column) => ({ ...acc, [column]: false }), {})
  );

  useEffect(() => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQN-Mm-iMvPFYIJRlD759AF0joa_WCRV6ZRnsRiAtMKY6WGTUj6OdnG4A9rclBmmUaPb7byJr5o-EMt/pub?gid=0&single=true&output=csv';

    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      }
    });
  }, []);

  const [filters, setFilters] = useState(
    filterColumns.reduce((acc, column) => ({ ...acc, [column]: [] }), {})
  );

  const handleFilterChange = (column, value) => (event) => {
    const newValues = [...filters[column]];
    if (event.target.checked) {
      newValues.push(value);
    } else {
      const index = newValues.indexOf(value);
      newValues.splice(index, 1);
    }
    setFilters({ ...filters, [column]: newValues });
  };

  const handleFilterClick = (column) => {
    setIsFilterOpen({ ...isFilterOpen, [column]: !isFilterOpen[column] });
  };

  const filteredData = data && data.filter(item => 
    filterColumns.every(column => 
      filters[column].length === 0 || filters[column].includes(item[column])
    )
  );

  return (
    <div className="gallery-container">
      <div className="sorting-section">
        <h2>Sorting</h2>
        {filterColumns.map((column) => {
            const unique = uniqueValues(data, column);
            return (
              <div key={column} className="filter-label-div">
                <div className="filter-label" onClick={() => handleFilterClick(column)}>
                  <label>{column}</label>
                  <span>{isFilterOpen[column] ? '-' : '+'}</span>
                </div>
                <div className={`all-options ${isFilterOpen[column] ? "expanded" : ""}`}>
                  {isFilterOpen[column] && unique.map(({ value, count }) => (
                    <div key={value} className="filter-option">
                      <input
                        type="checkbox"
                        id={value}
                        name={value}
                        checked={filters[column].includes(value)}
                        onChange={handleFilterChange(column, value)}
                      />
                      <label htmlFor={value}>{`${value} (${count})`}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
        })}
      </div>
      <div className="grid-section">
        <h2>Grid</h2>
        <div className="gallery-grid">
          {filteredData && filteredData.map(item => (
            <div key={item['Asset #']} className="gallery-item">
              <img src={item['Image']} alt={`Item ${item['Item #']}`} />
              <p className="punk-number">{item['Item #']}</p>
              <p className="inscription-number">INSC. {item['Inscription #']}</p>
              <p className="punk-rarity">RANK {item['Rank Value']}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
