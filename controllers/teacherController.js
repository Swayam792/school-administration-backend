
import connection from "../config/databaseConn.js";

export const allTeacher = (req, res) => {
    try{
        let school_id = req.params.school_id;
        let allTeacherQuery = 'select teacher_id as id, teacher_name, subject_id, salary, mobile from teacher where school_id=?;';
        connection.query(allTeacherQuery, school_id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                })
            }
            return res.status(200).json({
                success: 1,
                teacherDetails: data
            })
        })
    }catch(err){
        return res.status(500).json({
            success: 0,
            error: "Something went wrong!"
        });
    }
}

export const teacherDetails = (req, res) => {
    try{
        let teacher_id = req.params.teacher_id;
        let teacherQuery = 'select * from teacher where teacher_id=?;';
        connection.query(teacherQuery, teacher_id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                })
            }
            return res.status(200).json({
                success: 1,
                teacherDetails: data
            })
        })
    }catch(err){
        return res.status(500).json({
            success: 0,
            error: "Something went wrong!"
        });
    }
}

export const teacherPaymentDetails = (req, res) => {
    try{
        let teacher_id = req.params.teacher_id;
        let teacherPaymentQuery = 'select teacher_id as id, amount, year, month from teacher_salary where teacher_id=?;';
        connection.query(teacherPaymentQuery, teacher_id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                })
            }
            return res.status(200).json({
                success: 1,
                teacherDetails: data
            })
        })
    }catch(err){
        return res.status(500).json({
            success: 0,
            error: "Something went wrong!"
        });
    }
}


export const updateTeacherSalaryStatus = (req, res) => {
    try{
        let teacher_id = req.params.teacher_id;
        let {month, amount, year} = req.body;
        let date = new Date().toJSON(); 
        date = date.slice(0,10);

        let teacherPaymentQuery = 'insert into teacher_salary(teacher_id, amount, month, year, updated_on) values (?,?,?,?,?)';
        connection.query(teacherPaymentQuery, [teacher_id, amount, month, year, date], (err, data) => {
             
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data updated successfully !"
            })
        })
    }catch(err){
        return res.status(500).json({
            success: 0,
            error: "Something went wrong!"
        });
    }
}

export const addTeacher = (req, res) => {
    try{
        let school_id = req.params.school_id;
        let {teacher_name, subject_id, mobile,date, age, gender, email,city,experience, salary, medium} = req.body;
       // console.log(teacher_name);
        let addTeacherQuery = `insert into teacher(teacher_name, school_id, subject_id, mobile, age, gender, email,city,experience, salary, date_of_joining, medium) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
        let addTeacherLoginQuery = 'insert into teacher_login(teacher_id,username,password) value (?,?,?);';
        connection.query(addTeacherQuery, [teacher_name, school_id,subject_id, mobile, age, gender, email,city,experience, salary, date, medium], (err, data) => {
            console.log(err);
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                })
            }
            let teacher_id = data.insertId;
            let username = teacher_name + "@"+ teacher_id;
            let password = teacher_name + teacher_id + "@7832"; 
            connection.query(addTeacherLoginQuery, [teacher_id,username,password], (err,data) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        error: err.sqlMessage
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data inserted successfully !"
                })
            })
        })
    }catch(err){
        return res.status(500).json({
            success: 0,
            error: "Something went wrong!"
        });
    }
}
  
export const SubjectDetails = (req, res) => {
    try{
        let school_id = req.params.school_id;
        let subjectDetailQuery = `select ss.subject_id as subject_id, s.subject_name from school_subject ss, subject s where ss.subject_id = s.subject_id and ss.school_id=?`;
        connection.query(subjectDetailQuery, school_id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                })
            }
            return res.status(200).json({
                success: 1,
                allSubject: data
            })
        })
    }catch(err){
        return res.status(500).json({
            success: 0,
            error: "Something went wrong!"
        });
    }
}