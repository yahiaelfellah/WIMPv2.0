const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/WIMPv2',{ useUnifiedTopology: true });
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    deviceId: String, 
    deviceType : String, 
    deviceOwner : String,
    deviceData: {type:Array,"default":[]}
})

deviceSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

deviceSchema.set('toJSON',{
    virtuals:true
})

deviceSchema.findById = function(cb){
    return this.model('Devices').find({deviceId:this.id},cb)
}

const Device = mongoose.model('Devices',deviceSchema);

exports.findByType = (type) => {
    return Device.find({deviceType:type})
}

exports.findByOwner = (owner) => {
    return Device.find({deviceOwner:owner});
}

exports.findById = (id) => {
    return Device.findById(id).then((result) => {
        result = result.toJSON();
        delete result.__id;
        delete result.__v;
        return result;
    })
}

exports.createDevice = (deviceData) => {
    const device = new Device(deviceData);
    return device.save();
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Device.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, devices) {
                if (err) {
                    reject(err);
                } else {
                    resolve(devices);
                }
            })
    });
};

exports.putDevice = (id,deviceData) => {
    return new Promise((resolve, reject) => {
        Device.findByIdAndUpdate(id,deviceData,function (err,device) {
            if (err) reject(err);
            resolve(device);
        });
    });
};

exports.patchDevice = (id, deviceData) => {
    return new Promise((resolve, reject) => {
        Device.findById(id, function (err, device) {
            if (err) reject(err);
            let actualPermisssion = device.permissionLevel;
            for (let i in deviceData) {
                device[i] = deviceData[i];
            }
            device.permissionLevel = actualPermisssion;
            device.save(function (err, updatedDevice) {
                if (err) return reject(err);
                resolve(updatedDevice);
            });
        });
    });

};

exports.removeById = (deviceId) => {
    return new Promise((resolve, reject) => {
        Device.remove({_id: deviceId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
