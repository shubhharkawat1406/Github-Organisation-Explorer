// import fetch from "./node_modules/node-fetch";

const tokenData = {
    "token": "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",
    "username": "shubhharkawat1406"
}

let repoQuery = {
    "query":`
    {
        viewer {
            login
        }
        repository(name: "material-design-icons", owner: "google") {
            forks(orderBy: {field: CREATED_AT, direction: ASC}, first: 10) {
            nodes {
                nameWithOwner
                createdAt
            }
            }
        }
    }
    `
};

const baseUrl = "https://api.github.com/graphql"

const headers = {
    "Content-Type": "application/json",
    Authentication: "bearer " + tokenData["token"]
}

const orgNameEl = document.getElementById('organisation-el');
const nEl = document.getElementById('n-el'); // n most popular repos, based on number of forks
const mEl = document.getElementById('m-el'); // m oldest forks
const fetchBtn = document.getElementById('fetch-btn');
const resultsEl = document.getElementById('results');
const olEl = document.getElementById('ol-el');
const fetchForkersBtn = document.getElementById('fetchForkers-btn');
const url = "https://api.github.com"

fetchBtn.addEventListener('click', function(){
    let orgName = orgNameEl.value;
    let n = nEl.value;
    let m = mEl.value;

    fetchRepo(orgName, m, n);

})

function fetchForkers(i, repo, m){

}


async function fetchRepo(org, m, n){
    let urlOrg = url + "/search/repositories?q=user:" + org + "&sort=forks&order=desc&per_page=100";
    if (n>100){
        urlOrg = urlOrg + "&page=" + Math.floor(n/100)+1;
    }
    const response = await fetch(urlOrg);
    const result = await response.json();

    console.log(result);
    let count=0;
    let content = "";
    let repos = []
    if (result){
        result.items.forEach(i => {
            if (count < n) {
                content += `
                    <li id="li">
                        <a href='${i.html_url}' >
                            ${i.full_name}
                        </a>
                        <br>
                        <div class="forkers">
                            <input type="submit" class="input-btn" value="Forkers" id="fetchForkers-btn">
                        </div>
                        <br>
                    </li>
                    `;
                    repos.push(i.full_name)
            };
            count++;
        })
    }
    olEl.innerHTML = content
}
