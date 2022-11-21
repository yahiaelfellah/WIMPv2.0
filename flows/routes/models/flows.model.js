const mongoose = require("mongoose")
require('dotenv').config()
mongoose.connect(process.env.DB_URL,{ useUnifiedTopology: true });
const Schema = mongoose.Schema;

const flowSchema = new Schema({
    flowId : String,
    flowData :Object

    
}
)

flowSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

flowSchema.set('toJSON',{
    virtuals:true
})

flowSchema.findById = function(cb){
    return this.model('flows').find({flowId:this.id},cb)
}

flowSchema.pre('save', function (next) {
    var self = this;
    Flow.find({flowData : self.flowData}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
            console.log('data exists: ',self.flowData);
            next(new Error("data exists!"));
        }
    });
}) ;

const Flow = mongoose.model('flows',flowSchema);

checkIfExists = async (data) => {
    return await Flow.exists(data);
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
    try{
        return  flow.save(); 
    }catch(err){
        return new Promise((resolve,reject) => resolve(null));
    }

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

exports.pathFlowById = (id,data) => {
    return Flow.findByIdAndUpdate(id,data);
}


exports.patchFlowId = (id,flowId) => {
      
    return new Promise((resolve,reject) => {
        Flow.findById(id,function(err,flow){
            if(err) reject(err);
            flow.flowId = flowId

            flow.save(function(err,updates){
                if(err) reject(err);
                resolve(updates);
            })
        });
    })
}

exports.patch = (id, data) => {
    return new Promise((resolve, reject) => {
        Flow.findById(id, function (err, flow) {
            if (err) reject(err);
            let actualPermisssion = flow.permissionLevel;
            for (let i in data) {
                flow[i] = data[i];
            }
            flow.permissionLevel = actualPermisssion;
            flow.save(function (err, updates) {
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
