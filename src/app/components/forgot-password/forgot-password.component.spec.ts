import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForgotPasswordService } from '../../services/forgot-password.service';


describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // ✅ provide HttpClient
    });
    service = TestBed.inject(ForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
