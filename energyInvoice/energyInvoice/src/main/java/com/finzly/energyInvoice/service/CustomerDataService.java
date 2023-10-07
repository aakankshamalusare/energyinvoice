package com.finzly.energyInvoice.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.finzly.energyInvoice.dao.CustomerDataDao;
import com.finzly.energyInvoice.dao.InvoiceDao;
import com.finzly.energyInvoice.entity.CustomerData;
import com.finzly.energyInvoice.entity.Invoice;
import com.finzly.energyInvoice.utility.Parsing;
import com.finzly.energyInvoice.utility.Validation;

@Service
public class CustomerDataService {
	
	@Autowired
	private CustomerDataDao customerDataDao;
	
	@Autowired
	private InvoiceDao invoiceDao;
	
	@Autowired
	private InvoiceService invoiceService;
	
	@Autowired
	private SessionFactory factory;
	
	@Transactional	
	public Map<String, String> addCustomer(CustomerData customerData){
		
		Map<String,String> response = new HashMap<String, String>();
		
	    CustomerData isExists = customerDataDao.isExist(customerData.getEmail());
	   
	    CustomerData newData = new CustomerData();
	    
	    if(isExists == null) {
	    	
	    	 newData = customerDataDao.addCustomer(customerData);
	    	 invoiceDao.generateInvoice(newData);
	    	 response.put("Message", "Created successfully");
			 return (response);
	    	 
	    }else {
	    	
	    	List<Invoice> list = invoiceService.getCustInvoices(isExists.getCustomerId());
			
			for(Invoice val:list) {
	    		
	    		if(Validation.dateCompare(val.getBillingDuration(),customerData.getBillingDuration())){ 
	    			 response.put("Error", "Already Present");
	    			 return (response);
	    		}
	         }
	    	
	    	
	    	isExists.setBillingDuration(customerData.getBillingDuration());
	    	isExists.setUnitConsumption(customerData.getUnitConsumption());
	    	invoiceDao.generateInvoice(isExists);
	    	response.put("Message", "Added successfully");
	    	return (response);
	    
	     }	
	    
    }

	
	
	public ResponseEntity<Map<String,String>> uploadCustomer(MultipartFile dataFile) {
		
	   Map<String,String> response = new HashMap<>();
		
	   try {
           
		   // Check if the uploaded file is a CSV file
            if (!dataFile.getOriginalFilename().endsWith(".csv")) {
            	
			    response.put("Error","Invalid file format");
                return ResponseEntity.badRequest().body(response);
            }

            // Process the CSV file and add customer data
            List<CustomerData> customers = Parsing.parseCSV(dataFile.getInputStream());
            
            
            // Validate and save the customer records
            List<CustomerData> validCustomers = validateAndSaveCustomers(customers);
           

            int totalRecords = customers.size();
            int validRecords = validCustomers.size();
            int invalidRecords = totalRecords - validRecords;
 
            response.put("Total", ""+totalRecords);
            response.put("Valid", ""+validRecords);
            response.put("Invalid", ""+invalidRecords);
            

            return ResponseEntity.ok(response);
        
	  }catch (IOException e) {
        	
        	response.put("Error","Error processing the CSV file: ");
        	
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
       }
  }
	
	

  private List<CustomerData> validateAndSaveCustomers(List<CustomerData> customers) {
		
		 List<CustomerData> response = new ArrayList<CustomerData>();
		 Map<String,String> map = new HashMap<String, String>();
		 
		 for(CustomerData customerData:customers) {
			 
			 map = addCustomer(customerData);
			 
			     if(!map.containsKey("Error")) {
				 
			           response.add(customerData);
			     }
		 }
         
		 return response;
   }
	
	

	public ResponseEntity<List<CustomerData>> getCustomers() {
		
		List<CustomerData> customers = customerDataDao.getCustomers();
		
		return ResponseEntity.ok().body(customers);
	}
	
	
	
    
}
