import { TestBed } from '@angular/core/testing';

import { OcultarSidebarService } from './ocultar-sidebar.service';

describe('OcultarSidebarService', () => {
  let service: OcultarSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcultarSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
