import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('users', function () {

    it('should allow valid email address', function () {
      let testUser = {
        emails: [
          {
            address: 'Test@example.com'
          }
        ]
      };
      let res = validateNewUser(testUser);

      expect(res).toBe(true);
    });

    it('should reject invalid email', function () {


      expect(() => {
        let testUser = {
          emails: [
            {
              address: 'Test@example.m'
            }
          ]
        };

        expect(() => {
          validateNewUser(testUser);
        }).toThrow();
      });
    });

  });
}





// const add = (a, b) => a + b;
//
// it('should add two numbers', function () {
//   let res = add(6, 3);
//
//   expect(res).toBe(9);
// });
//
//
// const square = (a) => a * a;
//
// describe('square', function () {
//   it('should square a number', function () {
//     let res = square(9);
//
//     expect(res).toBe(81);
//
//   });
// });
