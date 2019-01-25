module.exports = ({
    client,
    logger
}) => {

const express = require('express');
const UserModel = require('../models/user');
const router = express.Router();

router.put('/update/:id', async (req, res) =>{
       try{
           // fetching uuid from cookie 
        const getuser =  req.cookies['connect.sid']
            // fetching user_id from redis
        const getclient = await client.getAsync(getuser);
        
        logger.info(`[Auth][update]- ${req.url}`);
       // fetching user from db by id
        const user = await UserModel.findById(getclient);
        // setting param to be used with switch case for updating different prop of user 
        var ch = req.params.id;
        
        switch(ch){
            case '1':
                // updating bio of user
               const updatebio = await UserModel.updateOne(user, {bio: req.body.bio});
                return res.status(200).json(updatebio);
                break;
            case '2':
                //updating firstname of user
                const updatefirstname = await UserModel.updateOne(user, {'fullname.firstname': req.body.firstname});
                
                return res.status(200).json(updatefirstname);
                break;
            case '3':
                //updating lastname of user
                const updatelastname = await UserModel.updateOne(user, {'fullname.lastname': req.body.lastname})
                return res.status(200).json(updatelastname);
                break;
            default:
        }

       }
       catch(err){
           console.log(err); console.log('in 1'); 
           
       }
        
    })

    
return router;
}
