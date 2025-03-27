'use client';
import { Button, Col, Divider, Row, Select, Space, Table } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./../../component/cart/cartStore";
import formatNumberWithComma from "./../../util/number"

const CartPage = () => {
    const dispatch = useDispatch();
    const [shipping, setShipping] = useState('jne');
    const [selectedCart, setSelectedCart] = useState([]);
    const carts = useSelector((state) => state.cart.carts);
    const shippingCost = { jne: 20000, tiki: 30000, lion: 45000 };
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Image',
          dataIndex: 'image',
          render: text => <img className="cart-img" src={`data:image/png;base64,${text}`} />
        },
        {
          title: 'Price',
          dataIndex: 'price',
          render: text => <>{`Rp ${formatNumberWithComma(text)}`}</>
        },
        {
            title: 'Total Price',
            key: 'totalPrice',
            render: (_, record) => (
              <Space size="middle">
                {`Rp ${formatNumberWithComma(record.price * record.qty)}`}
              </Space>
            ),
        },
        {
            title: 'Qty',
            dataIndex: 'qty'
        },
      ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedCart(selectedRows);
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };

      const handleShippingChange = (value) => {
        setShipping(value);
      }

      const handleClearCart = () => {
        dispatch(clearCart())
      }

      const dataTable = carts.map((item, idx) => { return { ...item, key: idx } })
    return (
        <section className="produk">
            <Row>
                <Col span={16}>
                    <h2>My Cart</h2>
                    <Table
                        rowSelection={{ type: 'checkbox', onChange: rowSelection.onChange}}
                        columns={columns}
                        dataSource={dataTable}
                    />
                </Col>
                <Col span={8} style={{ backgroundColor: '#ededed',padding: '20px 50px' }}>
                    <div>
                        <h2>Summary</h2>
                        <Row justify={"start"} align={"top"} >
                            <Col span={"12"} style={{ textAlign: 'left' }}><h3>{selectedCart.length} Items</h3></Col>
                            <Col span={"12"}><h3>Rp { formatNumberWithComma(selectedCart.reduce((acc, add)=> acc+(add.price * add.qty) , 0) )}</h3></Col>
                        </Row>
                        <Divider />
                        <Row><Col span={"12"} style={{ textAlign: 'left' }}><h3>Shipping</h3></Col>
                        <Col span={"12"}>
                            <Select
                                style={{ width:'100%' }}
                                defaultValue="jne"
                                onChange={handleShippingChange}
                                options={[
                                    { value: 'jne', label: 'JNE Rp 20.000' },
                                    { value: 'tiki', label: 'TIKI Rp 30.000' },
                                    { value: 'lion', label: 'Lion Parcel Rp 45.000' },
                                ]}
                                />
                        </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col span={"12"}><h2>Total Price</h2></Col>
                            <Col span={"12"}><h2>{ carts.length ===0 || selectedCart.length === 0 ? 'Rp -' :  `Rp ${ formatNumberWithComma((selectedCart.reduce((acc, add)=> acc+(add.price * add.qty) , 0)) + shippingCost[shipping] )}`}</h2></Col>
                        </Row>
                        <Divider></Divider>
                        <Row>
                            <Col span={"24"}>
                                <Button color="danger" size="large" style={{ width: '80%', backgroundColor: '#000', color: '#fff' }}>Checkout</Button>
                                <Button color="danger" onClick={handleClearCart} size="large" style={{ width: '80%', backgroundColor: 'orange', color: '#fff' }}>Reset Cart</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            
        </section>
    )
}

export default CartPage;