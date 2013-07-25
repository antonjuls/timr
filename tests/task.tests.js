var expect = require('chai').expect;
var sinon = require('sinon');
var moment = require('moment');

var Task = require('../lib/Task');

describe('timr', function() {

    describe('tasks', function() {

        describe('from', function() {
            it('should throw an error on invalid from date', function() {
                expect(function() {
                    new Task().from('asdf');
                }).to.throw();
            });

            it('should accept all kinds of dates', function() {
                var nowMoment = moment();
                var nowDate = new Date(nowMoment.format());
                var nowString = nowMoment.toString();

                var testTask1 = new Task().from(nowMoment);
                var testTask2 = new Task().from(nowDate);
                var testTask3 = new Task().from(nowString);

                expect(testTask1._from.format()).to.equal(nowMoment.format());
                expect(testTask2._from.format()).to.equal(nowMoment.format());
                expect(testTask2._from.format()).to.equal(nowMoment.format());
            });
        });

        describe('to', function() {
            it('should throw an error on invalid to date', function() {
                expect(function() {
                    new Task().to('asdf');
                }).to.throw();
            });

            it('should accept all kinds of dates', function() {
                var nowMoment = moment();
                var nowDate = new Date(nowMoment.format());
                var nowString = nowMoment.toString();

                var testTask1 = new Task().to(nowMoment);
                var testTask2 = new Task().to(nowDate);
                var testTask3 = new Task().to(nowString);

                expect(testTask1._to.format()).to.equal(nowMoment.format());
                expect(testTask2._to.format()).to.equal(nowMoment.format());
                expect(testTask2._to.format()).to.equal(nowMoment.format());
            });
        });

        describe('identification', function() {
            var myTask;
            var NAME = 'foo';

            beforeEach(function() {
                myTask = new Task();
            });

            it('should set a name', function() {
                myTask.name(NAME);
                expect(myTask._name).to.equal(NAME);
            });

            it('should create a name', function() {
                myTask._from = moment('2013-01-01');
                myTask._interval = 'm';
                myTask._modifier = '1';

                expect(myTask._createName()).to.equal('2013-01-01T00:00:00+01:00-x_m_1');
            });

            it('should return the name if set', function() {
                myTask.name(NAME);
                expect(myTask.ident()).to.equal(NAME);
            });

            it('should return the created name if no name is set', function() {
                myTask._from = moment('2013-01-01');
                myTask._interval = 'm';
                myTask._modifier = '1';

                expect(myTask.ident()).to.equal('2013-01-01T00:00:00+01:00-x_m_1');
            });
        });
    });

});