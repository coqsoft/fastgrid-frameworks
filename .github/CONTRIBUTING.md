# Contributing

Contributions to the open-source wrappers, generators, documentation and
examples are welcome.

Before submitting a change:

1. Do not commit a registered `FGridE.js`, serial code, API key or customer data.
2. Keep the trial runtime clearly separated from MIT-licensed source code.
3. Build the affected wrapper.
4. run `npm pack --dry-run` for every affected public package;
5. install the generated tarball in a clean application;
6. update documentation and compatibility information;
7. add a changeset or release-note entry for user-visible changes.

The example Node servers are demonstrations for localhost development. They are
not production-ready application servers.
