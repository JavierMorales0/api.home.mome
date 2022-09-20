import moment from "moment";

class ResponseApiHelper {
  private data: any;
  private status: boolean = false;
  private API_ORIGIN: string = process.env.API_ORIGIN || "mome.ml";
  constructor() {}

  public setResponse(
    data: any,
    content: String,
    status: boolean,
    statusCode: number = -1
  ) {
    return {
      origin: this.API_ORIGIN,
      content,
      date: moment().toISOString(),
      status: status ? "Success" : "Failed",
      statusCode: statusCode,
      data,
    };
  }
}

export default new ResponseApiHelper();
