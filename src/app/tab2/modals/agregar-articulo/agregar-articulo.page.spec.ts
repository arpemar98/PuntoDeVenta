import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarArticuloPage } from './agregar-articulo.page';

describe('AgregarArticuloPage', () => {
  let component: AgregarArticuloPage;
  let fixture: ComponentFixture<AgregarArticuloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarArticuloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
