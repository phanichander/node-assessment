import sql from './db.js';

class apiModel {
  
  /**
   * Get common students
   * 
   * @param {*} teacher
   * @param {*} callback
   */
  getCommonStudents(teacher, callback) {
    let query = '',
      response = {},
      condition_teacher_email = '',
      students = [],
      message = '';

    teacher.map((teacher_email, index) => {
      if (index === 0) {
        condition_teacher_email = `t.teacher_email='${teacher_email}'`;
      }
      else {
        condition_teacher_email += `OR t.teacher_email='${teacher_email}'`;
      }
    });

    query = `SELECT DISTINCT s.student_email 
      FROM student as s, teacher as t, student_teacher as st 
      WHERE t.teacher_id = st.teacher_id 
        AND (${condition_teacher_email})
        AND st.student_id = s.student_id 
      ORDER BY student_email ASC`;

    sql.query(query, (err, result) => {
      if(err) {
        callback(err, null);
      }
      else {
        if (result.length > 0) {
          result.map((student, index) => {
            const { student_email } = student;
            students.push(student_email);
          });
  
          response = {
            status : '200',
            students
          };

          callback(null, response);
        }
        else {
          message = `No student exists!!`;
          callback(this.responseMessage(404, message), null);
        }
      }
    });
  }

  /**
   * Register new student(s)
   * 
   * @param {*} body 
   * @param {*} callback 
   */
  registerStudent(body, callback) {
    const {
      teacher,
      students
    } = body;
    let query = '',
      insert_student,
      insert_student_teacher,
      message = '';

    query = `SELECT COUNT(teacher_email) as count_teacher FROM teacher
      WHERE teacher_email=('${teacher}')`;

    sql.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      }
      else {
        const { count_teacher } = result[0];
        if(count_teacher > 0) {
          students.map(student => {
            insert_student = `INSERT INTO student(student_email) VALUES('${student}')`;
            sql.query(insert_student, (err, result_insert_student) => {
              if (err) {
                callback(err, null);
              }
              else {
                const { insertId } = result_insert_student;
                const student_id = insertId;

                insert_student_teacher = `INSERT INTO student_teacher(student_id, teacher_id) 
                  VALUES(${student_id}, (SELECT teacher_id FROM teacher WHERE teacher_email ='${teacher}'))`;
            
                sql.query(insert_student_teacher, (err, result_insert_student_teacher) => {
                  if (err) {
                    callback(err, null);
                  }
                  else {
                    message = 'Student registered successfully !!'
                    callback(this.responseMessage('200', message), null);
                  }
                });
              }
            });
          });
        }
        else {
          message = `The teacher ${teacher} doesn't exists!!`;
          callback(this.responseMessage(404, message), null);
        }
      }
    });
  }

  /**
   * Suspend student
   * 
   * @param {*} student_email
   * @param {*} callback
   */
  suspendStudent(student_email, callback) {
    let query = '',
    message = '';

    query = 'UPDATE student SET status = 0 WHERE student_email = ?';

    sql.query(query, [student_email], (err, result) => {
      if(err) {
        callback(err, null);
      }
      else {
        message = `Student with email ${student_email} suspended successfully !!`;
        callback(this.responseMessage('200', message), null);
      }
    });
  }

  /**
   * Send notification to the students
   * 
   * @param {*} body
   * @param {*} callback
   */
  sendNotificationToStudent(body, callback) {
    const { teacher, notification } = body;
    let query = '',
      message = '',
      query_student,
      response = {},
      recipients = [];

    if (notification.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) {
      recipients = [...notification.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)];
    }
    query = `SELECT COUNT(teacher_email) as count_teacher FROM teacher
      WHERE teacher_email=('${teacher}')`;

    sql.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      }
      else {
        const { count_teacher } = result[0];
        if(count_teacher > 0) {
          query_student = `SELECT DISTINCT s.student_email 
            FROM student as s, teacher as t, student_teacher as st 
            WHERE t.teacher_id = st.teacher_id 
              AND t.teacher_email = '${teacher}' 
              AND st.student_id = s.student_id 
            ORDER BY student_email ASC`;

          sql.query(query_student, (err, result_student) => {
            if(err) {
              callback(err, null);
            }
            else {
              if (result_student.length > 0) {
                result_student.map(student => {
                  const { student_email } = student;
                  recipients.push(student_email);
                });

                response = {
                  status : '200',
                  recipients
                };
                callback(null, response);
              } else {
                message = `No student exists!!`;
                callback(this.responseMessage(404, message), null);
              }
            }
          });
        }
        else {
          message = `The teacher ${teacher} doesn't exists!!`;
          callback(this.responseMessage(404, message), null);
        }
      }
    });
  }

  /**
   * Response message
   * 
   * @param {*} status
   * @param {*} message
   */
  responseMessage(status, message) {
    let response = {};

    response = {
      status,
      message
    }

    return response;
  }
}

export default apiModel;