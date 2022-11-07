const {Router}=require("express")
const  TodoRouter=Router()

const {TodosModel}=require("../Models/Todo.Model")

const {Authentication} = require("../Midlewares/Authentication")

TodoRouter.post("/:userId/create",Authentication, async(req,res)=>{
    const userId=req.params.userId
    console.log(userId)
    const {taskname,status,tag}=req.body
    const createtodo=new TodosModel({
        taskname,
        status,
        tag,
        userId
    })
    await createtodo.save()
    res.send({ msg: "Todo created", Todo: createtodo });
})

TodoRouter.get("/:_id/one", Authentication,async (req,res)=>{
    const _id=req.params._id
    const todo=await TodosModel.findOne({_id});
    res.send({"msg":"Todo","Todo":todo})
})

TodoRouter.get("/:userId",Authentication, async (req, res) => {
  const userId = req.params.userId;
  const todo = await TodosModel.find({ userId });
  res.send({ msg: "Todo", Todo: todo });
});


TodoRouter.post("/:userId/update/:_id",Authentication, async (req, res) => {
  const userId = req.params.userId;
  const _id = req.params._id;
  const {taskname,status,tag}=req.body
  const todo = await TodosModel.findByIdAndUpdate(_id,{
    taskname:taskname,
    status:status,
    tag:tag
  });
  res.send({ msg: "Todo Updated" });
});

TodoRouter.delete("/:userId/delete/:_id", Authentication,async(req,res)=>{
    const _id=req.params._id
    const todo=await TodosModel.findByIdAndRemove(_id)
    res.send({"msg":"Todo Deleted"})
});

module.exports = { TodoRouter };