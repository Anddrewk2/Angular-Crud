import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private isUserLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa ở đây
    // Nếu cần thực hiện một số logic khởi tạo khác có thể thêm vào đây
  }

  setIsUserLoggedIn(value: boolean): void {
    this.isUserLoggedInSubject.next(value);
  }

  getIsUserLoggedIn(): BehaviorSubject<boolean> {
    return this.isUserLoggedInSubject;
  }
}
