import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMovieComponent } from './add-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddMovieComponent,       
        HttpClientTestingModule,
        ReactiveFormsModule,     
        RouterTestingModule    
      ],
      providers: [AuthService]    
    }).compileComponents();

    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
