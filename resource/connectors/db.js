import urlJoin from 'url-join'

export default class DBConnector {
  constructor (dbUrl) {
    this.db = {}
  }
  async userGetOne ({id, email}) {
    // console.log({id, email})
    if (id) return this.db.getUser({ id })
    return this.db.getUser({ email })
  }
  async projectGetAllByUser ({id}) { console.log('id',id); return this.db.getProjectsByUserId(id) }

}
