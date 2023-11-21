const express =require("express")
const {blogmodel}=require("../model/blog.model")
const blogrouter =express.Router()
//createblog
blogrouter.post("/create", async (req, res) => {
  try {
      const { title, content, createdAt,author,comments,image } = req.body;
      console.log(req.body);

      const blog = new blogmodel({ title, content, createdAt, });
      await blog.save();

      res.status(200).send({ msg: "Blog successfully created", blog });
  } catch (error) {
      res.status(400).send({ msg: error.message || "Error creating blog" });
  }
});

//allbog
// blogrouter.get("/create", async (req, res) => {
//   try {
//       const { pageNo, title, author, order } = req.query;

//       let query = [];

//       if (title) {
//           const regex = new RegExp(title, "i");
//           query.push({ $match: { title: regex } });
//       }

//       if (author) {
//           query.push({ $match: { author } });
//       }

//       if (order) {
//           const sorting = { $sort: { createdAt: order == '1' ? 1 : -1 } };
//           query.push(sorting);
//       }

//       if (pageNo) {
//           const limit = { $limit: 5 };
//           const skip = { $skip: (pageNo - 1) * 5 };
//           query.push(skip, limit);
//       }

//       console.log(query);

//       const blogs = await blogmodel.aggregate(query);
//       res.status(200).send({ msg: "All Blogs", blogs });
//   } catch (error) {
//       res.status(400).send({ msg: error.message || "Error fetching blogs" });
//   }
// });

blogrouter.get("/create", async (req, res) => {
  const payload = req.body;
  try {
      const blogs = await blogmodel.find(payload);
      res.status(200).send({ msg: "All Blogs", blogs });
  } catch (error) {
      res.status(400).send({ msg: error.message || "Error fetching blogs" });
  }
});


//blog by aprticular id
blogrouter.get("/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const blog =await blogmodel.findById(id)
        res.status(200).send({"msg":"can see the particular blog",blog}) 
        
    } catch (error) {
        res.status(400).send({"msg":error.msg})   
    }
})

blogrouter.put('/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const { title, content } = req.body;
      const blog = await blogmodel.findById(postId);
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      blog.title = title;
      blog.content = content;
      await blog.save();
  
      res.status(200).send({"msg":"blog by aprticular id",blog}) 
    } catch (err) {

      res.status(400).json({ err: 'Server error' });
    }
  });
  
  // Delete a blog post by its ID
  blogrouter.delete('/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
  
    
      const blog = await blogmodel.findById(postId);
      console.log(blog)
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      res.status(200).send({ message: 'Blog post deleted successfully' });
    } catch (err) {
  
      res.status(400).json({ err: 'Server error' });
    }
  });




 
  


module.exports={blogrouter}