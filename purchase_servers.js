/** @param {NS} ns **/
export async function main(ns) {
	var ram = ns.args[0];
	var hack_target = ns.args[1];
	//USAGE: to hack n00dles using 64 gb servers..
	//run purchase_servers.js 64 "n00dles"

	// Iterator we'll use for our loop
	var i = 0;
  //Delete old servers
	var purchased_servers = ns.getPurchasedServers();
	for (var i = 0; i < purchased_servers.length; ++i) {
		var psrv = purchased_servers[i];
		ns.killall(psrv);
		ns.deleteServer(psrv);
	}

	i = 0;
	// Continuously try to purchase servers until we've reached the maximum
	// amount of servers
	while (i < ns.getPurchasedServerLimit()) {
		// Check if we have enough money to purchase a server
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {

			// If we have enough money, then:
			//  1. Purchase the server
			//  2. Copy our hacking script onto the newly-purchased server
			//  3. Run our hacking script on the newly-purchased server with 3 threads
			//  4. Increment our iterator to indicate that we've bought a new server
			var hostname = ns.purchaseServer("pserv-" + i, ram);
			await ns.scp("hack-template.js", hostname);
			var ram_usage = ns.getScriptRam("hack-template.js", hostname);
			var max_ram = ns.getServerMaxRam(hostname);
			var str_max_instances = max_ram / ram_usage;
			var int_max_instances = parseInt(str_max_instances);
			ns.exec("hack-template.js", hostname, int_max_instances, hack_target);
			ns.getPurchasedServers()

			++i;
		}
	}
}
