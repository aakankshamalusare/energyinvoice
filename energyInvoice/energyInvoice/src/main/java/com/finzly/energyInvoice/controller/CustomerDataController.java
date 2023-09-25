package com.finzly.energyInvoice.controller;

import java.util.List;
import java.util.Map;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.finzly.energyInvoice.entity.CustomerData;
import com.finzly.energyInvoice.service.CustomerDataService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerDataController {

	@Autowired
	private CustomerDataService customerDataService;

	
	
	/**
	 * @author Aakanksha
	 * Adds a new customer.
	 *
	 * @param customerData The customer data to be added.
	 * @return A map containing information about the result of the operation.
	 */
	@PostMapping(value = "/add-customer")
	public Map<String, String> addCustomer(@RequestBody CustomerData customerData) {

		return customerDataService.addCustomer(customerData);

	}

	
	/**
	 * 
	 * @author Aakanksha
	 * Uploads customer data from a file.
	 *
	 * @param dataFile The uploaded file containing customer data.
	 * @return A ResponseEntity containing a message indicating the result of the upload.
	 */
	@PostMapping(value = "/upload-customer")
	public ResponseEntity<Map<String, String>> uploadCustomer(@RequestParam("file") MultipartFile dataFile) {

		return customerDataService.uploadCustomer(dataFile);

	}
	
	
	/**
	 * 
	 * @author Aakanksha
	 * Retrieves a list of customers.
	 *
	 * @return A ResponseEntity containing a list of CustomerData objects.
	 */
	@GetMapping(value="/get-customers")
	public ResponseEntity<List<CustomerData>>getCustomers(){
		
		
		return customerDataService.getCustomers();
	}
	
	
	
	
	
	
}

