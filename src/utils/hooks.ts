import { Observable } from "rxjs";
import { useState, useEffect } from "react";

export const useConnectObservable = <T>(observable: Observable<T>, initialVal: T): T => {
  const [val, setVal] = useState(initialVal);
  useEffect(() => {
    const sub = observable.subscribe(setVal);
    return () => sub.unsubscribe()
  }, [])
  return val;
}