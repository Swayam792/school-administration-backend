import connection from "../config/databaseConn.js";

export const allSchools = (req, res) => {
    try{
        let allSchoolQuery = `select school_name, city_name, admin_name, email, mobile from school;`;
        connection.query(allSchoolQuery, (err, data) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                })
            }
            return res.status(200).json({
                success: 1,
                allSchool: data
            })
        })
    }catch(err){
        return res.json({
            success: 0,
            error: "Something went wrong!"
        })
    }
}


export const schoolDetails = (req, res) => {
    try{
        let school_id = req.params.school_id;
        let schoolQuery = `select school_name, city_name, admin_name, email, mobile from school where school_id=?;`;
        let result = undefined, totalStudent, totalTeacher;
        connection.query(schoolQuery,school_id, (err, data) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                })
            }
            result = data[0];
            let teacherQuery = `select count(distinct(teacher_id)) as totalteacher from teacher where school_id=?`;
            connection.query(teacherQuery,school_id, (err, tdata) => {
                if(err){
                    return res.status(500).json({
                        success: 0,
                        error: err.sqlMessage
                    })
                }
                totalTeacher = tdata[0].totalteacher;                
                let studentQuery = `select count(distinct(student_id)) as totalstudent from student where school_id=?`;
                connection.query(studentQuery,school_id, (err, sdata) => {
                    if(err){
                        return res.status(500).json({
                            success: 0,
                            error: err.sqlMessage
                        })
                    }
                    totalStudent = sdata[0].totalstudent;
                    return res.status(200).json({
                        success: 1,
                        schoolDetail: result,
                        totalStudent : totalStudent,
                        totalTeacher : totalTeacher
                    })
                });
           })
        });
    }catch(err){
        return res.json({
            success: 0,
            error: "Something went wrong!"
        });
    }
}
