import { Request, Response } from 'express';
import slugify from 'slugify';
import Product, { IProduct } from '../models/productModel'; 
import mongoose from 'mongoose';

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await new Product({ ...req.body, slug: slugify(req.body.username) }).save();
    console.log(1);
    res.status(200).send({
      success: true,
      message: newProduct,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: products,
      length: products.length,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const getProductbycategory = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ maincategory: req.params.category }).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: products,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const getsingleProduct = async (req: Request, res: Response) => {
  let product;
  try {
    console.log(mongoose.Types.ObjectId.isValid(req.params.param));
    if (mongoose.Types.ObjectId.isValid(req.params.param)) {
      product = await Product.find({ _id: req.params.param });
      res.status(200).send({
        success: true,
        message: product,
      });
    } else {
      product = await Product.find({ slug: req.params.param });
      res.status(200).send({
        success: true,
        message: product,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateproduct = await Product.findByIdAndUpdate({ _id: req.params.id }, { ...req.body });
    res.status(200).send({
      success: true,
      message: updateproduct,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: 'Successfully deleted',
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const filterproduct = async (req: Request, res: Response) => {
  const { price, category, color, maincategory } = req.query;
  const setprice = JSON.parse(price as string);
  const setcategory = JSON.parse(category as string);
  const setcolor = JSON.parse(color as string);
  const setmaincategory = JSON.parse(maincategory as string);

  const arg: any = {};
  try {
    arg.maincategory = setmaincategory;
    if (setprice.length) {
      arg.price = { $gt: setprice[0], $lt: setprice[1] };
    }

    if (setcategory.length) {
      arg.category = { $elemMatch: { $in: setcategory } };
    }
    if (setcolor.length) {
      arg.color = { $in: setcolor };
    }
    console.log(arg);
    const product = await Product.find(arg).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: product,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const searchproduct = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.params;
    const product = await Product.find({
      $or: [
        { username: { $regex: keyword, $options: 'i' } },
        { desc: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.status(200).send({
      success: true,
      message: product,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

const similarproducts = async (req: Request, res: Response) => {
  const category = (req.query.category as string).split(',');
  try {
    const similarproducts = await Product.find({
      category: { $all: category },
      _id: req.query.id as string,
    });
    res.status(200).send({
      success: true,
      message: 'hii',
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err,
    });
  }
};

export {
  createProduct,
  getProducts,
  getsingleProduct,
  deleteProduct,
  filterproduct,
  searchproduct,
  similarproducts,
  getProductbycategory,
  updateProduct,
};
