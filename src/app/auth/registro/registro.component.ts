import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [RouterLink, ReactiveFormsModule]  // Asegúrate de importar ReactiveFormsModule
})
export class RegistroComponent {
  registroForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  // Método de validación para comprobar que las contraseñas coinciden
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const password2 = formGroup.get('password2')?.value;
    return password === password2 ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registroForm.valid) {
      const { username, email, password } = this.registroForm.value;
      this.authService.register(username, email, password).subscribe({
        next: () => {
          this.router.navigate(['/login']); // Redirige al login después del registro
        },
        error: (err) => {
          this.errorMessage = 'Error al registrar el usuario';
          console.error('Error en el registro:', err);
        }
      });
    } else {
      this.errorMessage = 'Formulario no válido. Por favor, corrige los errores.';
    }
  }
}
