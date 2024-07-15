import { Injectable } from '@angular/core';
import { Auth, updateProfile, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { SharingService } from './sharing.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fauth: Auth;
  private currentUser: User | null = null;

  constructor(private router: Router, private sharingService: SharingService) {
    this.fauth = inject(Auth);

    onAuthStateChanged(this.fauth, (user) => {
      this.currentUser = user;
      if (user) {
        this.sharingService.setIsUserLoggedIn(true); // Cập nhật trạng thái đăng nhập khi người dùng đăng nhập thành công
      } else {
        this.sharingService.setIsUserLoggedIn(false); // Cập nhật trạng thái đăng nhập khi người dùng đăng xuất
      }
    });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }



  async createAccount(email: string, password: string, firstname: string, lastname: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.fauth, email, password);
      const user = result.user;
      await updateProfile(user, {
        displayName: `${firstname} ${lastname}`
      });
      this.currentUser = user; // Lưu thông tin người dùng vào currentUser khi tạo tài khoản thành công
      console.log(user);
      return user;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async login(username: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.fauth, username, password);
      const user = result.user;
      this.currentUser = user; // Lưu thông tin người dùng vào currentUser khi đăng nhập thành công
      this.sharingService.setIsUserLoggedIn(true); // Cập nhật trạng thái đăng nhập khi đăng nhập thành công
      console.log(user);
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.fauth, provider);
      const user = result.user;
      this.currentUser = user; // Lưu thông tin người dùng vào currentUser khi đăng nhập Google thành công
      this.sharingService.setIsUserLoggedIn(true) // Cập nhật trạng thái đăng nhập khi đăng nhập Google thành công
      console.log(user);
      return user
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  
  async logout() {
    try {
      await signOut(this.fauth);
      console.log('User signed out successfully');
      this.currentUser = null; // Xóa thông tin người dùng hiện tại khi logout
      this.sharingService.setIsUserLoggedIn(false); // Cập nhật trạng thái đăng nhập khi đăng xuất
      this.router.navigate(['/login']); // Điều hướng về trang đăng nhập sau khi logout
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}
