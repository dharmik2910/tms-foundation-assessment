/**
 * Dynamic Search Component - Modern React Feature
 * Features:
 * - Real-time search as user types
 * - Intelligent categorization
 * - Keyboard navigation
 * - Accessible (ARIA labels)
 * - Debounced for performance
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import './SearchComponent.css';

// Mock API function (replace with actual API call)
const searchAPI = async (query, filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data
  const allResults = [
    { id: 1, type: 'program', title: 'Life Science Workshop 2024', category: 'Life Science Wing', description: 'Advanced workshop on life sciences', date: '2024-03-15' },
    { id: 2, type: 'event', title: 'CAiSMD 2024 Registration', category: 'CAiSMD', description: 'Register for the annual conference', date: '2024-04-20' },
    { id: 3, type: 'program', title: 'Agri Innovation Program', category: 'Agri Wing', description: 'Learn about agricultural innovations', date: '2024-05-10' },
    { id: 4, type: 'resource', title: 'EViNetCo Research Papers', category: 'EViNetCo-wing', description: 'Collection of research papers', date: '2024-02-01' },
    { id: 5, type: 'event', title: 'Workshop on Biotechnology', category: 'Life Science Wing', description: 'Hands-on biotechnology workshop', date: '2024-06-05' },
  ];

  if (!query) return { results: [], suggestions: [] };

  const queryLower = query.toLowerCase();
  const filtered = allResults.filter(item => 
    item.title.toLowerCase().includes(queryLower) ||
    item.description.toLowerCase().includes(queryLower) ||
    item.category.toLowerCase().includes(queryLower)
  );

  // Group by type
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return {
    results: filtered,
    grouped,
    suggestions: ['workshop', 'registration', 'life science', 'CAiSMD 2024'],
  };
};

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [groupedResults, setGroupedResults] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
  });

  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);

  // Debounce search query
  const debouncedQuery = useDebounce(query, 300);

  // Perform search
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setGroupedResults({});
      setSuggestions([]);
      return;
    }

    setLoading(true);
    searchAPI(debouncedQuery, filters).then(data => {
      setResults(data.results);
      setGroupedResults(data.grouped || {});
      setSuggestions(data.suggestions || []);
      setLoading(false);
      setIsOpen(true);
    });
  }, [debouncedQuery, filters]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelectResult(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        searchInputRef.current?.blur();
        break;
      default:
        break;
    }
  }, [isOpen, results, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const handleSelectResult = (result) => {
    console.log('Selected:', result);
    // Navigate to result page or perform action
    setIsOpen(false);
    setQuery('');
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    searchInputRef.current?.focus();
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : part
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      program: '📚',
      event: '📅',
      resource: '📄',
      faq: '❓',
    };
    return icons[type] || '📌';
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          ref={searchInputRef}
          type="text"
          className="search-input"
          placeholder="Search programs, events, resources..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          aria-label="Search"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-autocomplete="list"
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Filters */}
      <div className="search-filters">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="Life Science Wing">Life Science Wing</option>
          <option value="EViNetCo-wing">EViNetCo-wing</option>
          <option value="Agri Wing">Agri Wing</option>
          <option value="CAiSMD">CAiSMD</option>
        </select>

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="program">Programs</option>
          <option value="event">Events</option>
          <option value="resource">Resources</option>
        </select>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query || results.length > 0) && (
        <div
          id="search-results"
          className="search-results"
          role="listbox"
          aria-label="Search results"
        >
          {loading && (
            <div className="search-loading">
              <div className="spinner"></div>
              Searching...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="search-empty">
              <p>No results found for "{query}"</p>
              {suggestions.length > 0 && (
                <div className="suggestions">
                  <p>Try searching for:</p>
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      className="suggestion-tag"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              {/* Grouped Results */}
              {Object.entries(groupedResults).map(([type, items]) => (
                <div key={type} className="result-group">
                  <div className="result-group-header">
                    {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}s ({items.length})
                  </div>
                  <div ref={resultsRef} className="result-items">
                    {items.map((item, index) => {
                      const globalIndex = results.findIndex(r => r.id === item.id);
                      const isSelected = globalIndex === selectedIndex;
                      
                      return (
                        <div
                          key={item.id}
                          className={`result-item ${isSelected ? 'selected' : ''}`}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectResult(item)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <div className="result-icon">{getTypeIcon(item.type)}</div>
                          <div className="result-content">
                            <div className="result-title">
                              {highlightText(item.title, query)}
                            </div>
                            <div className="result-description">
                              {highlightText(item.description, query)}
                            </div>
                            <div className="result-meta">
                              <span className="result-category">{item.category}</span>
                              {item.date && (
                                <span className="result-date">{item.date}</span>
                              )}
                            </div>
                          </div>
                          <div className="result-actions">
                            <button className="action-btn">View →</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quick Actions */}
              <div className="search-footer">
                <span className="keyboard-hint">
                  <kbd>↑</kbd> <kbd>↓</kbd> Navigate • <kbd>Enter</kbd> Select • <kbd>Esc</kbd> Close
                </span>
              </div>
            </>
          )}

          {!loading && !query && suggestions.length > 0 && (
            <div className="popular-searches">
              <p>Popular searches:</p>
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  className="suggestion-tag"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;


