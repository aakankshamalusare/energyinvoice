package com.finzly.energyInvoice.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.finzly.energyInvoice.entity.Login;
import com.finzly.energyInvoice.utility.Validation;


@Repository
public class LoginDao {
	
	@Autowired
	SessionFactory factory;
	
	public Login checkValid(long user) {
		
        Session session = factory.openSession();
		
		Criteria criteria = session.createCriteria(Login.class);
		
		List<Login> isValid = criteria.add(Restrictions.eq("employeeId",user)).list();
		

		if(isValid.isEmpty()) {
			
			return null;
		}
		
		isValid.get(0).setOtp(Validation.generateRandom());
		session.update(isValid.get(0));
		
		session.beginTransaction().commit();
		
		return isValid.get(0);
		
		
	}

	   public boolean login(Login user) {
        
		Session session = factory.openSession();
		
		Criteria criteria = session.createCriteria(Login.class);
		
		List<Login> isValid = criteria.add(Restrictions.eq("employeeId",user.getEmployeeId())).list();
		
		if(isValid.isEmpty()) {
			
			return false;
		} 
		
		
		if(isValid.get(0).getOtp()== user.getOtp()){
			
			return true;
		}
		
		return false;
	}
	
	
	

}
