package com.microservices.rzl.product_service.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Mengizinkan semua path untuk menerima request dari semua origin
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Ganti dengan domain frontend kamu
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Metode HTTP yang diizinkan
                .allowedHeaders("*") // Mengizinkan semua header
                .allowCredentials(true); // Jika kamu menggunakan cookies atau credentials
    }
}
