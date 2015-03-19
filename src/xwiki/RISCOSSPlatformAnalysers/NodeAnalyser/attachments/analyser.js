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
var Fs = require('fs');

var BEGIN_MARKER = "-----BEGIN ANALYSIS OUTPUT-----";
var END_MARKER = "-----END ANALYSIS OUTPUT-----";

var readFile = function (fileName, cb) {
    if (fileName === '-') {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        var data = "";
        process.stdin.on('data', function(chunk) { data += chunk; });
        process.stdin.on('end', function() { cb(data); });
    } else {
        Fs.readFile(fileName, function (err, ret) {
            if (err) { throw err; }
            return cb(ret.toString('utf8'));
        });
    }
};

var print = function (json) {
    console.log("-----BEGIN ANALYSIS OUTPUT-----");
    console.log(JSON.stringify(json, null, '  '));
    console.log("-----END ANALYSIS OUTPUT-----");
};

var getInputs = function (model) {
    var model = require(model);
    print({result: model.inputs});
};

var getOutputs = function (model) {
    var model = require(model);
    print({result: model.outputs});
};

var evaluate = function (model, data) {
    var model = require(model);
    readFile(data, function (dat) {
        var bi = dat.indexOf(BEGIN_MARKER);
        if (bi !== -1) { dat = dat.substring(bi + BEGIN_MARKER.length); }
        var ei = dat.indexOf(END_MARKER);
        if (ei !== -1) { dat = dat.substring(0, ei); }
        var json = JSON.parse(dat);
        print({result: model.evaluate(json)});
    });
};

var usage = function (argv) {
    console.log("Usage: evaluator getInputs <model>             # print the model's inputs");
    console.log("       evaluator getOutputs <model>            # print the model's outputs");
    console.log("       evaluator evaluate <model> <datasource> # run an evaluation");
    console.log("Input and output values are sample data which constitutes a \"unknown\" values");
    console.log("`evaluator getInputs | evaluator evaluate` will run an evaluation on " +
                "entirely fake data and the result should be a clear \"I don't know\"");
};

var main = function (argv) {
    var arg3 = argv.pop();
    var arg2 = argv.pop();
    var arg1 = argv.pop();
    if (arg1 === 'evaluate') { return evaluate(arg2, arg3); }
    if (arg2 === 'getInputs') { return getInputs(arg3); }
    if (arg2 === 'getOutputs') { return getOutputs(arg3); }
    return usage(argv);
};
main(process.argv);
