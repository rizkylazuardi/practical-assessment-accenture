package com.microservices.rzl.product_service.util.converter;

import java.util.List;

public interface BaseConverter<T, M> {
    T toDto(M model);
    List<T> toDtos(List<M> models);
    M toModel(T dto);
    List<M> toModels(List<T> dtos);
}
