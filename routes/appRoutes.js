module.exports = app => {
  const apiController = require('../controller/apiController');

  // get common students
  app.route('/api/commonstudents')
    .get(apiController.get_common_students);

  // register the student
  app.route('/api/register')
    .post(apiController.register_student);

  // suspend the student
  app.route('/api/suspend')
    .post(apiController.suspend_student);
  
  // retrieve for notifications
  app.route('/api/retrievefornotifications')
    .post(apiController.send_notifications);
};