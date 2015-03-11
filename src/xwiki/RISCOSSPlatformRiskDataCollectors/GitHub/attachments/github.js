/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Https = require('https');

var ELEMENTS = [
    'stargazers_count',
    'forks_count',
    'open_issues_count',
    'subscribers_count'
];

var parse = function (dataStr) {
    var data = JSON.parse(dataStr);
    var out = [];
    for (var i = 0; i < ELEMENTS.length; i++) {
        out.push({id:'github:repo:' + ELEMENTS[i], value: data[ELEMENTS[i]]});
    }
    return out;
};

var makeReq = function (path, callback) {
    var out = [];
    Https.request({
        path: path,
        host:"api.github.com",
        headers: {
            "User-Agent": "RISCOSS github data collector http://riscoss.eu/"
        }
    }, function (resp) {
        resp.on('data', function (chunk) { out.push(chunk.toString('utf8')); });
        resp.on('end', function () {
            callback(parse(out.join('')));
        });
    }).end();
};

var decode = function (content) {
    return decodeURIComponent(content.replace("_", "/"));
};

var run = function (conf) {
    makeReq('/repos/' + decode(conf.targetEntity), function (data) {
        data.forEach(function (elem) {
            elem.type = 'NUMBER';
            elem.target = conf.targetEntity;
        });
        console.log('-----BEGIN RISK DATA-----');
        console.log(JSON.stringify(data, null, '  '));
        console.log('-----END RISK DATA-----');
    });
};

var main = function () {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    var data = "";
    process.stdin.on('data', function(chunk) { data += chunk; });
    process.stdin.on('end', function() { run(JSON.parse(data)); });
};
main();
