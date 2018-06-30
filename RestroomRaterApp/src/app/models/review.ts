export class Review {

  constructor(

    public location?: string,
    public hasChangingTables?: boolean,
    public cleanlinessRating?: number,
   // public lat: number,
  //  public long: number,
    public rating?: number,
    public timestamp?: number
  ) { }

}
