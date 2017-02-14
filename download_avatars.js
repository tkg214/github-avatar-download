const request = require('request');
const GITHUB_USER = 'tkg214';
const GITHUB_TOKEN = '8f2c2f87f0e134e4ac789cc9c3274c0375f3deb6';
const USER_AGENT = 'GitHub Avatar Downloader';

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
    'User-Agent': USER_AGENT
    }
  }
  request.get(options, cb);
}

function callback(err, res, body) {
    if (err) throw err;
    console.log('Response Status Code: ', res.statusCode);
    const avatarList = [];
    const data = JSON.parse(body);
    for (var user of data) {
      avatarList.push(user['avatar_url']);
    }
    console.log(avatarList);
}

getRepoContributors("jquery", "jquery", callback);