import apiModel from '../model/apiModel';

const model = new apiModel();

/**
 * Get common students
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const get_common_students = (req, res) => {
  const { query } = req;
  const { teacher } = query; 
  let teacher_email = [];

  if (teacher instanceof Array) {
    teacher_email = teacher;
  } else {
    teacher_email.push(teacher);
  }

  model.getCommonStudents(teacher_email, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

/**
 * Register new student
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const register_student = (req, res) => {
  const { body } = req;
  const { teacher, students } = body;

  if (teacher && students) {
    model.registerStudent(body, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json(task)
    });
  }
 };

/**
 * Get common students
 * 
 * @param {*} req
 * @param {*} res
 */
export const suspend_student = (req, res) => {
  const { body } = req;
  const { student } = body;

  model.suspendStudent(student, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

/**
 * Send notification
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const send_notifications = (req, res) => {
  const { body } = req;

  model.sendNotificationToStudent(body, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
}