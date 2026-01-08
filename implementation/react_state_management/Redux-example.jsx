/**
 * Redux Example - Complex State Management
 * Use for: Large apps, complex state, shared state across many components
 * 
 * Install: npm install @reduxjs/toolkit react-redux
 */

import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// ==================== API Thunks ====================
export const fetchPrograms = createAsyncThunk(
  'programs/fetchAll',
  async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/programs/?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  }
);

export const createProgram = createAsyncThunk(
  'programs/create',
  async (programData) => {
    const response = await fetch('/api/programs/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(programData),
    });
    if (!response.ok) throw new Error('Failed to create program');
    return response.json();
  }
);

// ==================== Programs Slice ====================
const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      wing: 'all',  // 'life-science', 'evinetco', 'agri', 'all'
      status: 'active',
      search: '',
    },
    pagination: {
      page: 1,
      pageSize: 20,
      total: 0,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page on filter change
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        wing: 'all',
        status: 'active',
        search: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch programs
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.pagination.total = action.payload.count;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create program
      .addCase(createProgram.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // Add to beginning
        state.pagination.total += 1;
      });
  },
});

export const { setFilter, setPage, clearFilters } = programsSlice.actions;

// ==================== Events Slice ====================
const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    selectedEvent: null,
    loading: false,
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    clearSelection: (state) => {
      state.selectedEvent = null;
    },
  },
});

export const { selectEvent, clearSelection } = eventsSlice.actions;

// ==================== Store Configuration ====================
const store = configureStore({
  reducer: {
    programs: programsSlice.reducer,
    events: eventsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['programs/fetchAll/pending'],
      },
    }),
});

// ==================== React Components ====================
function ProgramsList() {
  const dispatch = useDispatch();
  const { items, loading, error, filters, pagination } = useSelector(
    (state) => state.programs
  );

  // Fetch programs when filters change
  React.useEffect(() => {
    dispatch(fetchPrograms({
      ...filters,
      page: pagination.page,
      page_size: pagination.pageSize,
    }));
  }, [dispatch, filters, pagination.page]);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  if (loading) return <div>Loading programs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="programs-list">
      <div className="filters">
        <select
          value={filters.wing}
          onChange={(e) => handleFilterChange({ wing: e.target.value })}
        >
          <option value="all">All Wings</option>
          <option value="life-science">Life Science Wing</option>
          <option value="evinetco">EViNetCo-wing</option>
          <option value="agri">Agri Wing</option>
        </select>

        <input
          type="text"
          placeholder="Search programs..."
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
        />

        <button onClick={() => dispatch(clearFilters())}>
          Clear Filters
        </button>
      </div>

      <div className="programs-grid">
        {items.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={pagination.page === 1}
          onClick={() => handlePageChange(pagination.page - 1)}
        >
          Previous
        </button>
        <span>Page {pagination.page}</span>
        <button
          disabled={pagination.page * pagination.pageSize >= pagination.total}
          onClick={() => handlePageChange(pagination.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function ProgramCard({ program }) {
  const dispatch = useDispatch();

  const handleSelect = () => {
    // This could trigger fetching event details
    dispatch(selectEvent(program.id));
  };

  return (
    <div className="program-card" onClick={handleSelect}>
      <h3>{program.name}</h3>
      <p>{program.description}</p>
      <span className="badge">{program.wing}</span>
    </div>
  );
}

// ==================== App Setup ====================
function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <ProgramsList />
      </div>
    </Provider>
  );
}

export default App;


