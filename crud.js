class Crud {
  constructor(model) {
    this.model = model;
  }

  findAll(query, select) {
    return new Promise((resolve, reject) => {
      this.model.find(query)
        .select(select || {})
        .exec()
        .then((docs) => resolve(docs))
        .catch((error) => reject(error));
    });
  };
  save(obj) {
    return new Promise((resolve, reject) => {
      obj.validate((error) => {
        if (error) return reject(error)
        obj.save((err) => {
          if (err) return reject(err);
          resolve();
        })
      })
    });
  };

  findOne(query, select) {
    return new Promise((resolve, reject) => {
      this.model.findOne(query)
        .select(select || {})
        .exec()
        .then((doc) => {
          if (!doc) reject({
            name: 'NotFound'
          });
          resolve(doc);
        })
        .catch((error) => reject(error));
    });
  }

  update(query, data) {
    return new Promise((resolve, reject) => {
      this.findOne(query)
        .then((doc) => {
          Object.assign(doc, data);
          return this.save(doc);
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }
  remove(query) {
    return new Promise((resolve, reject) => {
      this.model.findOneAndRemove(query)
        .exec()
        .then((doc) => {
          if (!doc) reject({
            name: 'NotFound'
          });
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

}

module.exports = Crud;
