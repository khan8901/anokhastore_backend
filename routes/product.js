const express = require('express')
const router = express.Router();


const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview, 
    sellerProducts, 
    productliked, 
    productunliked, 
    productviewed
    

} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);
router.route("/productviewed/:id").put(productviewed); 


router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// SELLER ROUTES 
router.route('/sellerproducts/:sellerId/:page').get(isAuthenticatedUser,sellerProducts); 
router.route('/seller-products').get( isAuthenticatedUser,sellerProducts); 
router.route('/seller/product/new').post(isAuthenticatedUser, newProduct); 
router.route('/seller/product/:id') 
      .put(isAuthenticatedUser,updateProduct)
      .delete(isAuthenticatedUser, deleteProduct);  

      // will have to authenticate user ownership with it 
router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)
router.route('/productliked').put(isAuthenticatedUser,productliked)
router.route('/productunliked').put(isAuthenticatedUser,productunliked)



module.exports = router;