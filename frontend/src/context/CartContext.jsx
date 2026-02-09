import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

const STORAGE_KEY = "cart_items_v1";

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // ignore storage failures
        }
    }, [items]);

    const addToCart = (product, qty = 1) => {
        if (!product) return;

        const id = product.id ?? product.name; // fallback for demo data
        setItems((prev) => {
            const found = prev.find((x) => x.id === id);
            if (found) {
                return prev.map((x) =>
                    x.id === id ? { ...x, qty: x.qty + qty } : x
                );
            }
            return [
                ...prev,
                {
                    id,
                    name: product.name,
                    price: Number(product.price ?? 0),
                    imageUrl: product.imageUrl ?? product.img ?? "",
                    qty,
                },
            ];
        });
    };

    const removeFromCart = (id) => {
        setItems((prev) => prev.filter((x) => x.id !== id));
    };

    const setQty = (id, qty) => {
        const safeQty = Math.max(1, Number(qty || 1));
        setItems((prev) =>
            prev.map((x) => (x.id === id ? { ...x, qty: safeQty } : x))
        );
    };

    const incQty = (id, by = 1) => {
        const step = Math.max(1, Number(by || 1));
        setItems((prev) =>
            prev.map((x) => (x.id === id ? { ...x, qty: (x.qty || 0) + step } : x))
        );
    };

    const decQty = (id, by = 1) => {
        const step = Math.max(1, Number(by || 1));
        setItems((prev) =>
            prev.map((x) => {
                if (x.id !== id) return x;
                const next = (x.qty || 0) - step;
                return { ...x, qty: Math.max(1, next) };
            })
        );
    };

    const clearCart = () => setItems([]);

    const cartCount = useMemo(
        () => items.reduce((sum, x) => sum + (x.qty || 0), 0),
        [items]
    );

    const subtotal = useMemo(
        () => items.reduce((sum, x) => sum + x.price * x.qty, 0),
        [items]
    );

    const value = useMemo(
        () => ({
            items,
            cartCount,
            subtotal,
            addToCart,
            incQty,
            decQty,
            removeFromCart,
            setQty,
            clearCart,
        }),
        [items, cartCount, subtotal]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
