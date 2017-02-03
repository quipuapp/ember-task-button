import Ember from 'ember';
import layout from '../templates/components/task-button';

export default Ember.Component.extend({
  layout,

  tagName: "button",

  attributeBindings: ['type', 'disabled'],
  classNameBindings: ['task.isRunning:running'],

  idleText: null,
  runningText: null,

  init() {
    this._super(...arguments);

    if (!!this.get('disabled')) {
      this.set('disabled', "disabled");
    }

    Ember.assert("You have to provide a task to `task-button`", this.get('task'));
    Ember.assert("You have to provide the `idleText` for the task button",
                 this.get('idleText'));

    const runningClass = this.get('runningClass');

    if (runningClass) {
      this.set('classNameBindings', [`task.isRunning:${runningClass}`]);
    }
  },

  text: Ember.computed('task.isRunning', function() {
    const idleText    = this.get('idleText');
    const runningText = this.get('runningText');

    if (runningText && this.get('task.isRunning')) {
      return runningText;
    } else {
      return idleText;
    }
  })
});
