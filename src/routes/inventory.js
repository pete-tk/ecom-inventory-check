const router = require("express").Router();
const item_db = require("../items.json")
router.get("/db", async (req, res) => {
  res.json({item_db})
});
router.post("/check", async (req, res) => {
    const cart=req.body
    let code=200
    let message=""
    let itemCart=[]
    
    // check duplicate itemId in array
    try{
        if(cart.length>0){
            var valueCart = cart.map(function(item){ return item.itemId });
            var isDuplicate = valueCart.some(function(item, idx){ 
                message=`Duplicate itemId(${item})`
                return valueCart.indexOf(item) != idx 
            });
            if(isDuplicate){
                return res.json({code:400, message})
            }
        }else{
            return res.json({code:400, message:"No item in cart"})
        }
    }catch(err){
        return res.json({code:400, message:"JSON format is invalid"})
    }
    

    message=""
    cart.every(item => {
        // check JSON format ... example: [{"itemId":1,"quantity":12},{"itemId":2,"quantity":2}]
        if(!("itemId" in item) || !("quantity" in item)){
            console.log("no key",item)
            code= 400
            message=`JSON format is invalid`
            return false;
        }else{
            // Inventory Check
            const icheck=inventoryCheck(item.itemId,item.quantity)
            if(icheck.code!=200){
                code= icheck.code
                message+=icheck.message+"|"
            }
            itemCart.push(icheck)
        }
        return true;
    });

    if(code!=200) // if there have some data error
    {
        res.json({code, message, itemCart})
    }else{
        res.json({code, message: "Available", itemCart})
    }
    

});
function inventoryCheck(itemId,quantity){

    // Validate params
    if(Number.isNaN(Number(quantity)) || Number.parseInt(quantity)!=quantity)
    {
        return {code: 400, itemId, quantity, itemName: "", message:`Quantity(${quantity}) is invalid!`}
    }
    if(Number.isNaN(Number(itemId)) || Number.parseInt(itemId)!=itemId)
    {
        return {code: 400, itemId, quantity, itemName: "", message:`itemId(${itemId}) is invalid!`}
    }

    // check itemId
    const item = item_db.filter((i) => {
        return i.itemId==itemId
    })
    if(item.length===0){
        return {code: 404, itemId, quantity, itemName: "", message:`itemId(${itemId}) not found!`}
    }

    // check Out of stock
    if(item[0].quantity==0){
        return {code: 400, itemId:item[0].itemId, quantity, itemName: item[0].itemName, message:`itemId(${itemId}) ${item[0].itemName} is out of stock!`}
    }

    // check item quantity
    if(item[0].quantity<quantity){
        return {code: 400, itemId:item[0].itemId, quantity, itemName: item[0].itemName, message:`itemId(${itemId}) ${item[0].itemName} only ${item[0].quantity} ${(item[0].quantity==1)?"item":"items"} left!`}
    }
    if(quantity<=0){
        return {code: 400, itemId:item[0].itemId, quantity, itemName: item[0].itemName, message:`Quantity(${quantity}) must be more than 0!`}
    }

    return {code: 200, itemId:item[0].itemId, quantity, itemName: item[0].itemName, message: "Available"}
}
module.exports = router;
