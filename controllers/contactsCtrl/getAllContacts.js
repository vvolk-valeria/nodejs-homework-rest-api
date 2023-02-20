const { bool } = require('joi');
const {Contact} = require('../../models/contact');

const getAllContacts = async (req, res, next) => {
    try {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20, favorite = null} = req.query;
    const skip = (page - 1) * limit;

    if (!favorite) {
      const contacts = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit:Number(limit)})
              .populate("owner", "email")
          res.json({
                status: "success",
                code: 200,
                data: {
                    "quantity per page":contacts.length,
                    result:contacts
                    }
                });
    }
    else {
       const contacts = await Contact.find({owner, favorite}, "-createdAt -updatedAt", {skip, limit:Number(limit)})
              .populate("owner", "email")
   
      res.json({
        status: "success",
        code: 200,
        data: {
            "quantity per page":contacts.length,
            result:contacts
            }
        });
    }
   
    } catch (error) {
        next(error);
    }
  }
  
module.exports = getAllContacts;
