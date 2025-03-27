package com.microservices.rzl.product_service.service;

import com.microservices.rzl.product_service.entity.ProductEnity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface ProductService {
    List<ProductEnity> getByCategory(String category, Sort sort);
    List<ProductEnity> getByPrice(Double minPrice, Double maxPrice, Sort sort);
    Page<ProductEnity> getAll(Pageable pagable);
    ProductEnity save(ProductEnity entity);
    List<String> getListCategory();
}
