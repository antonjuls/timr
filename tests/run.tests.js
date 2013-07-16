var moment = require('moment');
var expect = require('chai').expect;
var sinon = require('sinon');

var Run = require('../lib/Run');

describe('Run', function() {

    it('should execute', function() {
        var clock = sinon.useFakeTimers();

        var myRun = new Run(moment().add('seconds', 10));

        var executed = false;
        myRun.execute(function() {
            executed = true;
        });

        //20s in the future
        clock.tick(20000);

        expect(executed).to.be.true;

        clock.restore();
    });

    it('should not execute when clearing', function() {
        var clock = sinon.useFakeTimers();

        var myRun = new Run(moment().add('seconds', 10));

        var executed = false;
        myRun.execute(function() { executed = true; });

        myRun.clear();

        //20s in the future
        clock.tick(20000);

        expect(executed).to.be.false;

        clock.restore();
    });

    it('should reschedule 3 times until actually executing', function() {
        var clock = sinon.useFakeTimers();

        var oldMaxTimeout = Run.MAX_TIMEOUT;
        Run.MAX_TIMEOUT = 5000;

        var myRun = new Run(moment().add('seconds', 15));

        var stepSpy = sinon.spy();
        myRun._stepCallback = stepSpy;

        var executionSpy = sinon.spy();
        myRun.execute(executionSpy);

        //20s in the future
        clock.tick(20000);

        //0s   5s   10S  15s
        //-----S----S-----X

        expect(executionSpy.callCount).to.equal(1);
        expect(stepSpy.callCount).to.equal(2);

        clock.restore();
        Run.MAX_TIMEOUT = oldMaxTimeout;
    });
});