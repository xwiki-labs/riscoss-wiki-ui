XWikiObj(function (obj) {
    obj.setCache("long");
    obj.setCode("require(['jquery'],function($){\nfunction isGithubRepoURL(s) {\n   var regexp = /((^https:\\/\\/github.com{1}?)(\\/([\\w#!:.?+=&%@!\\-\\/]))+)?(\\.git$)/\n   return regexp.test(s);\n}\n\n$(function(){\n\nvar messages = {errorMsg:\"Please enter a valid Github repository URL.\",\"successMsg\":\"OK.\"}\n$('#githubRepo').on('input', function() {\n   var val = $(this).val();\n   $(\"#gitValidationStatus\").html(\"\");\n   if(!isGithubRepoURL(val)){\n     $(\"#gitValidationStatus\").css(\"color\",\"red\");\n     $(\"#gitValidationStatus\").html(messages.errorMsg);\n   }\n   else\n   {\n     $(\"#gitValidationStatus\").css(\"color\",\"green\");\n     $(\"#gitValidationStatus\").html(messages.successMsg);    \n   }\n});\n\n$(\"#githubsubmitbtn\").click(function(event) {\n   var githubRepoURL = $(\"#githubRepo\").val();\n   if(isGithubRepoURL(githubRepoURL)){\n     $(\"creategithubform\").get(0).submit();\n   }\n   else\n   {\n     $(\"#gitValidationStatus\").css(\"color\",\"red\");\n     $(\"#gitValidationStatus\").html(messages.errorMsg);\n   }\n   event.preventDefault();\n});\n\n});\n});");
    obj.setName("Validate the github rep URL");
    obj.setParse("");
    obj.setUse("onDemand");
});
