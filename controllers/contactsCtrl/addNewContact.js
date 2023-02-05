const {Contact, joiSchemes} = require('../../models/contact');


const addNewContact = async (req, res, next) => {
    try {
         const {error} = joiSchemes.joiContactSchema.validate(req.body);

            if(error) {
                return res.status(400).json({message:"missing required name field"})
            }
            
        const newContact = await Contact.create(req.body);
    
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result: newContact
            }
        });
    } catch (error) {
        next(error);
    }
  }

module.exports = addNewContact;