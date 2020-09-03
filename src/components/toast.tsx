import React, { useEffect, useState } from 'react';
import { Toast as ToastModel, toastService, ToastType } from '../services/ui/ToastService';
import { Subscription } from 'rxjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNameUtil } from '../utils';

export function Toast ({toastModel, id}: ToastProps) {
  const wrapperClassList = classNameUtil(
    'text-white-100 p-4 w-4/5 rounded-md transition duration-500 ease-in-out mt-4 items-center flex', { 
    'opacity-100': toastModel.visible,
    'opacity-0': !toastModel.visible,
    'bg-green': toastModel.type === ToastType.success,
    'bg-error': toastModel.type === ToastType.error
  }
  );
  return (
    <div className={wrapperClassList}>
      <div className="flex-grow">{toastModel.message}</div>
      <FontAwesomeIcon icon='times' className="cursor-pointer" onClick={() => toastService.removeToast(id)} />
    </div>
  )
}

interface ToastProps {
  toastModel: ToastModel;
  id: number;
}

export const Toasts = () => {

  const [toasts, setToasts] = useState([] as ToastModel[]);
  
  useEffect(() => {
    const sub: Subscription = toastService.getToasts().subscribe(ts => setToasts(ts));
    return function cleanUp() { sub.unsubscribe(); }
  }, [])

  return (
    <div className="absolute top-0 w-full flex justify-center flex-col items-center">
      { toasts.map((t, i) => <Toast toastModel={t} id={i} key={i} />) }
    </div>
  )
}