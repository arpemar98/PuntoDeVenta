import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarArticuloPage } from './editar-articulo.page';

describe('EditarArticuloPage', () => {
  let component: EditarArticuloPage;
  let fixture: ComponentFixture<EditarArticuloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarArticuloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
