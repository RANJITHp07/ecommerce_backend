import { Request, Response } from 'express';
import slugify from 'slugify';
import Category, { ICategory } from '../models/categoryModel';

const categoryEntry = async (req: Request, res: Response) => {
  try {
    const existingCategory = await Category.findOne({ categoryname: req.body.name });
    if (existingCategory) {
      res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    } else {
      const category = await new Category({
        maincategory: req.body.maincategory,
        categoryname: req.body.name,
        slug: slugify(req.body.name),
      }).save();
      res.status(200).send({
        success: true,
        message: category,
      });
    }
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatecategory = await Category.findById(req.params.id.trim());
    if (updatecategory) {
      await updatecategory.updateOne({ slug: slugify(req.body.name), categoryname: req.body.name });
      res.status(200).json({
        success: true,
        message: "Category has been updated",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Failed to update",
      });
    }
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const getallCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: categories,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const getsingleCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).json({
      success: true,
      message: category,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const getsubcategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ maincategory: req.params.maincategory });
    res.status(200).json({
      success: true,
      message: categories,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

export {
  categoryEntry,
  updateCategory,
  getallCategory,
  getsingleCategory,
  deleteCategory,
  getsubcategory,
};
