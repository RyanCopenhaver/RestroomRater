export class Rating {

  constructor(

    public location: string,
    public changing: boolean,
    public cleanliness: number,
    public overall: number,
    public timestamp: number
  ) { }

}
