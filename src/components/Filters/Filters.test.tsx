
// @ts-ignore
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Filters from './Filters';
import '@testing-library/jest-dom';

const mockHandleSetTypeIdFilter = jest.fn();
const mockHandleSetQtyFilter = jest.fn();
const mockQuantities = [1, 100];
const mockFilters = {
    typeId: 1,
    minQty: 1,
    maxQty: 100,
};

describe('Filters Component', () => {
    beforeEach(() => {
        render(<Filters
            filters={mockFilters}
            quantities={mockQuantities}
            handleSetTypeIdFilter={mockHandleSetTypeIdFilter}
            handleSetQtyFilter={mockHandleSetQtyFilter}
        />);
    });

    it('renders correctly with initial state', () => {
        expect(screen.getByText('Minizuba Packaging Orders')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
        expect(screen.getByLabelText('PackageTypeID')).toHaveValue(mockFilters.typeId.toString());
    });

    it('calls handleSetTypeIdFilter when a new package type ID is selected', () => {
        fireEvent.mouseDown(screen.getByLabelText('PackageTypeID'));
        fireEvent.click(screen.getByText('2'));
        expect(mockHandleSetTypeIdFilter).toHaveBeenCalledWith(expect.anything());
    });

    it('updates slider value and calls handleSetQtyFilter when apply is clicked', () => {
        const newQty = [10, 90];
        fireEvent.change(screen.getByRole('slider'), { target: { value: newQty } });
        fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
        expect(mockHandleSetQtyFilter).toHaveBeenCalledWith(newQty);
    });
});
