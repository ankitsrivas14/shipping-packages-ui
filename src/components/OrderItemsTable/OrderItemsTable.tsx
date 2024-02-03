import React, { forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import Autosizer from 'react-virtualized-auto-sizer';
import { OrderItem } from '@/types/OrderItem';
import './OrderItemsTable.css';
import { getRandomRGBColor } from '@/helpers/utils';

const PADDING_SIZE = 10;

interface OrderItemsTableProps {
  filteredOrders: OrderItem[];
}

const OrderItemsTable = (props: OrderItemsTableProps) => {
  const { filteredOrders } = props;
  const packageColorCode = getRandomRGBColor();

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div className="order-item-row" key={filteredOrders[index].OrderLineID} style={style}>
      <div className="fixed-item-cell">{filteredOrders[index].OrderLineID}</div>
      <div className="fixed-item-cell">{filteredOrders[index].OrderID}</div>
      <div className="fixed-item-cell">{filteredOrders[index].StockItemID}</div>
      <div className="description-cell">{filteredOrders[index].Description}</div>
      <div className="fixed-item-cell package-cell">
        {filteredOrders[index].PackageTypeID}
        <span className="package-color-code" style={{ backgroundColor: packageColorCode }} />
      </div>
      <div className="fixed-item-cell">{filteredOrders[index].Quantity}</div>
      <div className="fixed-item-cell">{filteredOrders[index].UnitPrice}</div>
    </div>
  );

  const innerElementType = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    ({ style, ...rest }, ref) => {
      const height = style ? `${parseFloat(style.height as string) + PADDING_SIZE * 2}px` : 'auto';
      return (
        <div ref={ref} style={{ ...style, height }} {...rest} />
      );
    }
  );

  return (
    <div className="order-items-table">
      <div className="table-header order-item-row">
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
  );
};

export default OrderItemsTable;
