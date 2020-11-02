import { Observable } from "rxjs";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export const useConnectObservable = <T>(observable: Observable<T>, initialVal: T): T => {
  const [val, setVal] = useState(initialVal);
  useEffect(() => {
    const sub = observable.subscribe(setVal);
    return () => sub.unsubscribe();
  }, [])
  return val;
}

export const useEscapeListener = (escapeFn: Function) => {
  const wrappedEscapeFn = (e: KeyboardEvent) => {
    if(e.keyCode === 27) {
      escapeFn();
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", wrappedEscapeFn);
    return () => document.removeEventListener("keydown", wrappedEscapeFn);
  }, [])
}