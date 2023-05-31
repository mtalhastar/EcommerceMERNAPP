const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addComment,
  addRating,
  getSellerProducts
}=require("../Controller/productController")

const productRoutes = require("express").Router();
const {DecodeUser,checkBuyer,checkSeller, checkAdmin}=require("../middleware/auth")

productRoutes.post("/addProduct",DecodeUser,checkSeller,createProduct)      //done
productRoutes.put("/updateProduct/:id",DecodeUser,checkSeller,updateProduct)  //done
productRoutes.get("/getAllProduct",getAllProducts)     //done
productRoutes.get("/getSellerProduct",DecodeUser,checkSeller,getSellerProducts)
productRoutes.delete("/deleteProduct/:id",DecodeUser,checkSeller,deleteProduct)//done
productRoutes.put("/addComment/:id",DecodeUser,checkSeller,addComment) //done
productRoutes.put("/addRating/:id",DecodeUser,checkSeller,addRating)//done
productRoutes.get("/getProductById/:id",DecodeUser,checkAdmin,getProductById)//done

module.exports=productRoutes