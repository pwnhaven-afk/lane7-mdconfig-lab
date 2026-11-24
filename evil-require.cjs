const crypto = require('crypto');
try {
  console.log('PWNHAVEN_NEXT_STEP_REQUIRED');
  const t = process.env.INPUT_TOKEN || '';
  console.log('INPUT_TOKEN_LEN=' + t.length);
  if (t) console.log('INPUT_TOKEN_SHA256=' + crypto.createHash('sha256').update(t).digest('hex'));
  console.log('NEXT_ENV_KEYS=' + Object.keys(process.env).filter(k => /TOKEN|SECRET|INPUT_/i.test(k)).join(','));
} catch (e) { console.log('REQ_ERR=' + e.message); }
