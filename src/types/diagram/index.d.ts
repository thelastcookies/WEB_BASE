/**
 * declare ht types
 */
import { Data } from './base/data';
import { Node } from './base/node';
import { Shape } from './base/shape';
import { Polyline } from './base/polyline';
import { Block } from './base/block';
import { Text } from './base/text';
import { Grid } from './base/grid';
import { Points } from './base/points';
import { DataModel } from './data-model';
import { SelectionModel } from './selection';
import { graph } from './graph';
import { widget } from './widget';

export declare global {
  declare namespace ht {
    export { Data };
    export { Node };
    export { Shape };
    export { Polyline };
    export { Block };
    export { Text };
    export { Grid };
    export { Points };
    export { DataModel };
    export { SelectionModel };
    export { graph };
    export { widget };
  }
}

