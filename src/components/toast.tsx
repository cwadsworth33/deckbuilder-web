import React, { useContext } from 'react';
import { Toast as ToastModel, ToastType } from '../services/ui/ToastService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNameUtil } from '../utils';
import { ServiceContext } from '../App';
import { useConnectObservable } from '../utils/hooks';

export function Toast ({toastModel, id}: ToastProps) {

  const { toastService } = useContext(ServiceContext);

  const wrapperClassList = classNameUtil(
    'text-white-100 p-4 w-4/5 rounded-md transition duration-500 ease-in-out mt-4 items-center flex', { 
    'opacity-100': toastModel.visible,
    'opacity-0': !toastModel.visible,
    'bg-green': toastModel.type === ToastType.success,
    'bg-error': toastModel.type === ToastType.error
  });
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

export const Toasts: React.FC = () => {

  const { toastService } = useContext(ServiceContext);
  const toasts = useConnectObservable(toastService.getToasts(), []);

  return (
    <div className="absolute top-0 w-full flex justify-center flex-col items-center">
      { toasts.map((t, i) => <Toast toastModel={t} id={i} key={i} />) }
    </div>
  )
}