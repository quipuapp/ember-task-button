# ember-task-button

This simple addon provides a `task-button` component. It renders a button
and is intended to be used with an `ember-concurrency` task. The only
feature is to provide feedback to the user during the execution of a task.

During the execution of the task (`task.isRunning` returns `true`) the
button will present the content of the `runningText` attribute or the
inverse block, and will get a class added (`running` by default).

## Usage

```handlebars
  {{task-button
    task=doSomething
    click=(perform doSomething)
    idleText="Click me"
    runningText="Working on it"
    type="button"
    runningClass="working"}}
```

Or with block

```handlebars
  {{#task-button
    task=doSomething
    click=(perform doSomething)}}
    Holaaaaa!!
  {{else}}
    Workiiiing...
  {{/task-button}}
```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-task-button`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
