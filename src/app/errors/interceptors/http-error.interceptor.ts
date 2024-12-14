import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = new Router
  return next(req).pipe(
    tap({
      next: () => {},
      error: (error) => {
        router.navigate(["error"], {state: {error: JSON.stringify(error)}})
      }
    })
  );
};
