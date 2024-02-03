import React from 'react';
import Filters from './components/Filters/Filters';
import OrderItemsTable from './components/OrderItemsTable/OrderItemsTable';
import { CircularProgress } from '@mui/material';
import { useOrdersList } from './hooks/useOrdersList';
import './App.css';

function App() {
  const {
    filters,
    quantities,
    isLoading,
    handleSetTypeIdFilter,
    filteredOrders,
    handleSetQtyFilter
  } = useOrdersList();

  return (
    <div className="App">
      <Filters
        filters={filters}
        quantities={quantities}
        handleSetQtyFilter={handleSetQtyFilter}
        handleSetTypeIdFilter={handleSetTypeIdFilter}
      />

      {isLoading ? (
        <div className='w-full mt-20 flex items-center justify-center'>
          <CircularProgress />
        </div>
      ) : (
        <OrderItemsTable filteredOrders={filteredOrders} />
      )}
    </div>
  );
}

export default App;
