import { Place } from "./place";
import { Location } from "./location";

export class Review {

  constructor(
    public description: string,
    public hasChangingTables: boolean,
    public cleanlinessRating: number,
    public rating: number,
    public timestamp: number,
    public userId: string,
    public geoLocation: Location,
    public establishment: string
    // public place?: Place
  ) { }

}
