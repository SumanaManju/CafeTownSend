const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

export const expect = chai.expect;
export const assert = chai.assert;
export const should = chai.should();
