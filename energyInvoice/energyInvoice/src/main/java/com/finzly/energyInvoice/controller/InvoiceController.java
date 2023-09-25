package com.finzly.energyInvoice.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finzly.energyInvoice.entity.CustomerData;
import com.finzly.energyInvoice.entity.Invoice;
import com.finzly.energyInvoice.service.CustomerDataService;
import com.finzly.energyInvoice.service.InvoiceService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class InvoiceController {
	

	@Autowired
	private InvoiceService invoiceService;

	
	/**
	 * 
	 * @author Aakanksha
	 * Retrieves a list of invoices for a specific customer.
	 *
	 * @param customerId The ID of the customer.
	 * @return A list of invoices for the customer.
	 */
	@GetMapping(value="/get-custInvoices/{customerId}")
	public List<Invoice> getCustInvoices(@PathVariable long customerId ){
		
		return invoiceService.getCustInvoices(customerId);	
		
	}
	
	
	/**
	 * 
	 * @author Aakanksha
	 * Updates the status of an invoice.
	 *
	 * @param invoiceId The ID of the invoice to update.
	 * @return A response entity with a message indicating the result of the update.
	 */
	@PutMapping(value="/update-status/{invoiceId}")
	public ResponseEntity<Map<String,Long>> updateStatus(@PathVariable long invoiceId ){
		
		return invoiceService.updateStatus(invoiceId);
	}
	
	
	/**
	 * 
	 * @author Suraj
	 * Retrieves a list of all invoices.
	 *
	 * @return A response entity containing a list of invoices.
	 */
	@GetMapping(value="/get-invoices")
	public ResponseEntity<List<Invoice>> getInvoices(){
		
		
		return invoiceService.getInvoices();
	}
	

	/**
	 * 
	 * @author Suraj
	 * Retrieves a list of unpaid invoices for a specific customer.
	 *
	 * @param customerId The ID of the customer.
	 * @return A list of unpaid invoices for the customer.
	 */
	@PostMapping(value="/get-unpaid/{customerId}")
	public List<Invoice> getUnpaidInvoices(@PathVariable long customerId) {
		
		return invoiceService.getUnpaidInvoices(customerId);	
	}
	
	
	
	/**
	 * 
	 * @author Suraj
	 * Retrieves a list of paid invoices for a specific customer.
	 *
	 * @param customerId The ID of the customer.
	 * @return A list of paid invoices for the customer.
	 */
	@PostMapping(value="/get-paid/{customerId}")
	public List<Invoice> getpaidInvoices(@PathVariable long customerId) {
		
		return invoiceService.getpaidInvoices(customerId);	
	}
	

	
}
