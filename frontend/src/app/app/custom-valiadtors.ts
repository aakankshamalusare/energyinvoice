import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator function to check if the date is between the 1st and 5th day of the month
export function billingDurationValidator(): ValidatorFn {
  
    return (control: AbstractControl): ValidationErrors | null => {
    
    if (control.value) {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      if (
        selectedDate.getDate() >= 1 &&
        selectedDate.getDate() <= 5 &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()
      ) {
        return null; // Validation passes
      } else {
        return { invalidBillingDuration: true }; // Validation fails
      }
    }
    return null; // Validation passes if the field is empty
  };
}
