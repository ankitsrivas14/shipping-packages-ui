import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import Slider from '@mui/material/Slider';
import { MAX_TYPE_ID } from '@/services/order';
import './Filters.css';

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
  const {
    filters,
    quantities,
    handleSetTypeIdFilter,
    handleSetQtyFilter,
  } = props;

  const typeIds = Array(MAX_TYPE_ID).fill(0).map((_, i) => i + 1);

  const [qty, setQty] = useState([filters.minQty, filters.maxQty]);

  useEffect(() => {
    setQty([filters.minQty, filters.maxQty]);
  }, [filters]);

  // @ts-ignore
  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setQty(value);
    }
  };

  return (
    <div className="filters-container">
      <h1 className="font-bold text-3xl">Minizuba Packaging Orders</h1>
      <div className="filters-row">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="!mr-10">
          <InputLabel id="demo-select-small-label">PackageTypeID</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filters.typeId.toString()}
            label="PackageTypeID"
            onChange={handleSetTypeIdFilter}
            name="typeId"
          >
            {typeIds.map((typeId: number) => (
              <MenuItem key={`PackageTypeID${typeId}`} value={typeId}>
                {typeId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="flex w-[400px] gap-10 items-center">
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
              <Typography variant="body2">
                Max. {quantities[quantities.length - 1]}
              </Typography>
            </Box>
          </Box>
          <Button onClick={() => handleSetQtyFilter(qty)}>Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
