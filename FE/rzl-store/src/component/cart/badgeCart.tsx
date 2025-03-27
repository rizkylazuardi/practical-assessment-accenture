'use client';
import { Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import store from '@/redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Link from 'next/link';

const BadgeCart = () => {
    type RootState = ReturnType<typeof store.getState>;
    const carts = useSelector((state: RootState) => state.cart.carts);

    
    return (
        <Link href="/cart">
            <Badge count={carts.length}>
                <Button type="default" icon={<ShoppingCartOutlined />} size="large">
                </Button>
            </Badge>
        </Link>
    );
}

export default BadgeCart;