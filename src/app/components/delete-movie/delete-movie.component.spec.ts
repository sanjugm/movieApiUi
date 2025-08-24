import { TestBed } from '@angular/core/testing';
import { DeleteMovieComponent } from './delete-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

describe('DeleteMovieComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DeleteMovieComponent,  // standalone component
        HttpClientTestingModule,
        MatDialogModule        // provides dialog services
      ],
      providers: [
        AuthService,
        { provide: MAT_DIALOG_DATA, useValue: {} },       // ✅ fake dialog data
        { provide: MatDialogRef, useValue: {} }          // ✅ fake dialog ref
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DeleteMovieComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
