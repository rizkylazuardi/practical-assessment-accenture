package com.microservices.rzl.product_service.service.impl;

import com.microservices.rzl.product_service.entity.ProductEnity;
import com.microservices.rzl.product_service.repository.ProductRepository;
import com.microservices.rzl.product_service.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public List<ProductEnity> getByCategory(String category, Sort sort) {
        return productRepository.findByCategory(category, sort);
    }

    @Override
    public List<ProductEnity> getByPrice(Double minPrice, Double maxPrice, Sort sort) {
        return productRepository.findByPriceBetween(minPrice, maxPrice, sort);
    }

    @Override
    public Page<ProductEnity> getAll(Pageable pagable) {
        return productRepository.findAll(pagable);
    }

    @Override
    public ProductEnity save(ProductEnity entity) {
        return productRepository.save(entity);
    }

    @Override
    public List<String> getListCategory() {
        return productRepository.getListCategory();
    }
}
