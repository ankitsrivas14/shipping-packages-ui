import { useCallback, useEffect, useMemo, useState } from "react";
import { OrderItem } from "../types/OrderItem";
import { fetchOrders } from "../services/order";
import { getUniqueValues } from "../helpers/utils";
import { SelectChangeEvent } from "@mui/material";

export const useOrdersList = () => {
    const [filters, setFilters] = useState({
        minQty: 0,
        maxQty: 0,
        typeId: 1
    });
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchData = useCallback(async (id:string) => {
        setIsLoading(true);
        const data = await fetchOrders(id);
        setOrders(data);
        setIsLoading(false);
    }, []);

    const filteredOrders = useMemo(() => {
        return orders.filter((o:OrderItem) => o.Quantity >= filters.minQty && o.Quantity <= filters.maxQty)  ;
    }, [filters.minQty, filters.maxQty, orders])

    const quantities = useMemo(() => {
        return getUniqueValues(orders, (d:OrderItem) => {
            return Number(d.Quantity);
        }) as number[];
    }, [orders]);

    const handleSetTypeIdFilter = useCallback(
        (e: SelectChangeEvent) => {
            setFilters(() => ({ minQty: 0, maxQty: 0, typeId: Number(e.target.value) }));
        },
        [setFilters]
    );

    const handleSetQtyFilter =  useCallback(
        (val: number[]) => {
            setFilters((prev) => ({ ...prev, minQty: val[0], maxQty: val[1]}));
        },
        [setFilters]
    );

    useEffect(() => {
        fetchData(String(filters.typeId));
    }, [filters.typeId, fetchData]);
    
    useEffect(() => {
        setFilters((prev)=>({...prev, minQty: quantities[0], maxQty: quantities[quantities.length - 1]}))
    }, [quantities]);

    return {
        filters, 
        orders, 
        isLoading, 
        filteredOrders,
        quantities,
        handleSetTypeIdFilter,
        handleSetQtyFilter
    }
}
