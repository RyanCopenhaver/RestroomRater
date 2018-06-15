export class Rating {

  constructor(

    public id: number,
    public location: string,
    public changing: boolean,
    public cleanliness: number,
    public overall: number
  ) { }

}
