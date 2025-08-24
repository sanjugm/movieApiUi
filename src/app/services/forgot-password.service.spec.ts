import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      ForgotPasswordComponent,  // or your component using the service
      HttpClientTestingModule,  // ✅ provides HttpClient
      ReactiveFormsModule,
      FormsModule,
    ],
    providers: [
      { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
    ]
  }).compileComponents();
});
