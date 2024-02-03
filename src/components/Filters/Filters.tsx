import { MAX_TYPE_ID } from '@/services/order';
import { 
    Box,
    Button,
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    SelectChangeEvent, 
    Typography
} from '@mui/material'
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';

interface FiltersProps {
    filters: {
        typeId: number;
        minQty: number;
        maxQty: number;
    };
    quantities: number[];
    handleSetTypeIdFilter: (event: SelectChangeEvent<string>) => void;
    handleSetQtyFilter: (val: number[]) => void;
}

const Filters = (props: FiltersProps) => {
    const typeIds = Array(MAX_TYPE_ID).fill(0).map((_, i) => i + 1);
    const { 
        filters, 
        quantities, 
        handleSetTypeIdFilter, 
        handleSetQtyFilter 
    } = props
    const [qty, setQty] = useState([filters.minQty, filters.maxQty]);

    useEffect(() => {
        setQty([filters.minQty, filters.maxQty]);
    }, [filters]);

    const handleSliderChange = (event: Event, value: number | number[]) => {
        if (Array.isArray(value)) {
          setQty(value);
        }
    };

    return (
        <div className='flex justify-between items-center mx-10'>
            <h1 className='font-bold text-3xl'>Minizuba Packaging Orders</h1>
            <div className='flex items-center justify-end gap-20 my-10 mr-10'>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">PackageTypeID</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={filters.typeId.toString()}
                    label="PackageTypeID"
                    onChange={handleSetTypeIdFilter}
                    name='typeId'
                >
                    {typeIds.map((typeId: number) => (
                        <MenuItem key={"PackageTypeID" + typeId} value={typeId}>{typeId}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className='flex w-[400px] gap-10 items-center'>
                <h5>Quantity</h5>
                <Box sx={{ width: 250 }}>
                <Slider
                    value={qty}
                    onChange={handleSliderChange}
                    min={quantities[0]}
                    max={quantities[quantities.length - 1]}
                    valueLabelDisplay="auto"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Min. {quantities[0]}</Typography>
                    <Typography variant="body2">Max. {quantities[quantities.length - 1]}</Typography>
                </Box>
                </Box>
                <Button onClick={() => handleSetQtyFilter(qty)}>Apply</Button>
            </div>
        </div>
        </div>
    )
}

export default Filters
