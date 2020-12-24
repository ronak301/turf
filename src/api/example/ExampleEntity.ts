import { AxiosResponse } from 'axios';

export class ExampleEntity {
  name: string;

  constructor(data: { name: string }) {
    this.name = data.name;
  }

  static getName({ data }: AxiosResponse<{ name: string }>) {
    return new ExampleEntity(data);
  }
}
