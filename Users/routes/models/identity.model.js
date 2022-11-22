const mongoose = require('mongoose');
const config = require('dotenv').config()
mongoose.connect(process.env.mongoDbUrl,{ useUnifiedTopology: true });
const Schema = mongoose.Schema;

const identiySchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    userName:String,
    password: String,
    permissionLevel: Number,
    devices:Array,
    flows: Array
});

identiySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
identiySchema.set('toJSON', {
    virtuals: true
});

identiySchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const Identity = mongoose.model('Users', identiySchema);

exports.findByEmail = (email) => {
    return Identity.find({email: email});
};
exports.findById = (id) => {
    return Identity.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.findByUserName = (username) =>  {
    return Identity.find({userName:username})
}

exports.createIdentity = (userData) => {
    const user = new Identity(userData);
    return user.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Identity.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.putIdentity = (id,identityData) => {
    return new Promise((resolve, reject) => {
        Identity.findByIdAndUpdate(id,identityData,function (err,user) {
            if (err) reject(err);
            resolve(user);
        });
    });
};

exports.patchIdentityFlows = (id,flow) => {
    return new Promise((resolve,reject)=> {
        Identity.findById(id,function(err,user){
            if(err) reject(err);
            user.flows.push(flow);
            user.save(function(err,updates){
                if(err) return reject(err);
                resolve(updates);
            })
        })
    })
}


exports.patchIdentity = (id, userData) => {
    return new Promise((resolve, reject) => {
        Identity.findById(id, function (err, user) {
            if (err) reject(err);
            let actualPermisssion = user.permissionLevel;
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.permissionLevel = actualPermisssion;
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    });

};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        Identity.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};