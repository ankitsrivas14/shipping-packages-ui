
import { useOrdersList } from './hooks/useOrdersList';
import Filters from './components/Filters';
import OrderItemsTable from './components/OrderItemsTable';
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
      <h1>Minizuba Packaging Orders</h1>
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
