const Company  = require('../models/company');

exports.signup_company = async (req,res)=>{
    let {company_id, password, company_name, company_contact, company_address, company_manager, activity_category} = req.body;
    let {account_number} = req.body;
    let account_image = `${req.file.location}`;
    await Company.create({
        "id": company_id,
        "password": password,
        "company_name": company_name,
        "company_contact": company_contact,
        "company_address": company_address,
        "company_manager": company_manager,
        "activity_category": activity_category,
        "account_number": account_number,
        "account_image": account_image
    });
    result = await Company.findAll({
        where: {
            "id": company_id
        }
    });
    console.log(result);
    res.send(result);
};

exports.get_company = async (req,res)=>{
    let {company_id} = req.body;
    let result = await Company.findAll({
        attributes : ["company_id", "password", "company_name", "company_contact", "company_manager", "company_address", "activity_category","account_number"],
        where: {
            "id": company_id
        }
    })
    console.log(`${result}`);
    res.send(result);
};

exports.login = async (req,res)=>{
    let data = req.body;
    let result= await Company.findOne({
        where:{
            "id": data.company_id
        },
    })
    if(!result){
        res.send({
            "success": false,
            "message": "존재하지 않는 아이디"
        })
    } else{
        if(data.password==result.password){
            res.send({
                "success": true,
                "message": `${result.id} 로그인 성공`
            })
        } else{
            res.send({
                "success": false,
                "message": "존재하지 않는 비밀번호"
            })
        }

    }
};

exports.delete_company =  async (req,res)=>{
    let {company_id} = req.body;
    await Company.destroy({
        where:{
            "id": company_id
        }
    })
    
    res.send(`${company_id} 삭제`);
};