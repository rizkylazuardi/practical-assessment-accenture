package com.microservices.rzl.product_service.controller;

import com.microservices.rzl.product_service.dto.ProductDto;
import com.microservices.rzl.product_service.dto.ProductResponse;
import com.microservices.rzl.product_service.entity.ProductEnity;
import com.microservices.rzl.product_service.service.ProductService;
import com.microservices.rzl.product_service.util.converter.BaseConverter;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/${spring.application.name}/product")
public class ProductController extends BaseRestController{

    @Autowired
    private BaseConverter<ProductDto, ProductEnity> productConverter;
    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ProductResponse getProducts(@RequestParam(value = "category", required = false) String category,
                                          @RequestParam(value = "minPrice", required = false) Double minPrice,
                                          @RequestParam(value = "maxPrice", required = false) Double maxPrice,
                                          @RequestParam(value = "page", defaultValue = "0") int page,
                                          @RequestParam(value = "size", defaultValue = "10") int size,
                                       @RequestParam(value="sortBy", required = false)String sortBy) {
        ProductResponse response = new ProductResponse();

        Sort sort = Sort.by(Sort.Order.asc("name"));//default
        if(StringUtils.isNotEmpty(sortBy)){
            String sortField = sortBy.split("-")[0];
            String sortDirection = sortBy.split("-")[1];
            if (sortDirection.equalsIgnoreCase("asc")) {
                sort = Sort.by(Sort.Order.asc(sortField));
            }else{
                sort = Sort.by(Sort.Order.desc(sortField));
            }
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        if (category != null) {
            List<ProductEnity> data = productService.getByCategory(category, sort);
            response.setData(productConverter.toDtos(data));
            response.setTotalData((long) data.size());
        } else if (minPrice != null && maxPrice != null) {
            List<ProductEnity> data = productService.getByPrice(minPrice, maxPrice, sort);
            response.setData(productConverter.toDtos(data));
            response.setTotalData((long) data.size());
        } else {
            Page<ProductEnity> data = productService.getAll(pageable);
            response.setData(productConverter.toDtos(data.getContent()));
            response.setTotalData(data.getTotalElements());
        }
        response.setPage(page);
        response.setPageSize(size);
        return response;
    }

    @GetMapping("/list-category")
    public List<String> getListCategory() {
        List<String> categories = productService.getListCategory();
        return categories;
    }

    @PostMapping("/add")
    public ResponseEntity<ProductEnity> addProduct(@RequestParam String name,
                                                   @RequestParam Double price,
                                                   @RequestParam String category,
                                                   @RequestParam MultipartFile image) throws IOException {
        // Mengonversi gambar menjadi byte array

        try {
            byte[] imageBytes = image.getBytes();

            // Membuat objek produk baru dan menyimpan gambar sebagai byte[]
            ProductEnity product = new ProductEnity();
            product.setName(name);
            product.setPrice(price);
            product.setCategory(category);
            product.setImage(imageBytes);
            System.out.println(name + price + category + image.getName());
            // Menyimpan produk ke database
            ProductEnity savedProduct = productService.save(product);
            return ResponseEntity.ok(savedProduct);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
}
