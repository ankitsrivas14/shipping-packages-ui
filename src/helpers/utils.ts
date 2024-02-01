import { OrderItem } from "../types/OrderItem";

export const getUniqueValues = <T>(arr: OrderItem[], func: (item: OrderItem) => T): T[] => [
    ...new Set(
        arr.map(func).sort((a, b) => +a - +b)
    )
];
