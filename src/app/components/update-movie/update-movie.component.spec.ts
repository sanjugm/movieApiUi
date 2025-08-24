import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMovieComponent } from './update-movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UpdateMovieComponent', () => {
  let component: UpdateMovieComponent;
  let fixture: ComponentFixture<UpdateMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UpdateMovieComponent,   // ✅ standalone
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
