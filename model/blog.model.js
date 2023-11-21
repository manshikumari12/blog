const mongoose =require("mongoose")

const blogschema = mongoose.Schema({
  blogid: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  // image: { type: String } //
  

})
const blogmodel =mongoose.model("blog",blogschema)
module.exports={blogmodel}