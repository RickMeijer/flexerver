# `node static.js $directory`

Simple static server with \$directory as the root.
Great to quickly serve up dist builds or indexes for demo

# `node websocket.js`

Simple websocket server that sends a message randomly

# `node proxy.js`

Simple proxy server that allow you to skip CORS errors.
Untested

# `node mock.js $remote_url $local_port?`

Simple proxy server that returns (json)mockdata stored in `./mocks/$remote_url/`
