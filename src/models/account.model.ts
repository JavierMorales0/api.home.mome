import MongoConn from '../database/mongo.conn'

class AccountModel {
  private conn: any
  private Schema: any
  public Account: any

  constructor() {
    /* Creating a connection to the database. */
    this.conn = MongoConn.getConn()
    /* Creating a schema for the model. */
    this.Schema = this.conn.Schema({
      description: {
        type: String,
        required: true,
      },
      owner: {
        type: this.conn.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
    })
    /* Creating a model from the schema. */
    this.Account = this.conn.model('Account', this.Schema)
  }
}

export default new AccountModel().Account
