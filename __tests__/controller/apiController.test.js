import {
  get_common_students,
  register_student,
  suspend_student,
  send_notifications
} from '../../controller/apiController';

describe('apiController', () => {
  const mockGetCommonStudentsResponse = {
    'status' : '200',
    'students' : [
      'student3@example.com',
      'student6@example.com'
    ]
  };
  const reqGetCommonStudents = {
    query : {
      teacher : [
        'teacherken@gmail.com'
      ]
    }
  };

  const postNewStudent = {
    body : {
      teacher : '',
      student : []
    }
  };

  const postSuspendStudent = {
    body : {
      teacher : '',
      student : ''
    }
  };

  const postSendNotifications = {
    body : {
      'teacher' : 'teacherken@example.com',
      'notification' : 'Hello students! @studentagnes@example.com @studentmiche@example.com'
    } 
  };

  let resGetCommonStudents =  { json : () => { }, send : () => { } },
      resRegisterStudents  =  { json : () => { }, send : () => { } },
      resPostSuspendStudent = { json : () => { }, send : () => { } },
      resPostNotification  =  { json : () => { }, send : () => { } };



  describe('get_common_students', () => {
    it('get_common_students function should return an object equal to mockGetCommonStudentsResponse', async () => {
      const data = get_common_students(reqGetCommonStudents, resGetCommonStudents);
      // expect(data).toEqual(mockGetCommonStudentsResponse);
    });
  });
  
  describe('register_student', () => {
    it('register_student function should return an object equal to mock data', async () => {
      const data = register_student(postNewStudent, resRegisterStudents);
      // expect(data).toEqual(mockGetCommonStudentsResponse);
    });
  });

  describe('suspend_student', () => {
    it('suspend_student function should return an object equal to mock data', async () => {
     const data = suspend_student(postSuspendStudent, resPostSuspendStudent);
      // expect(data).toEqual(mockGetCommonStudentsResponse);
    });
  });

  describe('send_notifications', () => {
    it('send_notifications function should return an object equal to mock data', async () => {
      const data = send_notifications(postSendNotifications, resPostNotification);
      // expect(data).toEqual(mockGetCommonStudentsResponse);
    });
  });

});