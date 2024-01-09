// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import './Gallery.css';
import close from './assets/close.svg';
import filter from './assets/filter.svg';

const filterColumnsData1 = [];
const filterColumnsData2 = ["Background", "Bells", "Eyes", "Head",	"Mouth",	"Shirt"];

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
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [sliceEnd, setSliceEnd] = useState(2500);
  const [isDataSetOne, setIsDataSetOne] = useState(true);
  const observerRefs = useRef([]);
  const lastElementRef = useRef();
  const [isRarityModeOn, setIsRarityModeOn] = useState(false);
  const [inscriptionFilter, setInscriptionFilter] = useState("");
  const [walletFilter, setWalletFilter] = useState("");
  const [walletInscriptions, setWalletInscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const data = isDataSetOne ? data1 : data2;
  const setData = isDataSetOne ? setData1 : setData2;
  
  const filterColumns = isDataSetOne ? filterColumnsData1 : filterColumnsData2;
  
  const [isFilterOpen, setIsFilterOpen] = useState(
    filterColumns.reduce((acc, column) => ({ ...acc, [column]: false }), {})
  );

  const csvUrl1 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT4yP83GPtm_jWlfQOGQ7AnlNMKqkfi1VHDOfLNzDaBwqCB9uPK4GD8NZH6Y-sKtaokYYEgx3os07ib/pub?gid=158543575&single=true&output=csv';
  const csvUrl2 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT4yP83GPtm_jWlfQOGQ7AnlNMKqkfi1VHDOfLNzDaBwqCB9uPK4GD8NZH6Y-sKtaokYYEgx3os07ib/pub?gid=0&single=true&output=csv';

  useEffect(() => {
    const csvUrl = isDataSetOne ? csvUrl1 : csvUrl2;
  
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setOriginalData(results.data);  // Save the fetched data to originalData
        setData(results.data);  // Also update the current data
      }
    });
  
    // If it's the second dataset and there are no filters, limit the data points
    if (!isDataSetOne) {
      const hasAnyFilter = Object.values(filters).some(filterValues => filterValues.length > 0);
      setSliceEnd(!hasAnyFilter ? 1000 : data.length);
    }
  }, [isDataSetOne]);

  const [originalData1, setOriginalData1] = useState(null);
  const [originalData2, setOriginalData2] = useState(null);

  const originalData = isDataSetOne ? originalData1 : originalData2;
  const setOriginalData = isDataSetOne ? setOriginalData1 : setOriginalData2;

  const handleToggleRarityMode = () => {
    setIsRarityModeOn(!isRarityModeOn);
  };

  const handleInscriptionFilterChange = (event) => {
    setInscriptionFilter(event.target.value);
  };

  const handleWalletFilterChange = (event) => {
    setWalletFilter(event.target.value);
};

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
    filterColumns.every(column => filters[column].length === 0 || filters[column].includes(item[column])) &&
    (!walletFilter || walletInscriptions.includes(item['Image'].split('/')[5]))
  ).slice(0, sliceEnd);

  useEffect(() => {
    if (walletInscriptions.length > 0) {
      const filteredData = originalData.filter(item => {
        // Extract the inscription id from the image url
        const urlParts = item.Image.split('/');
        const inscriptionId = urlParts[urlParts.length - 1];
        // Compare with the wallet inscriptions
        return walletInscriptions.includes(inscriptionId);
      });
      setData(filteredData);
    
    } else {
      // If walletInscriptions is empty, reset data to originalData
      setData(originalData);
    }
  }, [walletInscriptions, setOriginalData, originalData]);

  useEffect(() => {
      if (!walletFilter) {
          setWalletInscriptions([]);
          return;
      }

      setIsLoading(true);  // Set loading to true before fetching data
      fetch(`https://bellinals.nintondo.io/address/${walletFilter}`)
          .then(response => response.json())
          .then(data => {
              const inscriptions = data._links.inscriptions.map(inscription => inscription.href.split('/')[2]);
              setWalletInscriptions(inscriptions);
          })
          .finally(() => {
              setIsLoading(false);  // Set loading to false after fetching data
          });
  }, [walletFilter]);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      const img = entry.target.querySelector('img');
      if (entry.isIntersecting) {
        img.src = img.dataset.src;
        entry.target.classList.add('gallery-item--visible');
  
        // Check if the last element is being observed and it's the second dataset
        if (!isDataSetOne && entry.target === lastElementRef.current && sliceEnd < data2.length) {
          // Load the next 2500 data points
          setSliceEnd(prevEnd => Math.min(prevEnd + 1000, data2.length));
        }
      } else {
        img.src = '';
        entry.target.classList.remove('gallery-item--visible');
      }
    });
  };
  
  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    observerRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observerRefs.current.forEach((ref, index) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [filteredData]);

  const handleToggleDataSet = () => {
    setIsDataSetOne(!isDataSetOne);
    setFilters(
      (isDataSetOne ? filterColumnsData2 : filterColumnsData1).reduce((acc, column) => ({ ...acc, [column]: [] }), {})
    );
  };

  const sortedData = isRarityModeOn
    ? [...data].sort((a, b) => Number(a['Rank Value']) - Number(b['Rank Value']))
    : data;

  const filteredAndSortedData = sortedData && sortedData.filter(item => 
    filterColumns.every(column => 
      filters[column].length === 0 || filters[column].includes(item[column])
    )
  ).filter(item =>
    !inscriptionFilter || item['Inscription #'].toLowerCase().includes(inscriptionFilter.toLowerCase())
  ).slice(0, sliceEnd);

  useEffect(() => {
    const menuButton = document.querySelector('.filter-button');
    const sortingSection = document.querySelector('.sorting-section');

    const toggleSortingSection = () => {
      sortingSection.classList.toggle('active');
    };

    if (menuButton) {
      menuButton.addEventListener('click', toggleSortingSection);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener('click', toggleSortingSection);
      }
    };
  }, []);

  const [isSortingSectionActive, setIsSortingSectionActive] = useState(false);

  const toggleSortingSection = () => {
    setIsSortingSectionActive(!isSortingSectionActive);
  };

  useEffect(() => {
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        document.querySelector('.sorting-section').classList.remove('active');
      });
    }
    
    return () => {
      if (closeBtn) {
        closeBtn.removeEventListener('click', function() {
          document.querySelector('.sorting-section').classList.remove('active');
        });
      }
    }
  }, [isSortingSectionActive]);

  const closeSortingSection = () => {
    setIsSortingSectionActive(false);
  };
  
  useEffect(() => {
    const closeButton = document.querySelector('.close-btn');
  
    if (closeButton) {
      closeButton.addEventListener('click', closeSortingSection);
    }
  
    return () => {
      if (closeButton) {
        closeButton.removeEventListener('click', closeSortingSection);
      }
    };
  }, []);  

  return (
    <div className="gallery-container">
      <div className={`sorting-section ${isSortingSectionActive ? 'active' : ''}`}>
      <div className="sorting-header">
        <h2 className="filter-text">Filter</h2>
        <div className="close-button-div">
          <img className="close-btn" src={close} alt="Close button"></img>
        </div>
      </div>
        {/* <div className="rarity-mode-switch">
          <span>RARITY MODE</span>
          <label className="switch">
            <input type="checkbox" checked={isRarityModeOn} onChange={handleToggleRarityMode} />
            <span className="slider round"></span>
          </label>
        </div> */}
        <div className="inscription-filter">
          <input 
            id="inscription-filter" 
            type="text" 
            value={inscriptionFilter} 
            onChange={handleInscriptionFilterChange} 
            className="search-number-box"
            placeholder="Sort by inscription..."
          />
        </div>
        {/* <div className="inscription-filter">
          <input 
            id="address-filter" 
            type="text" 
            value={walletFilter} 
            onChange={handleWalletFilterChange} 
            className="search-number-box"
            placeholder="Sort by wallet..."
          />
        </div> */}
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
        <div className="grid-header">
          <div className="switch-dataset">
            <button 
              className={isDataSetOne ? "dataset-button selected" : "dataset-button"} 
              onClick={() => handleToggleDataSet('PUNKS')}>GENESIS</button>
            <button 
              className={!isDataSetOne ? "dataset-button selected" : "dataset-button"} 
              onClick={() => handleToggleDataSet('MOONBIRDS')}>AVATAR</button>
          </div>
          <div className="filter-button-div">
            <button className="filter-button" onClick={toggleSortingSection}>
              <img src={filter} alt="filter" />
            </button>
          </div>
        </div>
        <div className="gallery-grid">
        {isLoading ? (
          <p className="loading-text">Loading Inscriptions for {walletFilter}...</p>
        ) : (
          (walletInscriptions.length === 0 && walletFilter) ? (
            <p className="loading-text">No inscriptions in {walletFilter}</p>
          ) : (
            filteredAndSortedData && filteredAndSortedData.map((item, index, arr) => (
              <div 
                key={item['Asset #']} 
                className="gallery-item" 
                ref={el => {
                  observerRefs.current[index] = el;
                  // If it's the last element, also assign the ref to `lastElementRef`
                  if (index === arr.length - 1) {
                    lastElementRef.current = el;
                  }
                }}
              >
                <img data-src={item['Image']} src="" alt={`Item ${item['Item #']}`} />
                <p className="punk-number">{item['Item #']}</p>
                <p className="inscription-number">INSC. {item['Inscription #']}</p>
                <p className="punk-rarity">RANK {item['Rank Value']}</p>
              </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Gallery;