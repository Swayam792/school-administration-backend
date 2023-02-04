import connection from "../config/databaseConn.js"

export const addStudent = (req, res) => {
    try {
        let school_id = req.params.school_id;
        var dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1;
        let academic_year = dateObj.getUTCFullYear();
        if (month >= 1 && month <= 5) {
            academic_year -= 1;
        }
        
        let { student_name, gender, dob, address, class_id, course_name, medium, board, father_name, father_profession, mother_name, mother_profession, whatsapp_no, alternative_mobile, email, total_fees, first_installment, first_installment_eta, first_installment_status, second_installment, second_installment_eta, second_installment_status, third_installment, third_installment_eta, third_installment_status, aadhar_no } = req.body;
        let addStudentQuery = `INSERT INTO student (school_id, parent_id, student_name, class_id, course_name, medium, board, gender, dob, address,aadhar_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let addParentsQuery = `insert into parents values (?,?,?,?,?,?,?,?,?)`;
        let addParentLogin = `insert into parents_login(username, password) values (?,?)`;
        let findParent = 'select * from parents where whatsapp_no=?';
        let addStudentFess = `insert into fees values (?,?,?,?,?,?,?,?,?,?,?,?)`;

        connection.query(findParent, whatsapp_no, (err, data) => {       
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                })
            }
            // console.log(data[0]);
            if (data.length == 0) {
                let gg = Math.floor(Math.random() * 100000);
                let username = father_name + "@12" + gg;
                let password = father_name + "@4567";
                connection.query(addParentLogin, [username, password], (err, data) => {                 
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            error: err.sqlMessage
                        })
                    }

                    let parent_id = data.insertId;
                    connection.query(addStudentQuery, [school_id, parent_id, student_name, class_id, course_name, medium, board, gender, dob, address,aadhar_no], (err, data) => {                         
                        if (err) {
                            console.log(data);
                            return res.status(500).json({
                                success: 0,
                                error: err.sqlMessage
                            })
                        }
                        let child_id = data.insertId;
                        connection.query(addParentsQuery, [parent_id, father_name, whatsapp_no, alternative_mobile, email, father_profession, mother_name, mother_profession, child_id], (err, data) => {                           
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    error: err.sqlMessage
                                })
                            }
                            connection.query(addStudentFess, [child_id, total_fees, first_installment, first_installment_eta, first_installment_status, second_installment, second_installment_eta, second_installment_status, third_installment, third_installment_eta, third_installment_status, academic_year], (err, data) => {                               
                                if (err) {
                                    return res.status(500).json({
                                        success: 0,
                                        error: err.sqlMessage
                                    })
                                }
                                return res.status(200).json({
                                    success: 1,
                                    message: "Data Inserted Successfully!"
                                })
                            })
                        })
                    })
                })

            } else {
                let parent_id = data[0].parent_id;                 
                connection.query(addStudentQuery, [school_id, parent_id, student_name, class_id, course_name, medium, board, gender, dob, address,aadhar_no], (err, dat) => {
                    console.log(err)
                    if (err) {                        
                        return res.status(500).json({
                            success: 0,
                            error: err.sqlMessage
                        })
                    }
                    let child_id = dat.insertId;
                    connection.query(addParentsQuery, [parent_id, data[0].father_name, data[0].whatsapp_no, data[0].alternative_mobile, data[0].email, data[0].father_profession, data[0].mother_name, data[0].mother_profession, child_id], (err, data) => {
                        console.log(err)
                        if (err) {
                            return res.status(500).json({
                                success: 0,
                                error: err.sqlMessage
                            })
                        }
                        connection.query(addStudentFess, [child_id, total_fees, first_installment, first_installment_eta, first_installment_status, second_installment, second_installment_eta, second_installment_status, third_installment, third_installment_eta, third_installment_status, academic_year], (err, data) => {
                            console.log(err)
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    error: err.sqlMessage
                                })
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Data Inserted Successfully!"
                            })
                        })
                    })
                })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: 0,
            error: "Something went wrong!"
        });
    }
}