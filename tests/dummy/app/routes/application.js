import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Route.extend({
  doSomething: task(function * () {
    console.log("Doing something");

    yield timeout(800);

    console.log("Done doing something");
  }),

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('doSomething', this.get('doSomething'));
  },

  actions: {
    doSomething() {
      this.get('doSomething').perform();
    }
  }
});
