import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    doSomething() {
      this.get('doSomething').perform();
    }
  }
});
