package com.microservices.rzl.product_service.repository;

import com.microservices.rzl.product_service.entity.ProductEnity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEnity, Long> {
    List<ProductEnity> findByCategory(String category, Sort sort);
    List<ProductEnity> findByPriceBetween(Double minPrice, Double maxPrice, Sort sort);

    @Query(value = "select distinct category from product", nativeQuery = true)
    List<String> getListCategory();
}
