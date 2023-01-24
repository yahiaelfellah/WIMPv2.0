const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env' )});

mongoose.connect(process.env.mongoDbUrl,{ useUnifiedTopology: true });
const Schema = mongoose.Schema;


const departementSchema = new Schema({
    name: String,
},{ timestamps: true });

departementSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
departementSchema.set('toJSON', {
    virtuals: true
});

departementSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const Departement = mongoose.model('Departement', departementSchema);

exports.findByEmail = (email) => {
    return Departement.find({email: email});
};
exports.findById = (id) => {
    return Departement.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.findByUserName = (username) =>  {
    return Departement.find({userName:username})
}

exports.createDepartement = (userData) => {
    const dep = new Departement(userData);
    return dep.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Departement.find()
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
        Departement.findByIdAndUpdate(id,identityData,function (err,user) {
            if (err) reject(err);
            resolve(user);
        });
    });
};

exports.patchIdentityFlows = (id,flow) => {
    return new Promise((resolve,reject)=> {
        Departement.findById(id,function(err,user){
            if(err) reject(err);
            user.flows.push(flow);
            user.save(function(err,updates){
                if(err) return reject(err);
                resolve(updates);
            })
        })
    })
}

exports.patchIdentityDevices = (id ,device) => {
    return new Promise((resolve,reject) => {
        Departement.findById(id, function(err,user) {
            if(err) reject(err);
            user.devices.push(device);
            user.save(function(err,updates){
                if(err) return reject(err);
                resolve(updates);
            })
        })
    })
}


exports.patchIdentity = (id, userData) => {
    return new Promise((resolve, reject) => {
        Departement.findById(id, function (err, user) {
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
        Departement.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};