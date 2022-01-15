# bitburner-scripts
My personal bitburner scripts
The way I run things...

1. hack-template.js is a basic hacking template that everything utilizes. It weakens, grows & hacks. I use it on my purchased servers and hacked servers.
2. home-hack.js is a script that only grows & hacks. Weaken takes *forever* so I let the huge amount of threads my home PC can run do the hacking & growing and not waste time weakening. I figure if it fails on a hack that's fine rather than spending like 20+ minutes weakening a server that is already at minimum security. Syntax is `run home-hack -t <however many threads> <server>` 
3. init.js is how I start all my stuff. It waits for the applicable files for opening servers i.e. it waits until you have BruteSSH.exe before trying to connect to servers that require you to run it. I run it by doing `run init.js <server-name, n00dles, iron-gym etc.>`. It kills the threads before it runs so I use it to restart all my hacked servers when I want to pick a new server. i.e. if it's already running on n00dles, I can just run `run init.js iron-gym` and it won't fail. Uses max ram possible
4. kill_servers.js deletes my purchased servers if necessary
5. monitor.js doesn't seem super accurate but i found it on reddit somewhere. `run monitor.js <server>` helps keep track of what's going on
6. opened_servers.js I don't use very often, another script I found online. Displays all the servers you've ovened
7. Purcahse servers lets me buy (and delete) servers. so `run purchase_servers.js <gb> <server_to_hack>` will kill and delete existing servers if you're trying to buy bigger ones.
8. restart_servers.js will kick restart the scripts on your servers using the server you plug in `run restart_servers.js <server>` 
