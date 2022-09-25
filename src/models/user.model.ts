import MongoConn from '../database/mongo.conn'

class UserModel {
  private conn: any
  private Schema: any
  public User: any

  constructor() {
    /* Creating a connection to the database. */
    this.conn = MongoConn.getConn()
    /* Creating a schema for the model. */
    this.Schema = this.conn.Schema({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        default: '',
      },
      creationDate: {
        type: Date,
        default: Date.now,
        required: true,
      },
      status: {
        type: String,
        enum: ['active', 'suspended', 'inactive', 'blocked'],
        default: 'active',
      },
    })
    /* Creating a model from the schema. */
    this.User = this.conn.model('User', this.Schema)
  }
}

export default new UserModel().User
