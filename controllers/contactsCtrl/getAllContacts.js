const {Contact} = require('../../models/contact');

const getAllContacts = async (req, res, next) => {
    try {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find({owner}, {skip, limit})
              .populate("owner", "email")
      res.json({
        status: "success",
        code: 200,
        data: {
            result:contacts
            }
        });
    } catch (error) {
        next(error);
    }
  }
  
module.exports = getAllContacts;
