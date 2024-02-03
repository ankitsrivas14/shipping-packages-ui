
import { useOrdersList } from './hooks/useOrdersList';
import Filters from './components/Filters/Filters';
import OrderItemsTable from './components/OrderItemsTable/OrderItemsTable';
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
      <OrderItemsTable filteredOrders={filteredOrders} />
    </div>
  );
}

export default App;
