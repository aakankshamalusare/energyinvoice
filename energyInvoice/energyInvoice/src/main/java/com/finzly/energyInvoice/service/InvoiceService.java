package com.finzly.energyInvoice.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finzly.energyInvoice.dao.InvoiceDao;
import com.finzly.energyInvoice.entity.CustomerData;
import com.finzly.energyInvoice.entity.Invoice;

@Service
public class InvoiceService {
	
	@Autowired
	InvoiceDao invoiceDao;
	

	public ResponseEntity<List<Invoice>> getInvoices() {
		
		List<Invoice> invoices = invoiceDao.getInvoices();;
		return ResponseEntity.ok().body(invoices);
		
	}


	public List<Invoice> getCustInvoices(long customerId) {
		
		
		List<Invoice> invoices = invoiceDao.getInvoices();
		
		List<Invoice> response = new LinkedList<Invoice>();
		
		for(Invoice invoice: invoices) {
			
			if(invoice.getMapId()==customerId){
				
				response.add(invoice);
			}
		}
		return(response);
	
	}


	public List<Invoice> getUnpaidInvoices(long customerId) {
		
		List<Invoice> invoices = invoiceDao.getInvoices();
		
		List<Invoice> response = new LinkedList<Invoice>();
		
		for(Invoice invoice: invoices) {
			
			if(invoice.getMapId()==customerId && invoice.getPaymentStatus()== false){
				
				response.add(invoice);
			}
		}
		return(response);
	}
	
	
    public List<Invoice> getpaidInvoices(long customerId) {
		
		List<Invoice> invoices = invoiceDao.getInvoices();
		
		List<Invoice> response = new LinkedList<Invoice>();
		
		for(Invoice invoice: invoices) {
			
			if(invoice.getMapId()==customerId && invoice.getPaymentStatus()== true){
				
				response.add(invoice);
			}
		}
		return(response);
	}


	public ResponseEntity<Map<String,Long>> updateStatus(long invoiceId) {
		
		 long update = invoiceDao.updateStatus(invoiceId);
		 
		 Map<String,Long> response = new HashMap<>();
		 
		 response.put("customerId", update);
		 
		 return ResponseEntity.ok().body(response);
	}

}
