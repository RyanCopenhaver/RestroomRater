import { Place } from "./place";

export class Review {

  constructor(
    // TODO: depreciate location once geoLocation is implemented
   // public location: string,
    public description: string,
    public hasChangingTables: boolean,
    public cleanlinessRating: number,
   // public lat: number,
  //  public long: number,
    public rating: number,
    public timestamp: number,
    public userId: string,
    public geoLocation: Location,
    // public place?: Place
  ) { }

}
