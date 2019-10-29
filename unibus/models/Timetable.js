var mongoose = require('mongoose');

var timetableSchema=mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  mon:[
    info:{
      type:String
    },
    startTime:{
      type:Date
    },
    endTime:{
      type:Date
    }
  ],
  tue:[
    info:{
      type:String
    },
    startTime:{
      type:Date
    },
    endTime:{
      type:Date
    }
  ],
  wed:[
    info:{
      type:String
    },
    startTime:{
      type:Date
    },
    endTime:{
      type:Date
    }
  ],
  thu:[
    info:{
      type:String
    },
    startTime:{
      type:Date
    },
    endTime:{
      type:Date
    }
  ],
  fri:[
    info:{
      type:String
    },
    startTime:{
      type:Date
    },
    endTime:{
      type:Date
    }
  ],
  sat:[
    info:{
      type:String
    },
    startTime:{
      type:Date
    },
    endTime:{
      type:Date
    }
  ],
  sun:[
    info:{
      type:String
    },
    startTime:{
      type:Date
    },
    endTime:{
      type:Date
    }
  ],
  
});

timetableSchema.methods={
  saveTimetable:function(callback){
    var self=this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}

module.exports=mongoose.model('Timetable', timetableSchema);