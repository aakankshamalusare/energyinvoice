package com.finzly.energyInvoice.service;

import java.util.HashMap;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finzly.energyInvoice.dao.LoginDao;
import com.finzly.energyInvoice.entity.Login;

@Service
public class LoginService {
	
	@Autowired
	LoginDao loginDao;
	
	
	public ResponseEntity<Map<String,Object>> checkValid(long user){
		
        Map<String, Object > response= new HashMap<>();
  
        Login isLogin = loginDao.checkValid(user);
  
        if(isLogin!=null) {
  	
      	  response.put("otp",isLogin);
  	      return ResponseEntity.ok().body(response);
        }
  
        response.put("Message","Invalid User");
        return ResponseEntity.badRequest().body(response);
	
	}
	
   
	
	public ResponseEntity<Map<String,String>> login(Login user) {
		
	    Map<String,String> response = new HashMap<>();
	    
        boolean isLogin = loginDao.login(user);
        
        if(isLogin) {
        	
        	response.put("Message","Logged In");
        	return ResponseEntity.ok().body(response);
        }
        
        response.put("Message","Invalid OTP");
        return ResponseEntity.badRequest().body(response);
	}
	
	
	


}
