package com.finzly.energyInvoice.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.finzly.energyInvoice.entity.Invoice;
import com.finzly.energyInvoice.entity.Payment;
import com.finzly.energyInvoice.entity.Receipt;
import com.finzly.energyInvoice.service.PaymentService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {
	
	
	@Autowired
	PaymentService paymentService;
	
	
	
	/**
	 * 
	 * @author Aakanksha
	 * Endpoint to retrieve the payment history for a specific customer.
	 *
	 * @param customerId The ID of the customer for whom to retrieve payment history.
	 * @return A list of payment records representing the payment history.
	 */

	@GetMapping(value="/get-history/{customerId}")
	public Set<Receipt> getHistory(@PathVariable long customerId) {
		
		return paymentService.getHistory(customerId);	
	}
	
	
	
	/**
	 * 
	 * @author Suraj
	 * Endpoint to make a payment for an invoice.
	 *
	 * @param invoice The invoice for which the payment is being made.
	 * @return A response entity containing a map with payment-related information.
	 */
	@PostMapping(value="/make-payment")
	public ResponseEntity<Map<String, String>> makePayment(@RequestBody Invoice invoice){
		
		return paymentService.makePayment(invoice);
		
		
	}
	
	
	/**
	 * 
	 * @author Suraj
	 * Endpoint to check if an invoice is pending.
	 *
	 * @param invoice The invoice to check.
	 * @return A response entity containing a map with the result of the pending check.
	 */
	@PostMapping(value="/is-pending")
	public ResponseEntity<Map<String, Object>> isPending(@RequestBody Invoice invoice){
		
		return paymentService.isPending(invoice);
	}
	
	
	
	
	
	
	

}
