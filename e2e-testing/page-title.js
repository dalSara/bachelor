//https://mochajs.org/
//http://samwize.com/2014/02/08/a-guide-to-mochas-describe-it-and-setup-hooks/
//https://docs.travis-ci.com/user/languages/javascript-with-nodejs/


var assert = require("assert")

describe('Show & Do tests', function () {

    it('has the expected page title', function () {
        browser.url('/');
        assert.equal(browser.getTitle(), 'Show & Do');
    });

    it('can go to Add Track page', function () {

        var title = 'Add track - Show & Do';
        browser.url("/");
        assert.notEqual(browser.getTitle(), title);

        var addTrackBtn = browser.element("#addTrackBtn")
        addTrackBtn.click()

        assert.equal(browser.getTitle(), title);
    });
});
