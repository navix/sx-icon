import { async } from '@angular/core/testing';
import { SxIconsRegistry } from './sx-icons-registry';

describe('KitIconsRegistryService', () => {
  let service: SxIconsRegistry;
  let httpMock: HttpMock;
  beforeEach(async(() => {
    httpMock = new HttpMock();
    service = new SxIconsRegistry(httpMock as any);
  }));
  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
  it('should register icon and load by http', () => {
    const name = 'icon';
    const url = 'url';
    const spy = spyOn(httpMock, 'get').and.returnValue({
      pipe: () => {
      },
    });
    service.add({name, url});
    service.get(name);
    expect(spy).toHaveBeenCalledWith(url, {responseType: 'text'});
  });
  it('should throw error if icon unregistered', () => {
    expect(() => service.get('unregistered')).toThrow();
  });
});

class HttpMock {
  get() {
  }
}
