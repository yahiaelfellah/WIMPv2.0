const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env' )});

mongoose.connect(process.env.mongoDbUrl,{ useUnifiedTopology: true });
const Schema = mongoose.Schema;

const identiySchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    birthday: Date,
    userName:String,
    password: String,
    permissionLevel: Number,
    departement : String,
    status: Array, 
    devices:Array,
    noderedInstance: Object
},{ timestamps: true });

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

exports.findByUserName = (name) =>  {
    return Identity.find({userName:name})
}

exports.createIdentity = (userData) => {
    console.log(userData);
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

exports.putIdentity = (id,data) => {
    return new Promise((resolve, reject) => {
        Identity.findByIdAndUpdate(id,data,function (err,user) {
            if (err) reject(err);
            resolve(user);
        });
    });
};

exports.patchIdentityFlows = (id,data) => {
    return new Promise((resolve,reject)=> {
        Identity.findById(id,function(err,user){
            if(err) reject(err);
            user.flows.push(data);
            user.save(function(err,updates){
                if(err) return reject(err);
                resolve(updates);
            })
        })
    })
}

exports.patchIdentityStatus = (id,data) => {
    return new Promise((resolve,reject)=> {
        Identity.findById(id,function(err,user){
            if(err) reject(err);
            user.status.push(data);
            user.save(function(err,updates){
                if(err) return reject(err);
                resolve(updates);
            })
        })
    })
}


exports.patchIdentityDevices = (id ,data) => {
    return new Promise((resolve,reject) => {
        Identity.findById(id, function(err,user) {
            if(err) reject(err);
            user.noderedInstance = data;
            user.save(function(err,updates){
                if(err) return reject(err);
                resolve(updates);
            })
        })
    })
}


exports.patchIdentityNodeRedInstance = (id, data) => { 
    return new Promise((resolve, reject) => { 
        Identity.findById(id, function(err,user) {
            if(err) reject(err);
            user.devices.push(data);
            user.save(function(err,updates){
                if(err) return reject(err);
                resolve(updates);
            })
        })
    })
}

exports.patchIdentity = (id, data) => {
    return new Promise((resolve, reject) => {
        Identity.findById(id, function (err, user) {
            if (err) reject(err);
            let actualPermisssion = user.permissionLevel;
            for (let i in data) {
                user[i] = data[i];
            }
            user.permissionLevel = actualPermisssion;
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    });

};

exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Identity.remove({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};