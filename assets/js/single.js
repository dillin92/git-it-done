var issuesContainerEl = document.querySelector("issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

getRepoIssues = function(repo) {
    var apiUrl ="https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayIssues(data);

            // check if api has paginated issues
            if (response.headers.get("Link")) {
                displayWarning(repo);
            }
        });
    }else {
        alert("there was a problem with your request!");
    }
    });
    console.log(repo);
};

getRepoIssues("dillin92");

var displayIssues = function(issues) {

    if(issues.length === 0) {
        issuesContainerEl.textContent = "This repos has no open issues !";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank");

        // create span tohold issue title
        var titleEl = docuement.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issuesEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        //check if issues is an actual issue or a pull request
        if  (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }else {
            typeEl.textContent = "(Issue)";
        }
        
        // append to container
        issuesEl.appendChild(typeEl);

        //issue container
        issuesContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See Mopre Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};
