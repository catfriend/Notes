import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {

    it('should render title and timestamp', function () {
      let title = 'Note Title';
      let updatedAt = 1496257983192;
      let wrapper = mount( <NoteListItem note={{ title, updatedAt }}/> );

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('5/31/17');
    });

    it('should set default title if no title set', function () {
      let title = '';
      let wrapper = mount( <NoteListItem note={{ title }}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });
  });
}
