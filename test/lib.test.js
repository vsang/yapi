import test from 'ava';

const rewire = require("rewire");
const lib = rewire('../common/lib.js');
const initPlugins = lib.initPlugins;


test('initPlugins', t=>{
  lib.__set__("getPluginConfig", function(){
    return {
      server: true,
      client: true
    }
  })
  let configs = initPlugins(['a', 'b'], 'exts');
  t.deepEqual(configs, [{
    name: 'a',
    enable: true,
    server: true,
    client: true
  }, {
    name: 'b',
    enable: true,
    server: true,
    client: true
  }])
})

test('initPlugins2', t=>{
  lib.__set__("getPluginConfig", function(){
    return {
      server: true,
      client: false
    }
  })
  let configs = initPlugins(['a', 'b'], 'exts');
  t.deepEqual(configs, [{
    name: 'a',
    enable: true,
    server: true,
    client: false
  }, {
    name: 'b',
    enable: true,
    server: true,
    client: false
  }])
})

test('initPlugins3', t=>{
  lib.__set__("getPluginConfig", function(){
    return {
      server: false,
      client: true
    }
  })
  let configs = initPlugins(['a', {name: 'a'}], 'exts');
  t.deepEqual(configs, [{
    name: 'a',
    enable: true,
    server: false,
    client: true
  }])
})

test('initPlugins3', t=>{
  lib.__set__("getPluginConfig", function(){
    return {
      server: false,
      client: true
    }
  })
  let configs = initPlugins([{
    name: 'a',
    options: {
      a:1,
      t:{
        c:3
      }
    }
  }], 'exts');
  t.deepEqual(configs, [{
    name: 'a',
    enable: true,
    server: false,
    client: true,
    options: {
      a:1,
      t:{
        c:3
      }
    }
  }])
})

test('initPlugins3', t=>{
  lib.__set__("getPluginConfig", function(){
    return {
      server: false,
      client: false
    }
  })
  let configs = initPlugins(['a', 'b'], 'exts');
  t.deepEqual(configs, [])
})

test('testJsonEqual', t=>{
  let json1 = {
    a:"1",
    b:2,
    c:{
      t:3,
      x: [11,22]
    }
  };

  let json2 = {    
    c:{
      x: [11,22],
      t:3
    },
    b:2,
    a:"1"
  }
  t.true(lib.jsonEqual(json1, json1));
})

test('testJsonEqualBase', t=>{
  t.true(lib.jsonEqual(1,1));
})

test('testJsonEqualBaseString', t=>{
  t.true(lib.jsonEqual('2', '2'));
})


test('isDeepMatch', t=>{
  t.true(lib.isDeepMatch({a:'aaaaa', b:2}, {a:'aaaaa'}))
})

test('isDeepMatch', t=>{
  t.true(lib.isDeepMatch({a:1, b:2, c: {t:'ttt'}}, {c: {t:'ttt'}}))
})
