import { ProductPage } from './productModel';
import { Button, Dropdown, InputNumber, InputNumberProps, MenuProps, message, Popover, Space} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { valueType } from 'antd/es/statistic/utils';
import formatNumberWithComma from '@/util/number';

const Product = (props: ProductPage) => {
    const { title, products, loading, handleFilterCategory, categories, handlePageSize, pageSize, sortBy, handleSortBy, category, handleAddToCart } = props;
    const [cartQty, setCartQty] = useState<number | null>(1);
    const [messageApi, contextHolder] = message.useMessage();

    const onChangeCartInput: InputNumberProps['onChange'] = (value: valueType | null) => {
        const param = value ? parseInt(value.toString()) : 1;
        setCartQty(param);
      };
    
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const id = e.key.split("-")[0];
        if (id == "999") {
            handleFilterCategory("");
        } else {
            const cat = e.key.split("-")[1];
            handleFilterCategory(cat);
        }
    };

    const handlePageSizeClick: MenuProps['onClick'] = (e) => {
        const size = parseInt(e.key);
        handlePageSize(size);
    };

    const handleSortByClick: MenuProps['onClick'] = (e) => {
        handleSortBy(e.key);
    };
      
    const items: MenuProps['items'] = categories.length == 0 ? [] : (
        categories.map((item, idx) => {
            return {
                label: item, key: idx+"-"+item, style: { color: item === category ? 'darkgray' : '' }
            }
        })
    );
      
    const dataCategory = {
        items: [...items, 
          {
            label: 'Clear',
            key: '999',
            danger: true,
          }],
        onClick: handleMenuClick,
    };

    const dataPageSize = {
        items: [{
            label: '5',
            key: '5',
            style: { color: pageSize == 5 ? 'darkgray' : '' }
          },{
            label: '10',
            key: '10',
            style: { color: pageSize == 10 ? 'darkgray' : '' }
          }],
        onClick: handlePageSizeClick,
    };

    const dataSorting = {
        items: [{
            label: 'Product Name (A - Z)',
            key: 'name-asc',
            style: { color: sortBy == 'name-asc' ? 'darkgray' : '' }
          },{
            label: 'Product Name (Z - A)',
            key: 'name-desc',
            style: { color: sortBy == 'name-desc' ? 'darkgray' : '' }
          },{
            label: 'Price (Low to High)',
            key: 'price-asc',
            style: { color: sortBy == 'price-asc' ? 'darkgray' : '' }
          },{
            label: 'Price (High to Low)',
            key: 'price-desc',
            style: { color: sortBy == 'price-desc' ? 'darkgray' : '' }
          },{
            label: 'Reset Sorting',
            key: '',
            danger: true,
          }],
        onClick: handleSortByClick,
    };

    const getLabelSort = (param: string) => {
        return dataSorting.items.find(item => item.key == param)?.label;
    }

    return (
        <>
            {contextHolder}
            <h2>{title}</h2>
                { loading && <div><h3>Loading ...</h3></div> }
                { !loading && (
                <>
                <div className="header-product">
                    <div style={{ display: 'inline-block', marginRight: '15px' }}>Show <Dropdown menu={dataPageSize}>
                        <Button>
                            <Space>
                             { pageSize || "Page Size"}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown> record
                    </div>
                    <Dropdown menu={dataCategory}>
                        <Button>
                            <Space>
                             { category || "Category"}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Dropdown menu={dataSorting}>
                        <Button>
                            <Space>
                             { sortBy ? getLabelSort(sortBy) : "Sort By"}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
                <div className="produk-list">
                    {
                        products.map((item, idx) => (
                            <div className="produk-item" key={`productItem-${idx}`}>
                                <img src={`data:image/png;base64,${item?.image}`} alt="Produk 1" />
                                <h3>{item?.name}</h3>
                                <p><a href="#" className='link-category'>{item.category}</a>  Rp {formatNumberWithComma(item?.price)}</p>
                                <Popover
                                    content={
                                        <>
                                            <InputNumber min={1} max={999} defaultValue={1} onChange={onChangeCartInput} />
                                            <Button size="middle" color="danger" onClick={() => {
                                                handleAddToCart({ ...item, qty: cartQty });
                                                setCartQty(1);
                                                messageApi.open({
                                                    type: 'success',
                                                    content: 'Successfully add to cart !',
                                                });
                                            }} style={{ backgroundColor: 'orange', color: 'white', marginLeft: "5px" }}>Save</Button>
                                        </>
                                    }
                                    // title="Add to cart"
                                    trigger="click"
                                    placement="bottom"
                                    onOpenChange={(isOpen) => { if(!isOpen)setCartQty(1) }}
                                >
                                    <Button size="middle" type="primary" color="danger" variant='solid' style={{ marginRight: '10px' }}>Add to cart</Button>
                                </Popover>
                                <Button className="btn" size="middle" type="primary">Buy Now</Button>
                            </div>
                        ))
                    }
                    
                    
                </div>
                </>
                )}
        </>
    )
}

export default Product;