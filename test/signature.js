'use strict';

var signature = require('../lib/signature');

var sinon = require('sinon');

describe('xhub.signature', function () {

    it('should default to sha1 algorithm when not specified', function(){
        var sig = new signature();
        sig.algorithm.should.equal('sha1');
    });

    it('should use a specific algorithm when specified', function(){
        var algorithm = 'md5';
        var sig = new signature(null, { algorithm: algorithm });
        sig.algorithm.should.equal(algorithm);
    });

    it('should attach isXHubValid correctly to the piped request', function(){
        var request = {};
        var sig = new signature();
        sig.attach(request);
        request.isXHubValid.should.be.a('function');
    });

    it('should call isValid once from the isXHubValid attachment', function(){
        var isValid = sinon.spy();
        var request = {};
        var sig = new signature();
        sig.isValid = isValid;
        sig.attach(request);
        request.isXHubValid();
        isValid.should.have.been.calledOnce;
    });

    it('should call isValid with the correct context', function(done){
        var request = {};
        var sig = new signature();
        sig.isValid = function(){
            this.should.equal(sig);
            done();
        };
        sig.attach(request);
        request.isXHubValid();
    });

    it('should thow when isValid has no secret', function(){
        var sig = new signature();
        (function(){ sig.isValid(); }).should.throw(Error);
    });

    it('should return false when the signatures dont match', function(){
        var xhub = '123-signature';
        var secret = 'my_little_secret';
        var sig = new signature(xhub, { secret: secret });
        sig.isValid('invalid-signature').should.be.false;
    });

    it('should return true when the signatures match', function(){
        var xhub = 'sha1=3dca279e731c97c38e3019a075dee9ebbd0a99f0';
        var secret = 'my_little_secret';
        var sig = new signature(xhub, { secret: secret });
        sig.isValid('random-signature-body').should.be.true;
    });

    it('should return true when body contains UTF-8 chars and the signatures match', function(){
        var xhub = 'sha1=6eca52592dced2ec4b9c974538d6bb32e25ab897';
        var secret = 'my_little_secret';
        var sig = new signature(xhub, { secret: secret });
        sig.isValid('random-utf-8-あいうえお-body').should.be.true;
    });

});
