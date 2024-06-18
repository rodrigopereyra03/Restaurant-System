import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProdructsComponent } from './view-prodructs.component';

describe('ViewProdructsComponent', () => {
  let component: ViewProdructsComponent;
  let fixture: ComponentFixture<ViewProdructsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProdructsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProdructsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
