const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js"); 
const { route } = require("./user.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingController.index)) //index route

.post( isLoggedIn, //create route 
    upload.single('listing[image]'),
    validateListing,
  
    wrapAsync(listingController.createListing));
 

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
//show route
.get(wrapAsync(listingController.showListing)
    )
//update route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing,
    wrapAsync(listingController.updateListing)
    )
//Delete Route
.delete(isLoggedIn,isOwner,
    wrapAsync(listingController.deleteListing)
   );

//new route
router.get("/new",isLoggedIn, listingController.renderNewForm);
  

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,
     wrapAsync(listingController.renderEditForm));
  

module.exports = router;