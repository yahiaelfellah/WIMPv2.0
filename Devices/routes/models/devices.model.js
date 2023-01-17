const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/WIMPv2',{ useUnifiedTopology: true });
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    userId: String,
    name : String, 
    type : String, 
    flowId : String,
},{ timestamps: true })

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


exports.findByflowId = (id) => {
    return Device.findOne({flowId:id});
}


exports.findById = (id) => {
    return Device.findById(id).then((result) => {
        result = result.toJSON();
        delete result.__id;
        delete result.__v;
        return result;
    })
}




exports.create = (deviceData) => {
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


exports.patchDeviceFlowId = (id, data) => {
    return new Promise((resolve,reject) => {
        DeviceModel.findById(id, function(err,device) {
            if(err) reject(err);
            device.flowId = data;
            device.save(function(err,update){
                if(err) return reject(err);
                resolve(updates);
            })
        }) 
    })
}

exports.putDevice = (id,deviceData) => {
    return new Promise((resolve, reject) => {
        Device.findByIdAndUpdate(id,deviceData,function (err,device) {
            if (err) reject(err);
            resolve(device);
        });
    });
};

exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Device.remove({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
