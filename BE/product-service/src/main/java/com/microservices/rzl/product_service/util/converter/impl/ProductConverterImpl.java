package com.microservices.rzl.product_service.util.converter.impl;

import com.microservices.rzl.product_service.dto.ProductDto;
import com.microservices.rzl.product_service.entity.ProductEnity;
import com.microservices.rzl.product_service.util.converter.BaseConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductConverterImpl implements BaseConverter<ProductDto, ProductEnity> {
    @Override
    public ProductDto toDto(ProductEnity model) {
        ProductDto result = new ProductDto();
        result.setId(model.getId());
        result.setName(model.getName());
        result.setCategory(model.getCategory());
        result.setPrice(model.getPrice());
        result.setImage(model.getImage());
        return result;
    }

    @Override
    public List<ProductDto> toDtos(List<ProductEnity> models) {
        List<ProductDto> results = new ArrayList<>();
        for(ProductEnity entity: models){
            ProductDto data = this.toDto(entity);
            results.add(data);
        }
        return results;
    }

    @Override
    public ProductEnity toModel(ProductDto dto) {
        return null;
    }

    @Override
    public List<ProductEnity> toModels(List<ProductDto> dtos) {
        return List.of();
    }
}
