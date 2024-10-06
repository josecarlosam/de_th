import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CountryGrid = ({ countries, searchTerm, onCountrySelect, favorites, toggleFavorite }) => {
  const columnDefs = [
    {
      field: 'name.common',
      headerName: 'Name',
      sortable: true,
      filter: true,
      sort: 'asc',
    },
    {
      field: 'flags.png',
      headerName: 'Flag',
      sortable: false,
      filter: false,
      width: 80,
      cellRenderer: (params) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img
                src={params.value}
                alt={`Flag of ${params.data.name.common}`}
                style={{ width: '40px', height: '30px', objectFit: 'cover' }}
            />
          </div>
      ),
    },
    { field: 'population', headerName: 'Population', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'languages', headerName: 'Languages', valueGetter: (params) => Object.values(params.data.languages || {}).join(', '), sortable: true, filter: true },
    { field: 'currencies', headerName: 'Currencies', valueGetter: (params) => Object.keys(params.data.currencies || {}).join(', '), sortable: true, filter: true },
    {
      field: 'favorite',
      headerName: 'Favorite',
      cellRenderer: (params) => (
          <button onClick={() => toggleFavorite(params.data)}>
            {favorites.some(fav => fav.cca3 === params.data.cca3) ? '❤️' : '🤍'}
          </button>
      ),
    },
  ];

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
  }), []);

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    return countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(country.languages || {}).some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase())) ||
        Object.keys(country.currencies || {}).some(currency => currency.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [countries, searchTerm]);

  const paginationConfig = useMemo(() => ({
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
  }), []);

  const gridOptions = useMemo(() => ({
    defaultColDef: defaultColDef,
    columnDefs: columnDefs,
    sortingOrder: ['asc', 'desc', null],
  }), [defaultColDef, columnDefs]);

  return (
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
            rowData={filteredCountries}
            onRowClicked={(event) => onCountrySelect(event.data)}
            {...paginationConfig}
            {...gridOptions}
        />
      </div>
  );
};

export default CountryGrid;