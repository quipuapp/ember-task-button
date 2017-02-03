import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { task, timeout } from 'ember-concurrency';

moduleForComponent('task-button', 'Integration | Component | task button', {
  integration: true,

  beforeEach() {
    const theTask = task(function * () {
      yield timeout(100);
    });

    this.set('theTask', theTask);
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{task-button task=theTask idleText="click me"}}`);

  assert.equal(this.$().text().trim(), "click me");
});

test('it shows the text depending on the task status', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{task-button
      task=theTask
      click=(perform theTask)
      idleText="click me"
      runningText="task is running"}}
  `);

  assert.equal(this.$().text().trim(), "click me", "renders the `idleText` when idle");

  this.$('button').click();

  assert.equal(this.$().text().trim(), "task is running", "it shows the `runningText` when running");

  return wait().then( () => {
    assert.equal(this.$().text().trim(), "click me", "renders the `idleText` again when the task finishes");
  });
});

test('using it for form submit', function(assert) {
  this.set('actions.theTask', () => {
    Ember.run( () => {
      this.get('theTask').perform();
    });
  });

  this.render(hbs`
    <form {{action (action 'theTask') on='submit'}}>
      <input neme="example">

      {{task-button
        task=theTask
        idleText="Submit the form"
        runningText="Working on it"
        type="submit"}}
    </form>
  `);

  assert.equal(this.$().text().trim(), "Submit the form", "renders the `idleText` when idle");

  this.$('form').submit();

  assert.equal(this.$().text().trim(), "Working on it", "it shows the `runningText` when running");

  return wait().then( () => {
    assert.equal(this.$().text().trim(), "Submit the form", "renders the `idleText` again when the task finishes");
  });
});

test('it adds class `running` during task execution', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{task-button
      task=theTask
      click=(perform theTask)
      idleText="click me"
      runningText="task is running"}}
  `);

  assert.notOk(this.$('button').hasClass('running'),
              "it doesn't have class `running` before task starts");

  this.$('button').click();

  assert.ok(this.$('button').hasClass('running'),
              "it has class `running` when task is running");

  return wait().then( () => {
    assert.notOk(this.$('button').hasClass('running'),
                "it doesn't have class `running` when the task finished");
  });
});

test('with `working` as customized running class', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{task-button
      task=theTask
      click=(perform theTask)
      idleText="click me"
      runningText="task is running"
      runningClass="working"}}
  `);

  assert.notOk(this.$('button').hasClass('working'),
              "it doesn't have class `working` before task starts");

  this.$('button').click();

  assert.ok(this.$('button').hasClass('working'),
              "it has class `working` when task is running");
  assert.notOk(this.$('button').hasClass('running'),
              "it doesn't have class `running` when task is running");

  return wait().then( () => {
    assert.notOk(this.$('button').hasClass('working'),
                "it doesn't have class `working` when the task finished");
  });
});

test('using block works', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#task-button task=theTask}}
      click me
    {{/task-button}}
  `);

  assert.equal(this.$().text().trim(), "click me");
});

test('with inverse block renders the `else` block when the task is running', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#task-button task=theTask click=(perform theTask)}}
      click me
    {{else}}
      Ruunnnniiiiing...
    {{/task-button}}
  `);

  assert.equal(this.$().text().trim(), "click me", "renders the `idleText` when idle");

  this.$('button').click();

  assert.equal(this.$().text().trim(), "Ruunnnniiiiing...", "it shows the `runningText` when running");

  return wait().then( () => {
    assert.equal(this.$().text().trim(), "click me", "renders the `idleText` again when the task finishes");
  });
});
