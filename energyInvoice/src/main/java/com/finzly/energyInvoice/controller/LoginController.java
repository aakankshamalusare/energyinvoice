package com.finzly.energyInvoice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.finzly.energyInvoice.entity.Login;
import com.finzly.energyInvoice.service.LoginService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {
	
	
	@Autowired
	LoginService loginService;
	
	/**
	 * @author Aakanksha
	 * Checks the validity of a user.
	 *
	 * @param user The user's login information.
	 * @return A ResponseEntity containing a map with validation results.
	 */
	@PostMapping(value = "/check-valid/{employeeId}")
	ResponseEntity<Map<String, Object>> checkValid(@PathVariable long employeeId){
		   
		return loginService.checkValid(employeeId);
	}

	
	/**
	 * Aakanksha
	 * Handles user login.
	 *
	 * @param user The user's login information.
	 * @return A ResponseEntity containing a map with login results.
	 */
	@PostMapping(value = "/login")
	ResponseEntity<Map<String,String>> login(@RequestBody Login user){
		   
		return loginService.login(user);
		
	}
	
	
	
}
