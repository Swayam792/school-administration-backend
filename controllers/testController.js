import connection from "../config/databaseConn.js";
 
const runInsert = (insertData, date, student_id, test_id) => {
    return new Promise((resolve, reject) => {
        let uploadMarkQuery = `insert into marks values (?,?,?,?,?,?)`;
        connection.query(uploadMarkQuery, [student_id, test_id, insertData.subject_id, insertData.mark_obtained, insertData.total_marks, date], (err, data) => {

            if (err) {
                return reject(err);
            } else {
                return resolve(data)
            }
        })
    })
}

export const uploadMarks = async (req, res) => {
    try {
        let student_id = req.params.student_id;
        let test_id = req.params.test_id;
        let bodyData = req.body.inputField;
        var dateObj = new Date();
        let date = dateObj.toJSON();
        date = date.slice(0, 10); 
        for (let i = 0; i < bodyData.length; i++) {           
                try {
                    await runInsert(bodyData[i], date, student_id, test_id);                   
                } catch (err) {
                    return res.status(500).send({
                        success: 0,
                        error: err.sqlMessage
                });                
            }
        }
        return res.status(200).json({
            success: 1,
            message: "Data uploaded successfully !"
        })
    } catch (err) {
        return res.status(500).json({
            success: 0,
            error: "Something went wrong!"
        });
    }
}

export const schoolAllTest = (req, res) => {
    try {
        let school_id = req.params.school_id;
        let schoolAllTestQuery = `select test_id from test where school_id=?`;
        connection.query(schoolAllTestQuery, school_id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                });
            }
            return res.status(200).json({
                success: 1,
                testDetails: data
            })
        })
    } catch (err) {
        return res.status(500).json({
            success: 0,
            error: "Something went wrong"
        })
    }
}

export const addTest = (req, res) => {
    try {
        let school_id = req.params.school_id;
        let { class_id, test_name, test_date } = req.body;
        let addTestQuery = `insert into test(class_id, test_name,test_date, school_id) values (?,?,?,?)`;
        connection.query(addTestQuery, [class_id, test_name, test_date, school_id], (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: "Check for the school_id exist or not !"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data inserted successfully !"
            })
        })
    } catch (err) {
        return res.status(500).json({
            success: 0,
            error: "Something went wrong"
        });
    }
}

export const addSubject = (req, res) => {
    try {
        let school_id = req.params.school_id;
        let { subject_name, class_id } = req.body;
        let addSubjectQuery = `insert into subject(subject_name) values (?)`;
        connection.query(addSubjectQuery, [subject_name], (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                });
            }
            let subject_id = data.insertId;
            let addSubjectDetailsQuery = `insert into school_subject(school_id, class_id, subject_id) values (?,?,?)`;
            connection.query(addSubjectDetailsQuery, [school_id, class_id, subject_id], (err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        error: "Check for the school_id or subject_id already exist or not !"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data inserted Successfully !"
                })
            })
        })
    } catch (err) {
        return res.status(500).json({
            success: 0,
            error: "Something went wrong"
        })
    }
}

export const getTestSubject = (req, res) => {
    try {
        let student_id = req.params.student_id;
        let getClassIdQuery = `select class_id, school_id from student where student_id=?`;
        let getSubjectQuery = `select s.subject_id, s.subject_name from subject s, school_subject ss where s.subject_id = ss.subject_id and ss.class_id=? and ss.school_id=?`
        connection.query(getClassIdQuery, student_id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                });
            }
            if (data.length == 0) {
                return res.status(500).json({
                    success: 0,
                    message: "No data found"
                });
            }
            let class_id = data[0].class_id;
            let school_id = data[0].school_id;

            connection.query(getSubjectQuery, [class_id, school_id], (err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        error: err.sqlMessage
                    });
                }
                return res.status(200).json({
                    success: 1,
                    allSubjects: data
                })
            })
        })
    } catch (err) {
        return res.status(500).json({
            success: 0,
            error: "Something went wrong"
        })
    }
}