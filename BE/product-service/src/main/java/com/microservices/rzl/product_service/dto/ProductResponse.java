package com.microservices.rzl.product_service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class ProductResponse implements Serializable {
    private List<ProductDto> data;
    private Long totalData;
    private Integer page;
    private Integer pageSize;
}
