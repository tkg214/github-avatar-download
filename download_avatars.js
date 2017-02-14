const request = require('request');
const fs = require('fs')
const GITHUB_USER = 'tkg214';
const GITHUB_TOKEN = '8f2c2f87f0e134e4ac789cc9c3274c0375f3deb6';
const USER_AGENT = 'GitHub Avatar Downloader';

const REPO_OWNER = process.argv[2];
const REPO_NAME = process.argv[3];

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
    const data = JSON.parse(body);
    for (var user of data) {
      const newPath = 'downloads/' + user.login+ '.jpg';
      const avatarURL = user.avatar_url;
      downloadImageByURL(avatarURL, newPath);
    }
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('Download completed in', filePath);
    })
    .pipe(fs.createWriteStream(filePath), console.log('Downloading', url, 'to', filePath));
}

if (REPO_OWNER === true && REPO_NAME === true) {
  getRepoContributors(REPO_OWNER, REPO_NAME, callback);
} else {
  console.log('Please enter two valid inputs.')
}
