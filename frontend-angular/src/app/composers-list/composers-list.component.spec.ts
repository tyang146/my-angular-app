import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposersListComponent } from './composers-list.component';

describe('ComposersListComponent', () => {
  let component: ComposersListComponent;
  let fixture: ComponentFixture<ComposersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComposersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
