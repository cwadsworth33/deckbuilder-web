import { BehaviorSubject, Observable } from 'rxjs';

export enum ToastType {
  success = 'success',
  error = 'error'
};

export class ToastService {

  private toasts = new BehaviorSubject<Toast[]>([]);

  public getToasts(): Observable<Toast[]> {
    return this.toasts.asObservable();
  }

  public showSuccessToast(message: string): void {
    this.toasts.next([...this.toasts.value, new Toast(ToastType.success, message)]);
  }

  public showErrorToast(message: string): void {
    this.toasts.next([...this.toasts.value, new Toast(ToastType.error, message)]);
  }

  public removeToast(index: number): Promise<any> {
    const curVal = this.toasts.value;
    const newVal = [...curVal];
    newVal[index].visible = false;
    this.toasts.next(newVal);
    return new Promise(function(res) { setTimeout(res, 200) })
      .then(() => this.toasts.next(this.toasts.value.filter((_, i) => i !== index)));
  }
}

export class Toast {
  type: ToastType;
  message: string;
  visible: boolean;

  constructor(type: ToastType, message: string, visible?: boolean) {
    this.type = type;
    this.message = message;
    this.visible = visible ? visible : true;
  }
}