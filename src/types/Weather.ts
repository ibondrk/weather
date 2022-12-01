import { Location } from './Location';
import { Current } from './Current';
import { Forecast } from './Forecast';

export interface Weather {
  location: Location;
  current: Current;
  forecast: Forecast;
}
