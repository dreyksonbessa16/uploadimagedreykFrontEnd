import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerFotoPage } from './ver-foto.page';

describe('VerFotoPage', () => {
  let component: VerFotoPage;
  let fixture: ComponentFixture<VerFotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerFotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
