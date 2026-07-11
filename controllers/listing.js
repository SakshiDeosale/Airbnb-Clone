const Listing = require("../models/listing");
const axios = require("axios");

module.exports.index = async (req, res) => {
    const { search } = req.query;
    let filter = {};
    let searchQuery = "";

    if (search) {
        searchQuery = search.trim();
        filter = {
            $or: [
                { title: new RegExp(searchQuery, "i") },
                { location: new RegExp(searchQuery, "i") }
            ]
        };
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings, searchQuery });
};

module.exports.renderNewForm = (req,res) =>{
    res.render("./listings/new.ejs");
};

// module.exports.showListing = async(req,res)=>{
//        let {id} =req.params;
//       const listing = await Listing.findById(id)
//       .populate({path:"reviews",
//         populate: {
//             path:"author",
//         },
//       })
//       .populate("owner");
//       if(!listing){
//         req.flash("error", "Listing you requested for does not exist!");
//         res.redirect("/listings");
//       }
//       res.render("./listings/show.ejs",{listing});
//       console.log(listing);
// };


module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    const token = process.env.MAP_TOKEN;

    let coordinates = [77.2090, 28.6139];

    try {
        const geoURL = `https://us1.locationiq.com/v1/search?key=${token}&q=${encodeURIComponent(
            `${listing.location}, ${listing.country}`
        )}&format=json`;

        const response = await axios.get(geoURL);

        coordinates = [
            Number(response.data[0].lon),
            Number(response.data[0].lat),
        ];
    } catch (err) {
        console.log(err.message);
    }

    res.render("./listings/show.ejs", {
        listing,
        coordinates,
        token
    });
};

module.exports.createListing = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
      }
      let originalImageUrl = listing.image.url;
      originalImageUrl = originalImageUrl.replace("/uploads", "/uploads/h_300,w_250");
    res.render("./listings/edit.ejs", { listing, originalImageUrl});
};

module.exports.updateListing = async(req,res) =>{
    let {id} =req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req,res)=>{
    let {id} =req.params;
    let  deletedListing = await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     req.flash("success", "Listing Deleted");
     res.redirect("/listings");
};