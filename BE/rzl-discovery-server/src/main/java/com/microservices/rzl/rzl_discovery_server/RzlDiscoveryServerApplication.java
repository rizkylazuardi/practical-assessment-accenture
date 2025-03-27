package com.microservices.rzl.rzl_discovery_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@EnableEurekaServer
//@EnableDiscoveryClient
//@Configuration
public class RzlDiscoveryServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(RzlDiscoveryServerApplication.class, args);
	}

}
