import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log(' intecepting request ');
      const modifiedRequest = req.clone({
        headers: req.headers.append('X-Requested-With', 'XYZ')
      });
      return next.handle(modifiedRequest).pipe(tap(event => {
        console.log('event type: ', event.type);
        if (event.type === HttpEventType.Response) {
          console.log('event body: ', event.body);
        }
      }));
  }
}
