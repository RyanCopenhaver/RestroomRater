export class Rating {

  constructor(

    public location: string,
    public changing: boolean,
    public cleanliness: number,
   // public lat: number,
  //  public long: number,
    public overall: number,
    public timestamp: number
  ) { }

}
