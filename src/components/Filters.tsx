import { MAX_TYPE_ID } from '@/services/order';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface FiltersProps {
    filters: {
        typeId: number;
        quantity: number;
    };
    quantities: number[];
    handleSetFilters: (event: SelectChangeEvent<string>) => void;
}

const Filters = (props: FiltersProps) => {
    const typeIds = Array(MAX_TYPE_ID).fill(0).map((_, i) => i + 1);
    const { filters, quantities, handleSetFilters } = props
    return (
        <div>
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
                        <MenuItem key={"PackageTypeID" + typeId} value={typeId}>{typeId}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {filters.quantity && (
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
                        <MenuItem key={"minQuantity" + q} value={q}>{q}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </div>
    )
}

export default Filters
