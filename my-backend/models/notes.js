const Mongoose=require("mongoose");
const noteSchema=Mongoose.Schema(
    {
        userId:{
            type: Mongoose.Schema.Types.ObjectId,
            ref:"users",
        },
        Message:{
            type:String},
        notesDate:{
                type:Date,
                default:Date.now
            },
        },
    
)

var noteModel=Mongoose.model("notes",noteSchema);
module.exports=noteModel;