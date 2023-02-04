import connection from "../config/databaseConn.js";
import "dotenv/config"
import { verify } from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1];            
        verify(authorization, process.env.JWT_SECRET, (err, decode) => {
            if(err){
                return res.json({
                    success: 0,
                    message: "Invalid Token!"
                })
            }else{
                next();
            }
        })
    }
    return res.status(500).json({
        success: 0,
        error: "Please provide authorization header!"
    });
}

export const checkUserToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.admin_id;
        let userQuery = `select * from user where admin_id=?;`;
        connection.query(userQuery,userId, (err, data) => {
            if(err){
                return res.status(500).json({
                    success: 0, 
                    error : err.sqlMessage
                });
            }
            if(data.length > 0){
                next();
            }else{
                return res.status(500).json({
                    success: 1,
                    message: "You are not authenticated to do this action!"
                })
            }
        })
    }
    return res.status(500).json({
        success: 0,
        error: "Please provide authorization header!"
    });
}

export const checkParentToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var username = decoded.username;
        let parentQuery = `select * from parents_login where username=?;`;
        connection.query(parentQuery ,username, (err, data) => {
            if(err){
                return res.json(500).json({
                    success: 0, 
                    error : err.sqlMessage
                });
            }
            if(data.length > 0){
                next();
            }else{
                return res.status(401).json({
                    success: 1,
                    message: "You are not authenticated to do this action!"
                })
            }          
        })
    }
    return res.status(500).json({
        success: 0,
        error: "Please provide authorization header!"
    });
}

export const checkTeacherToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var username = decoded.username;
        let parentQuery = `select * from teacher_login where username=?;`;
        connection.query(parentQuery ,username, (err, data) => {
            if(err){
                return res.json(500).json({
                    success: 0, 
                    error : err.sqlMessage
                });
            }
            if(data.length > 0){
                next();
            }else{
                return res.status(401).json({
                    success: 1,
                    message: "You are not authenticated to do this action!"
                })
            }          
        })
    }
    return res.status(500).json({
        success: 0,
        error: "Please provide authorization header!"
    });
}