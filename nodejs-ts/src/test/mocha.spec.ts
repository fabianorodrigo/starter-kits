// This is the root test file that will import all my test suites

import {Suite} from 'mocha';
import arraysSpec from '../services/arrays/arrays.spec';
import regexpSpec from '../services/regexp/regexp.spec';
import filesSpec from '../services/files/files.spec';
import buffersSpec from '../services/buffers/buffers.spec';
import streamsSpec from '../services/streams/streams.spec';
import eventSpec from '../services/events/events.spec';
import redisSpec from '../services/redis/redis.spec';
import enumSpec from '../services/enum/enum.spec';

describe('Server unit testing', function (this: Suite) {
  describe('arrays', arraysSpec);
  describe('regexp', regexpSpec);
  describe('files', filesSpec);
  describe('buffers', buffersSpec);
  describe('streams', streamsSpec);
  describe('events', eventSpec);
  describe('redis', redisSpec);
  describe('enum', enumSpec);
});
