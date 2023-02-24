import { first, Observable } from 'rxjs';

export function takeFirst<T>(obs$: Observable<T>) {
  let val: T;
  obs$.pipe(first()).subscribe((v) => (val = v));
  return val;
}
