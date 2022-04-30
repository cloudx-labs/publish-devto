FROM node:16-alpine
RUN apk --no-cache add git

# Fix the unsafe repo error which was introduced by the CVE-2022-24765 git patches
RUN git config --global --add safe.directory /github/workspace

COPY dist dist
ENTRYPOINT [ "node", "/dist/index.js" ]
