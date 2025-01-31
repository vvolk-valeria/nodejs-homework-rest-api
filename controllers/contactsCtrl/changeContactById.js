const {Contact, joiSchemes} = require('../../models/contact');

const changeContactById = async (req, res, next) => {
    try {
        const {error} = joiSchemes.joiContactSchema.validate(req.body);
 
            if(error) {
                return res.status(400).json({message:"missing fields"})
            }

        const {contactId} = req.params;
        const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!contact) {
        const error =  new Error(`Contact with id=${id} not found`);
        error.status = 404;
        throw error;
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contact
            }
        });
    } catch (error) {
        next(error);
    }
  }

module.exports = changeContactById;