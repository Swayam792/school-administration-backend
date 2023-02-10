import connection from "../config/databaseConn.js";

export const allStudent = (req, res) => {
    try{
        let school_id = req.params.school_id;
 
        let allStudentQuery = `select student_id as id, student_name, class_id, medium  from student where school_id=?`; 
        connection.query(allStudentQuery,[school_id],(err, data) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                });
            }           
            return res.status(200).json({
                success: 1,
                allStudent : data
            });
        })
    }catch(err) {
        return res.status(500).json({
            success: 0,
            error : "Something went wrong!"
        });
    }
}

export const studentDetails = async (req, res) => {
    try{
        let student_id = req.params.student_id;
        let studentDetailQuery = `select student_name, class_id, parent_id, course_name, medium, board from student where student_id=?`;
        connection.query(studentDetailQuery,student_id, (err, data) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                });
            }
            return res.status(200).json({
                success: 1,
                studentDetails: data
            });
        })
    }catch(err){
        return res.status(500).json({ 
            success: 0,
            error : "Something went wrong!"
        });
    }
}

export const studentFeesDetails = (req, res) => {
    try{
        let student_id = req.params.student_id;         
        var dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1;        
        let academic_year = dateObj.getUTCFullYear();
        if(month >= 1 && month <= 5){
            academic_year -= 1;
        }
        let studentFeesDetailQuery = `select * from fees where student_id=? and academic_year=?`;        
        connection.query(studentFeesDetailQuery,[student_id, academic_year], (err, data) => {
            if(err){
                return res.status(500).json({
                     success: 0,
                     error: err.sqlMessage
                });
            }
            return res.status(200).json({
                 success: 1,
                 studentFees: data
            });
        })
    }catch(err) {
        return res.status(500).json({
            success: 0,
            error : "Something went wrong!"
        });
    }
}

export const studentParentDetails = (req, res) => {
    try{
        let parent_id = req.params.parents_id;
        let parentDetailsQuery = `select * from parents where parent_id=?`;
        
        connection.query(parentDetailsQuery,parent_id, (err, data) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    error: err.sqlMessage
                });
            }
            if(data.length == 0){
                return res.status(200).json({
                    success: 1,
                    parentDetails: data
                });
            }
            let student_count = data.length;
            data[0].children = student_count;
            return res.status(200).json({
                success: 1,
                parentDetails: data[0]
            });
        })
    }catch(err) {
        return res.status(500).json({
            success: 0,
            error : "Something went wrong!"
        });
    }
}

export const studentPerformance = (req, res) => {
    try{
        let student_id = req.params.student_id;
        
        let studentTestQuery = `select distinct(test_id) from marks where student_id=?`;
        connection.query(studentTestQuery, student_id, (err,allTest) => {
            if(err){
                return res.status(500).json({success: 0,error: err.sqlMessage});
            }
            let allmarksDetail = [];
            for(let j = 0; j < allTest.length; j++){
                let test_id = allTest[j].test_id;
                
                let studentMarkquery = `select m.test_id, t.test_date, s.subject_name,m.mark_obtained, m.total_marks from marks m, subject s, test t where student_id=? and m.subject_id=s.subject_id and m.test_id = t.test_id and t.test_id=?`;
                connection.query(studentMarkquery,[student_id,test_id], (err, data) => {
                    if(err){
                        return res.status(500).json({error: err.sqlMessage});
                    }
                    if(data.length == 0){
                        return res.status(200).json({
                            success:1,
                            message: "No data found!"
                        })
                    } 
                      
                    let marksDetail = {test_id: data[0].test_id, test_date: data[0].test_date, subject_name: [], mark_obtained: [], total_marks: [], percentage: 0}
                    let totmarks = 0, mark_ob = 0;
                    for(let i = 0; i < data.length; i++){
                        marksDetail.subject_name.push(data[i].subject_name);
                        marksDetail.mark_obtained.push(data[i].mark_obtained);
                        marksDetail.total_marks.push(data[i].total_marks);
                        totmarks += data[i].total_marks;
                        mark_ob += data[i].mark_obtained;
                        if(i == data.length - 1){
                            console.log(mark_ob, totmarks)
                            let per = (mark_ob/totmarks)*100;
                            marksDetail.percentage = per.toFixed(2); 
                            allmarksDetail.push(marksDetail);                            
                        }
                    }
                    if(j == allTest.length - 1){ 
                     return res.status(200).json({
                         success: 1,
                         allmarksDetail
                     })
                    }                     
                })
            }
        })
        
    }catch(err) {
        return res.status(500).json({success: 0,error : "Something went wrong!"});
    }
}

export const updateStudentFeeStatus = (req, res) =>{
    try{
        let student_id = req.params.student_id;
       
        let {first_installment_status, second_installment_status, third_installment_status} = req.body;
         
        var dateObj = new Date();
        let date = dateObj.toJSON(); 
        date = date.slice(0,10);
        let month = dateObj.getUTCMonth() + 1;        
        let academic_year = dateObj.getUTCFullYear();
        if(month >= 1 && month <= 5){
            academic_year -= 1;
        }
         
        let updateStatus = `update fees set first_installment_status=?, second_installment_status=?, third_installment_status=?, updated_on=? where student_id=? and academic_year=?`;
        connection.query(updateStatus,[first_installment_status, second_installment_status, third_installment_status, date, student_id, academic_year], (err, data) => {
            console.log(err)
            if(err){
                return res.status(500).json({success: 0,error: err.sqlMessage});
            }
            return res.status(200).json({success: 1, message: "Data updated successfully !"});
        })
    }catch(err){
        return res.status(500).json({
            success:0 , 
            error : "Something went wrong!"
        });
    }
}