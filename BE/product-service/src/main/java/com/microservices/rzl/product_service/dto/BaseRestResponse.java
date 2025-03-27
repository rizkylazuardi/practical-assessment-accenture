package com.microservices.rzl.product_service.dto;

import java.io.Serializable;

public class BaseRestResponse <T> implements Serializable {
    private String execStatus;
    private Integer responseCode;
    private String message;
    private T payload;

    public void build(Integer responseCode, String execStatus, T payload) {
        this.responseCode = responseCode;
        this.execStatus = execStatus;
        this.payload = payload;
    }

    public String getExecStatus() {
        return execStatus;
    }

    public void setExecStatus(String execStatus) {
        this.execStatus = execStatus;
    }

    public Integer getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(Integer responseCode) {
        this.responseCode = responseCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }
}
