package com.stepacademy.sameng.ecommerce_graduation_project.exceptions;

import org.springframework.http.HttpStatus;

public class EmailAlreadyExistsException extends ApiException {

    public EmailAlreadyExistsException() {
        super(HttpStatus.CONFLICT, "Email already exists");
    }
}
