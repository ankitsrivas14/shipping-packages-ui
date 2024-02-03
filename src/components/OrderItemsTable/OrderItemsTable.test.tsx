import { render } from '@testing-library/react';
import OrderItemsTable from './OrderItemsTable';

const mockFilteredOrders = [
  {
    OrderLineID: 1,
    OrderID: 101,
    StockItemID: 201,
    Description: 'Product A',
    PackageTypeID: 301,
    Quantity: 10,
    UnitPrice: 20.0,
  },
  {
    OrderLineID: 2,
    OrderID: 102,
    StockItemID: 202,
    Description: 'Product B',
    PackageTypeID: 302,
    Quantity: 5,
    UnitPrice: 15.0,
  },
];

describe('OrderItemsTable Component', () => {
  it('renders the table header', () => {
    const { getByText } = render(<OrderItemsTable filteredOrders={[]} />);
    expect(getByText('OrderLineID')).toBeInTheDocument();
    expect(getByText('OrderID')).toBeInTheDocument();
    expect(getByText('StockItemID')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('PackageTypeID')).toBeInTheDocument();
    expect(getByText('Quantity')).toBeInTheDocument();
    expect(getByText('UnitPrice')).toBeInTheDocument();
  });

  it('renders rows with data', () => {
    const { getByText } = render(<OrderItemsTable filteredOrders={mockFilteredOrders} />);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('101')).toBeInTheDocument();
    expect(getByText('201')).toBeInTheDocument();
    expect(getByText('Product A')).toBeInTheDocument();
    expect(getByText('301')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('20.0')).toBeInTheDocument();
  });
});
