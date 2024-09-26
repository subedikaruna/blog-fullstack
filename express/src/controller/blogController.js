import { Blog } from "../schema/model.js";

export const createBlogController = async (req, res, next) => {
  let data = req.body;

  try {
    let result = await Blog.create(data);
    res.status(200).json({
      success: true,
      message: "Blog created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const readAllBlogController = async (req, res, next) => {
  try {
    let result = await Blog.find({});
    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readSpecificBlogController = async (req, res, next) => {
  let { id } = req.params;

  try {
    let result = await Blog.findById(id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Single blog fetched",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateSpecificBlogController = async (req, res, next) => {
  try {
   
    let result = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Single blog updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteSpecificBlogController = async (req, res, next) => {
 
  try {
    const {id}=req.params
    let result = await Blog.findByIdAndDelete(id);
 
    res.status(200).json({
      success: true,
      message: "Single blog deleted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
