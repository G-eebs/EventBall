import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const endAfterStartValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const startDate = control.get("start")?.value
  const endDate = control.get("end")?.value
  return startDate >= endDate ? {endAfterStart: true} : null;
}
