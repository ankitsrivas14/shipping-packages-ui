import { OrderItem } from "../types/OrderItem";

export const getUniqueValues = <T>(arr: OrderItem[], func: (item: OrderItem) => T): T[] => [
    ...new Set(
        arr.map(func).sort((a, b) => +a - +b)
    )
];

export const getRandomRGBColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const rgbColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    return rgbColor;
}
