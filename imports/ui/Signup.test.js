import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { ReactTestUtils } from 'react-dom/test-utils';

import { Signup } from './Signup';

if (Meteor.isClient) {
  describe('Signup', function () {

    it('should show error messages', function () {
      let error = 'This is not working';
      let wrapper = mount(<Signup createUser={() => {}}/>);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function () {
      let email = 'bonehead@test.com';
      let password = 'password123';
      let spy = expect.createSpy();
      let wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error if password too short', function () {
      let email = 'bonehead@test.com';
      let password = '123';
      let spy = expect.createSpy();
      let wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect (wrapper.state('error').length).toBe < (0);
    });

    it('should set createUser callback errors', function () {
      let password = 'password1234';
      let reason = 'This is why it failed';
      let spy = expect.createSpy();
      let wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({ reason });
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error').length).toBe(0);
    });

  });
}
