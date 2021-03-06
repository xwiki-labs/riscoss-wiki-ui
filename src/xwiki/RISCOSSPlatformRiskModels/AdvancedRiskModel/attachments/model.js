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
var inputs = module.exports.inputs = { };
var mkInput = function (type, def, name) { inputs[name] = { type: type, value: def }; };

mkInput("NUMBER", 0, "UseCase:StrategyInitiative");
mkInput("NUMBER", 0, "UseCase:SkillRel");
mkInput("NUMBER", 0, "UseCase:StrategyAcquisition");
mkInput("NUMBER", 0, "UseCase:StrategyIntegration");
mkInput("NUMBER", 0, "UseCase:CurrentSupply");
mkInput("NUMBER", 0, "UseCase:StrategyFork");
mkInput("NUMBER", 0, "UseCase:CurrentSupply");
mkInput("NUMBER", 0, "UseCase:SkillComm");
mkInput("NUMBER", 0, "UseCase:SkillPatch");
mkInput("NUMBER", 0, "UseCase:SkillLegal");
mkInput("NUMBER", 0, "UseCase:StrategyNone");

mkInput("NUMBER", 0, "OSSComp:github:repo:contributors");
mkInput("NUMBER", 0, "OSSComp:github:repo:size");
mkInput("NUMBER", 0, "OSSComp:github:repo:watchers");
mkInput("NUMBER", 0, "OSSComp:github:repo:open_issues_count");
mkInput("NUMBER", 0, "OSSComp:github:repo:has_wiki");
mkInput("NUMBER", 0, "OSSComp:github:repo:stargazers_count");
mkInput("NUMBER", 0, "OSSComp:github:repo:subscribers_count");
mkInput("NUMBER", 0, "OSSComp:github:repo:created_at");
mkInput("NUMBER", 0, "OSSComp:github:repo:license");
mkInput("NUMBER", 0, "OSSComp:github:repo:updated_at");
mkInput("NUMBER", 0, "OSSComp:github:repo:forks_count");
mkInput("NUMBER", 0, "OSSComp:github:repo:closed_issues");
mkInput("NUMBER", 0, "OSSComp:github:repo:ci_link");

var outputs = module.exports.outputs = { };
var mkOutput = function (type, def, name) { outputs[name] = { type: type, value: def }; };
var FAKE_NOTICE = "Totally Fake Risk (model coming soon!)";

mkOutput("NUMBER", 0.5, FAKE_NOTICE);

module.exports.evaluate = function (inputs) {
    var out = {};
    out[FAKE_NOTICE] = { type: "NUMBER", value: 123 };
    return out;
};
