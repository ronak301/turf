import { from } from 'rxjs';
import { map } from 'rxjs/operators';

import { getAsObservable } from 'api/utils';
import { ExampleEntity } from './ExampleEntity';

export class ExampleService {
  static getUserName$(id: number | string) {
    return from(getAsObservable(`backend://users/${id}`)).pipe(
      // <any, any> 🙈
      map<any, any>((response) => ExampleEntity.getName(response))
    );
  }
}
