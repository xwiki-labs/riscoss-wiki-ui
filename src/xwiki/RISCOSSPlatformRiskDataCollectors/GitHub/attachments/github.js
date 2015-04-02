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

var FLOAT = function (x) {
    var xx = Number(x);
    if (isNaN(xx)) { throw new Error("[" + x + "] not a number"); }
    return xx;
};
var INT = function (x) {
    var xx = FLOAT(x);
    if (xx !== Math.floor(xx)) { throw new Error("[" + x + "] not an integer"); }
    return xx;
};
var BOOL = function (x) {
    return (Boolean(x) === true) ? 1 : 0;
};
var DATE = function (x) {
    return Math.floor((new Date(x)).getTime() / 1000);
};

var ELEMENTS = {
    'open_issues_count': INT,
    'stargazers_count':  INT,
    'forks_count':       INT,
    'subscribers_count': INT,
    'created_at':        DATE,
    'size':              INT,
    'has_wiki':          BOOL,
    'updated_at':        DATE
};

var parse = function (dataStr) {
    var data = JSON.parse(dataStr);
    var out = [];
    for (var elem in ELEMENTS) {
        out.push({ id:'github:repo:' + elem, value: ELEMENTS[elem](data[elem]) });
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
