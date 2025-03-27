//import Image from "next/image";
//import styles from "./page.module.css";
'use client';
import Product from "@/component/product/product";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import { setProduct } from "@/component/product/productStore";
import { addCart } from "@/component/cart/cartStore";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const carts = useSelector((state) => state.cart.carts);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [category, setCategory] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const handleAddToCart = (data) => {
    dispatch(addCart(data));
  }

  const fetchData = (currPage, currPageSize, category, sortParam) => {
    setLoading(true);
    const categoryAttr = category ? { category } : {};
    const sortAttr = sortParam ? { sortBy: sortParam } : {};
    const params = { page: currPage, size: currPageSize, ...categoryAttr, ...sortAttr };
    setTimeout(() => {
      axios.get('http://localhost:8091/product-service/product', { params })
          .then(res => {
              console.log(res);
              setLoading(false);
              dispatch(setProduct(res?.data));
          });
    }, 700)  
  }

  const fetchCategories = () => {
    axios.get('http://localhost:8091/product-service/product/list-category')
          .then(res => {
              setListCategory(res?.data);
          });
  }
  
  const handlePaging = (nextPage) => {
    setPage(nextPage-1);
  }

  const handleFilterCategory = (category) => {
    setCategory(category);
  }

  useEffect(() => {
    fetchData(page, pageSize, category, sortBy);
  }, [page, pageSize, category, sortBy])

  useEffect(() => {
      fetchData(page, pageSize);
      fetchCategories();
  }, [dispatch]);

  return (
    <section className="produk">
        <Product
          products={products?.data || []} 
          title="Our Products" 
          key={"productCatalog"} 
          loading={loading} 
          categories={listCategory}
          handleFilterCategory={handleFilterCategory}
          category={category} 
          handlePageSize={(ps) => { setPageSize(ps) }}
          pageSize={pageSize}
          handleSortBy={(sort) => { setSortBy(sort) }}
          sortBy={sortBy}
          handleAddToCart={handleAddToCart}
        />
        <Pagination pageSize={pageSize} current={page+1} total={products.totalData} onChange={handlePaging} style={{ display: "inline-block" }}/>
    </section>
  );
}
export default Home;