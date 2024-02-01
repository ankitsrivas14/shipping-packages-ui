import React, { forwardRef } from 'react';
import { useOrdersList } from './hooks/useOrdersList';
import { MAX_TYPE_ID } from './services/order';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FixedSizeList as List } from 'react-window';
import Autosizer from 'react-virtualized-auto-sizer';

import './App.css';

const PADDING_SIZE = 10;

function App() {
  const {
    filters,
    quantities,
    isLoading,
    handleSetFilters,
    filteredOrders
  } = useOrdersList();

  const typeIds = Array(MAX_TYPE_ID).fill(0).map((_, i) => i + 1);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div className="order-item-row" key={filteredOrders[index].OrderLineID} style={style}>
      <div className="fixed-item-cell">{filteredOrders[index].OrderLineID}</div>
      <div className="fixed-item-cell">{filteredOrders[index].OrderID}</div>
      <div className="fixed-item-cell">{filteredOrders[index].StockItemID}</div>
      <div className="description-cell">{filteredOrders[index].Description}</div>
      <div className="fixed-item-cell">{filteredOrders[index].PackageTypeID}</div>
      <div className="fixed-item-cell">{filteredOrders[index].Quantity}</div>
      <div className="fixed-item-cell">{filteredOrders[index].UnitPrice}</div>
    </div>
  );

  const innerElementType = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    ({ style, ...rest }, ref) => {
      const height = style ? `${parseFloat(style.height as string) + PADDING_SIZE * 2}px` : 'auto';
      return (
        <div
          ref={ref}
          style={{...style, height}}
          {...rest}
        />
      );
    }
  );
  

  return (
    <div className="App">
      <h1>Minizuba Packaging Orders</h1>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">PackageTypeID</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={filters.typeId.toString()}
          label="PackageTypeID"
          onChange={handleSetFilters}
        >
          {typeIds.map((typeId: number) => (
            <MenuItem key={"PackageTypeID" + typeId} value={typeId}>
              {typeId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filters.quantity && (
        <>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Min Qty: </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filters.quantity.toString()}
              label="Quantity"
              onChange={handleSetFilters}
            >
              {quantities.map((q) => (
                <MenuItem key={"minQuantity" + q} value={q}>
                  {q}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Max Qty: </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filters.quantity.toString()}
              label="Quantity"
              onChange={handleSetFilters}
            >
              {quantities.map((q) => (
                <MenuItem key={"maxQuantity" + q} value={q}>
                  {q}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      <div className='order-items-table'>
        <div className="order-item-row">
            <div className="fixed-item-cell">OrderLineID</div>
            <div className="fixed-item-cell">OrderID</div>
            <div className="fixed-item-cell">StockItemID</div>
            <div className="description-cell">Description</div>
            <div className="fixed-item-cell">PackageTypeID</div>
            <div className="fixed-item-cell">Quantity</div>
            <div className="fixed-item-cell">UnitPrice</div>
        </div>
        <Autosizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={filteredOrders.length}
              itemSize={35}
              width={width}
              innerElementType={innerElementType}
            >
             {Row}
            </List>
          )}
        </Autosizer>
    </div>
    </div>
  );
}

export default App;
