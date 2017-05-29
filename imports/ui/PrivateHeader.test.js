import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PrivateHeader from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      let wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> )
      let buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function () {
      let title = "Test title here";
      let wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> )
      let h1Text = wrapper.find('h1').text();

      expect(h1Text).toBe(title);
    });

    it('should call handleLogout on click', function () {
      let spy = expect.createSpy();
      let wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/> );

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  });
}
