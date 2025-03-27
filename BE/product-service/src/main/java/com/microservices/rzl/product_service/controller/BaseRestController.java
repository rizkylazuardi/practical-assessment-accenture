package com.microservices.rzl.product_service.controller;

import com.microservices.rzl.product_service.dto.BaseRestResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class BaseRestController {

    private static final String SUCCESS_CODE = "200";
    /**
     * echo service - can be used to make sure that the services are up and running.
     *
     * @return JSON response in the below structure,
     * <pre>
     *     {
     *      "execStatus": "RZL_000",
     *      "responseCode": 200,
     *      "payload": "success"
     *     }
     * </pre>
     */
    @RequestMapping(value = "/echo", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public BaseRestResponse<String> echo() {
        BaseRestResponse<String> response = new BaseRestResponse<>();
        response.build(HttpStatus.OK.value(), SUCCESS_CODE,
                "success");
        return response;
    }
}
