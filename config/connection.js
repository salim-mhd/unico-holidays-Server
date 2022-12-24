const mongoose= require('mongoose');
const connectdb= async()=>{
    mongoose.connect('mongodb://localhost:27017/UnicHolidays',{
        useNewUrlParser:true,
        },(err,data)=>{    
         if(err){
           console.log("Db Error");
         }else{
           console.log('Db Connected...');
         }
        });
}
    

module.exports ={connectdb}