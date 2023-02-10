import connection from "../config/databaseConn.js";
import jwt from "jsonwebtoken";
import "dotenv/config"

export const userLogin = async(req, res) => {
    try{        
       let {admin_id, password} = req.body;
       let postLogin = `select * from user where admin_id =?;`;
       connection.query(postLogin,admin_id, (err, data) => {         
        if(err){
            return res.status(500).json({
                success: 0, 
                error : err.sqlMessage
            });
        }
        
        if(data.length == 0 || data[0].password !== password){
            return res.status(401).json({
                success: 0,
                error: "Admin id or password is incorrect !"
          });
        }
        data[0].password = undefined;
        const jsontoken = jwt.sign({result: data[0]}, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })
        return res.status(200).json({
            success: 1,
            message: "login successfully",            
            token: jsontoken
        });
       })
    }catch(err) { 
        return res.status(500).json({
            success: 0, 
            error : "Something went wrong!"
        });
    }
}

export const parentLogin = async (req, res) => {
    try{
        let {username, password} = req.body;
        let postLogin = `select * from parents_login where username=?;`;
        let jsontoken;
        connection.query(postLogin,username, async (err, data) => {
            if(err){
                return res.json(500).json({
                    success: 0, 
                    error : err.sqlMessage
                });
            }
            if(data.length == 0 || data[0].password !== password){
                return res.status(401).json({
                    success: 0, 
                    error: "username or password is incorrect !"
                });
            }
           
            data[0].password = undefined;
            jsontoken = await jwt.sign({result: data[0]}, process.env.JWT_SECRET, {
                expiresIn: "30d"
            })
            
            return res.status(200).json({
                success: 1,
                message: "login successfully",            
                token: jsontoken
            });
        }) 
    }catch(err) {
        return res.status(500).json({
            success: 0, 
            error : "Something went wrong!"
        });
    }
}

export const teacherLogin = (req, res) => {
    try{
        let {username, password} = req.body;
        let postLogin = `select * from teacher_login where username=?;`;
        connection.query(postLogin, username, (err, data) => {
            if(err){
                return res.status(500).json({error : err.sqlMessage});
            } 
            if(data.length == 0 || data[0].password !== password){
                return res.status(401).json({error: "username or password is incorrect !"});
            }
            data[0].password = undefined;
            const jsontoken = jwt.sign({result: data[0]}, process.env.JWT_SECRET, {
                expiresIn: "30d"
            })
            return res.status(200).json({
                success: 1,
                message: "login successfully",            
                token: jsontoken
            });
        })
    }catch(err) {
        return res.status(500).json({
            success:0, 
            error : "Something went wrong!"
        });
    }
}

export const userChangePassword = (req, res) => {
    try{
        let {admin_id, oldPassword, newPassword} = req.body;
        let updateUserPasswordQuery = `update user set password = ? where admin_id = ? and password = ?;`;
        let checkUserQuery = `select password from user where admin_id = ?;`;
        connection.query(checkUserQuery, admin_id, (err, data) => {
            if(err){
                return res.status(500).json({success: 0,
                    error : err.sqlMessage
                });
            }
             
            if(data[0].password !== oldPassword){
                return res.status(401).json({
                    success: 0,
                    error : "Old password is incorrect !"
                });
            }

            connection.query(updateUserPasswordQuery, [newPassword, admin_id, oldPassword], (err, data) => {
                if(err){
                    return res.status(500).json({
                        success: 0,
                        error : err.sqlMessage
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Password changed successfully"
                });
            });
        });
    }catch(err){
        return res.status(500).json({
            success:0,
            error : "Something went wrong!"
        });
    }
}