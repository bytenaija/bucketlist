const db = require('../models')
const verify = require('../jwt/verify')

exports.create = (req, res, next)=>{
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
         req.body.created_by = data._id
         db.BucketList.create(req.body).then(bucketlist =>{
            console.log(bucketlist)
            res.json({
                success: true,
                message: "Successfully created a bucketlist",
                bucketlist
            })
         })
     }else{
         res.sendStatus(401).json({
             success: false,
             message: 'Unathorised access'
         })
     }
}

exports.read = (req, res, next)=>{
    let page = req.query.page || 1, limit = Number(req.query.limit) || 20;
    console.log(page, limit);
   
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
        if(req.query.q){
            db.BucketList.find({name: { $regex: '.*' + req.query.q + '.*', $options: 'i'}}).populate('items').populate('created_by').skip((limit * page) - limit).limit(limit).exec().then(bucketlist =>{
                res.json({
                    success: true,
                    bucketlist
                })
             })
            
        }
    else{
        db.BucketList.find({}).populate('items').populate('created_by').skip((limit * page) - limit).limit(limit).exec().then(bucketlist =>{
           res.json({
               success: true,
               bucketlist
           })
        }) 
    }    
     }else{
        res.sendStatus(401).json({
            success: false,
            message: 'Unathorised access'
        })
    }
}


exports.readOne = (req, res, next)=>{
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
         db.BucketList.findById(req.params.id).populate('items').populate('created_by').then(bucketlist =>{
            res.json({
                success: true,
                bucketlist
            })
         })
     }else{
        res.sendStatus(401).json({
            success: false,
            message: 'Unathorised access'
        })
    }
}



exports.update = (req, res, next)=>{
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
         db.BucketList.findByIdAndUpdate(req.params.id, req.body).then(bucketlist =>{
            res.json({
                success: true,
                message: "Succcessfully updated bucket list"
            })
         })
     }else{
        res.sendStatus(401).json({
            success: false,
            message: 'Unathorised access'
        })
    }
}

exports.delete = (req, res, next)=>{
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
         db.BucketList.findByIdAndDelete(req.params.id).then(bucketlist =>{
            res.json({
                success: true,
                message: "Succcessfully deleted bucket list"
            })
         })
     }else{
        res.sendStatus(401).json({
            success: false,
            message: 'Unathorised access'
        })
    }
}

exports.createItem = (req, res, next)=>{
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
        db.BucketList.findById(req.params.id).then(bucketlist =>{
         db.Item.create(req.body).then(item =>{
            bucketlist.items.push(item._id);
            bucketlist.save().then(bucketlist =>{
                res.json({
                    success: true,
                    message: "Succcessfully added an item to the bucket list"
                })
            })
                
             })
         })
        
     }else{
        res.sendStatus(401).json({
            success: false,
            message: 'Unathorised access'
        })
    }
}


exports.readItem = (req, res, next)=>{
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
        db.BucketList.findById(req.params.id).populate('items').populate('created_by').then(bucketlist =>{
                let items = bucketlist.items;
                res.json({
                    success: true,
                    items
                })
            })
                
             
         
        
     }else{
        res.sendStatus(401).json({
            success: false,
            message: 'Unathorised access'
        })
    }
}


exports.readOneItem = (req, res, next)=>{
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
        db.BucketList.findById(req.params.id).populate('items').populate('created_by').then(bucketlist =>{
                let item = bucketlist.items.filter(item => item._id == req.params.itemId);
                res.json({
                    success: true,
                    item
                })
            })
                
             
         
        
     }else{
        res.sendStatus(401).json({
            success: false,
            message: 'Unathorised access'
        })
    }
}


exports.updateItem = (req, res, next)=>{
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
        db.Item.findByIdAndUpdate(req.params.itemId, req.body).then(item =>{
               
            res.json({
                success: true,
                message: 'Successfully updated item in bucketlist'
            })
        })
                
             
         
        
     }else{
        res.sendStatus(401).json({
            success: false,
            message: 'Unathorised access'
        })
    }
}


exports.deleteItem = (req, res, next)=>{
    const data = verify.verify(req, res, next);
    console.log(data)
     if(data){
        db.Item.findByIdAndDelete(req.params.itemId).then(item =>{
               
            res.json({
                success: true,
                message: 'Successfully deleted item in bucketlist'
            })
        })
                
             
         
        
     }else{
        res.sendStatus(401).json({
            success: false,
            message: 'Unathorised access'
        })
    }
}