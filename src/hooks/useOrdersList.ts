import { useCallback, useEffect, useMemo, useState } from "react";
import { OrderItem } from "../types/OrderItem";
import { fetchOrders } from "../services/order";
import { getUniqueValues } from "../helpers/utils";
import { SelectChangeEvent } from "@mui/material";

export const useOrdersList = () => {
    const [filters, setFilters] = useState({
        quantity: 0,
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
        return orders.filter((o:OrderItem) => o.Quantity === filters.quantity);
    }, [filters.quantity, orders])

    const quantities = useMemo(() => {
        return getUniqueValues(orders, (d:OrderItem) => {
            return Number(d.Quantity);
        }) as number[];
    }, [orders]);

    const handleSetFilters = useCallback(
        (e: SelectChangeEvent) => {
            setFilters((prev) => ({ ...prev, typeId: Number(e.target.value) }));
        },
        [setFilters]
    );

    useEffect(() => {
        fetchData(String(filters.typeId));
    }, [filters.typeId, fetchData]);
    
    useEffect(() => {
        setFilters((prev)=>({...prev, quantity: quantities[0]}))
    }, [quantities]);

    return {
        filters, 
        orders, 
        isLoading, 
        filteredOrders,
        quantities,
        handleSetFilters
    }
}
