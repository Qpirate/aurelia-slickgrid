import { GlobalGridOptions } from './global-grid-options';
import { GridOption } from './models/index';

export class SlickgridConfig {
  options: GridOption;

  constructor() {
    this.options = GlobalGridOptions;
  }
}
