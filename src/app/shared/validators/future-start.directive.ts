import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { DateTime } from 'luxon';

export const futureStartValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const startDate = control.get("start")?.value
  const timeZone = control.get("timeZone")?.value

  const timeZoneTime = DateTime.local({ zone: timeZone }).toISO() ?? 0

  return startDate <= timeZoneTime ? {futureStart: true} : null;
}