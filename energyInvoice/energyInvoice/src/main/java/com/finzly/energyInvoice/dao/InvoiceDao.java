package com.finzly.energyInvoice.dao;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.finzly.energyInvoice.entity.CustomerData;
import com.finzly.energyInvoice.entity.Invoice;
import com.finzly.energyInvoice.entity.Payment;
import com.finzly.energyInvoice.entity.Receipt;

@Repository
public class InvoiceDao {
	
	
	@Autowired
	SessionFactory factory;

	public void generateInvoice(CustomerData customerData) {
		
		Invoice invoice = new Invoice();
		
		String uniqueId = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8);
		String invoiceNumber = LocalDate.now().toString().replace("-", "")+"/" +uniqueId+"/"+customerData.getCustomerId();
		invoice.setInvoiceNumber(invoiceNumber);
		
		
		invoice.setAmountDue(invoice.getBillingRate()*customerData.getUnitConsumption());
     	invoice.setPaymentStatus(false);   
     	
     	invoice.setBillingDuration(customerData.getBillingDuration());
     	invoice.setDueDate(customerData.getBillDueDate());
     	invoice.setUnitConsumption(customerData.getUnitConsumption());
     	invoice.setMapId(customerData.getCustomerId());
     	
     	Session session = factory.openSession();
     	session.beginTransaction();
     	session.save(invoice);
     	

     	session.getTransaction().commit();
     	session.close();
     	
		
	}
	
	
    public List<Invoice> getInvoices() {
		
		Session session = factory.openSession();
		Criteria query = session.createCriteria(Invoice.class);
		List<Invoice> list = query.list();
		return list;
	}


	
    public long updateStatus(long invoiceId) {
		
		Session session = factory.openSession();
		session.beginTransaction();
		Invoice invoice = session.get(Invoice.class,invoiceId);
	
		invoice.setPaymentStatus(true);
		
		session.update(invoice);
        session.getTransaction().commit();
	    session.close();
		
	
	    session = factory.openSession();
		session.beginTransaction();
		 
		/* Transaction update*/
		 
		double totalBill = invoice.getAmountDue();
		LocalDate currentDate = LocalDate.now();
		Date date = Date.valueOf(currentDate);;
		boolean isEarly =false;
	     
		 
		// Apply a 5% discount for on-time payment
		  if (isEarlyPayment(date,invoice.getDueDate())) {
		       
			 totalBill -= (totalBill * (5/100));
			 isEarly = true;
		  }
		 
         if(totalBill<0) {
			 
			 totalBill = invoice.getAmountDue();
		 }
			 
		
         Payment payment = new Payment();
		 
		 payment.setPaymentAmount(totalBill);
		 payment.setIsEarly(isEarly);
		 payment.setIsOnline(false);
		
	
		 payment.setPaymentMethod("Offline");
		 
		 payment.setTransactionDate(Date.valueOf(LocalDate.now()));
		 payment.setMappedInvoice(invoice.getInvoiceId());
		 payment.setMappedCustomer(invoice.getMapId());
		 
		 session.save(payment);
		 
		 session.getTransaction().commit();
		 
		 session.close();
		 
		 
		  
		  // Receipt
		  
		  session = factory.openSession();
		  session.beginTransaction();
		  
		  String name = getName(invoice.getMapId());
		  
		  Receipt receipt = new Receipt();
		  
		  receipt.setName(name);
		  receipt.setCustomerId(invoice.getMapId());
		  receipt.setInvoiceNumber(invoice.getInvoiceNumber());
		  receipt.setUnitConsumption(invoice.getUnitConsumption());
		  receipt.setAmount(invoice.getAmountDue());
		  receipt.setDiscount_Amount(totalBill);
		  receipt.setTrasactionDate(Date.valueOf(LocalDate.now()));
		  receipt.setPaymentMode(payment.getPaymentMethod());
		  
		  session.save(receipt);
         session.getTransaction().commit();
		  
		  session.close();	 
		return invoice.getMapId();
		
	}
	
    
      private String getName(long mapId) {
		
		Session session = factory.openSession();
		CustomerData customer = session.get(CustomerData.class,mapId);
		
		return customer.getName();
	}
    
    
    private boolean isEarlyPayment(Date currentDate,Date dueDate) {
		
		return currentDate.before(dueDate) || currentDate.equals(dueDate);

	}


	
	
	

}
