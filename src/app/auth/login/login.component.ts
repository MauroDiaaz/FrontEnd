import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Suponiendo que el backend devuelve un token
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']); // Redirige al dashboard después de iniciar sesión
      },
      error: (err) => {
        this.errorMessage = 'Email o contraseña incorrectos';
        console.error('Error al iniciar sesión:', err);
      }
    });
  }
}
