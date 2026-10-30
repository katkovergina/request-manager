import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { RequestPayload, RequestResponse } from '../../features/request-form/models/request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  submit(payload: RequestPayload): Observable<RequestResponse> {
    return timer(800).pipe(
      map(() => {
        if (payload.email.toLowerCase() === 'fail@example.com') {
          throw new Error('Не удалось создать заявку');
        }

        return { id: 'DEMO-001' };
      }),
    );
  }
}
