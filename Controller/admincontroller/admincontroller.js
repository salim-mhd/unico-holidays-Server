const app = require('../../app');


const jwt = require("jsonwebtoken")

const admin = {
    adminEmail: 'admin@gmail.com',
    adminPassword: 12345678
}

const postadminlogin = async (req, res) => {
    try {
            let { email, password } = req.body;
            if(adminEmail === email){
              if(adminPassword === password){
                res.status(200).json({ admin:true })
              }else{
                res.status(200).json({ res:'Invalid Id' })
              }
            }else{
              res.status(200).json({ res:'Invalid Id' })
            }F

    } catch (error) {
        console.log(error.message);
    }
}

const allApplications = async (req, res) => {
    const data = await applicationdetail.find({ status: 'pending' });
    // console.log(data);   
    res.json(data)
}
const approveApplication = async (req, res) => {
    console.log(req.params.id);
    console.log('heloooooooooooooooooooooooooooooooooooooooooooooooooooooo');
    await applicationdetail.findByIdAndUpdate(req.params.id, { status: 'Approved' },
        function (err, docs) {
            if (err) {
                console.log(err)
                return res.json({ msg: "Not updated" })
            }
            else {
                console.log("Updated application status  ");
                return res.json({ msg: "updated status" })
            }
        }).clone()
}
const rejectApplication = async (req, res) => {
    console.log(req.params.id);
    console.log('heloooooooooooooooooooooooooooooooooooooooooooooooooooooo');
    await applicationdetail.findByIdAndUpdate(req.params.id, { status: 'Rejected' },
        function (err, docs) {
            if (err) {
                console.log(err)
                return res.json({ msg: "Not updated" })
            }
            else {
                console.log("Updated application status  ");
                return res.json({ msg: "updated status" })
            }
        }).clone()
}

const approvelist = async (req, res) => {
    await applicationdetail.find({ status: 'Approved' }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("approvelist taken from db: ", docs);
            console.log(docs);
            res.json(docs)
        }
    }).clone()
    // const data= await applicationdetail.find({});

}
const rejectlist = async (req, res) => {
    await applicationdetail.find({ status: 'Rejected' }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("approvelist taken from db: ", docs);
            console.log(docs);
            res.json(docs)
        }
    }).clone();
    // const data= await applicationdetail.find({});

}
const progressdetails = async (req, res) => {
    await applicationdetail.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("approvelist taken from db: ", docs);
            console.log(docs);
            res.json(docs)
        }
    }).clone();
}
const slotdetail = async (req, res) => {
    await slot.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("approvelist taken from db: ", docs);
            console.log(docs);
            res.json(docs)
        }
    }).clone();
}
const slotbooking = async (req, res) => {

    let { companyname, slotid } = req.body
    console.log(companyname, slotid);

    slot.updateOne({ _id: slotid }, { companyName: companyname },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated User : ", docs);
            }
        });

    applicationdetail.updateOne({ name: companyname },{ status: "Booked" }, 
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Original Doc : ", docs);

                res.json({ status: "success" }) 
            }
        });
}

module.exports = { postadminlogin, allApplications, approveApplication, rejectApplication, approvelist, rejectlist, progressdetails, slotdetail, slotbooking }