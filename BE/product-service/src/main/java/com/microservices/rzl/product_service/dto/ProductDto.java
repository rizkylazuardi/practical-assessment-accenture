package com.microservices.rzl.product_service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
public class ProductDto implements Serializable {
    private Long id;
    private String name;
    private Double price;
    private String category; // this should be separated entity
    private byte[] image;
}
