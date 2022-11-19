const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/WIMPv2',{ useUnifiedTopology: true });
const Schema = mongoose.Schema;

const flowSchema = new Schema({
    flowId: String, 
    flowData : {
        type:Object,
        default:{}        
    }, 

})

flowSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

flowSchema.set('toJSON',{
    virtuals:true
})

flowSchema.findById = function(cb){
    return this.model('flows').find({deviceId:this.id},cb)
}

const Flow = mongoose.model('flows',flowSchema);

exports.findByType = (type) => {
    return Flow.find({deviceType:type})
}

exports.findByOwner = (owner) => {
    return Flow.find({deviceOwner:owner});
}

exports.findById = (id) => {
    return Flow.findById(id).then((result) => {
        result = result.toJSON();
        delete result.__id;
        delete result.__v;
        return result;
    })
}

exports.create = (data) => {
    const flow = new Flow(data);
    return flow.save();
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Device.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
    });
};

exports.put = (id,data) => {
    return new Promise((resolve, reject) => {
        Device.findByIdAndUpdate(id,data,function (err,device) {
            if (err) reject(err);
            resolve(device);
        });
    });
};

exports.patch = (id, data) => {
    return new Promise((resolve, reject) => {
        Flow.findById(id, function (err, device) {
            if (err) reject(err);
            let actualPermisssion = device.permissionLevel;
            for (let i in data) {
                device[i] = data[i];
            }
            device.permissionLevel = actualPermisssion;
            device.save(function (err, updates) {
                if (err) return reject(err);
                resolve(updates);
            });
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
