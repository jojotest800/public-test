const _ = require("lodash");

module.exports = class Service {
  constructor({ postgresDBConnection }) {
    this.db = postgresDBConnection;
  }

  async create(userId, body) {
    const { country, region, city, street } = body;
    const user = await this.db.User.findOne({
      where: { id: userId },
      include: [
        {
          model: this.db.Address,
          required: false,
        },
      ],
    });
    if (!user) {
      throw new Error("User was not found");
    }
    const addrToSave = _.extend({}, body);
    const newaddr = await this.db.Address.create(addrToSave);
    await user.setAddresses(_.concat(user.addresses, newaddr));
    return newaddr;
  }

  async getAll(userId) {
    const addrs = await this.db.User.findAll({
      where: { id: userId },
      include: {
        model: this.db.Address,
      },
    });
    return addrs;
  }

  async countAllAddresses() {
    try {
      // console.log("Db instance ", this.db);
      const nber = await this.db.Address.count({});
      console.log("The total nber of addresses in the databse is :", nber);
      return nber;
    } catch (error) {
      console.log(error);
    }
  }
};
