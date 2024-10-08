/**
 * declare ht types
 */
import type { Data } from './base/data';
import type { Node } from './base/node';
import type { Shape } from './base/shape';
import type { Polyline } from './base/polyline';
import type { Block } from './base/block';
import type { Text } from './base/text';
import type { Grid } from './base/grid';
import type { Points } from './base/points';
import type { DataModel } from './data-model';
import type { SelectionModel } from './selection';
import type { graph } from './graph';
import type { widget } from './widget';

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

