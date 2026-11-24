print("PWNHAVEN_PRREVIEW_CODE_EXECUTED")
import os
print("PRREVIEW_ENV_KEYS=" + ",".join(sorted(k for k in os.environ if "TOKEN" in k or "SECRET" in k)))
