export class Review {

  constructor(
    // TODO: depreciate location once geoLocation is implemented
    public location: string,
    public hasChangingTables: boolean,
    public cleanlinessRating: number,
   // public lat: number,
  //  public long: number,
    public rating: number,
    public timestamp: number,
    public geoLocation?: Location,
    public place?: Place
  ) { }

}
