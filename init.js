/** @param {NS} ns **/
function findMaxInstances(ns, srv, scrp) {
	ns.print('found them!')
	var ram_usage = ns.getScriptRam(scrp, srv);
	var max_ram = ns.getServerMaxRam(srv);
	var str_max_instances = max_ram / ram_usage;
	var int_max_instances = parseInt(str_max_instances);
	return int_max_instances;
}
async function prepServer(ns, srv) {
	ns.killall(srv);
	while ((ns.getServerUsedRam(srv) + ns.getServerMaxRam(srv)) < ns.getServerMaxRam(srv)) {
		await ns.sleep(1000);
	}
}
async function hackServer(ns, scrp, list_of_servers, server_to_hack) {
	ns.print(list_of_servers)
	for (var i = 0; i < list_of_servers.length; ++i) {
		var serv = list_of_servers[i];
		//Copy the script and get root
		await ns.scp(scrp, serv);
		if (!ns.hasRootAccess(serv)) {
			var ports_req = ns.getServerNumPortsRequired(serv)
			if (ports_req > 0) {
				ns.brutessh(serv);
			}
			if (ports_req > 1) {

				ns.ftpcrack(serv);
			}
			if (ports_req > 2) {

				ns.relaysmtp(serv);
			}
			if (ports_req > 3) {

				ns.httpworm(serv);
			}
			if (ports_req > 4) {

				ns.sqlinject(serv);
			}
			ns.nuke(serv);
		}
		await prepServer(ns, serv);
		var int_max_instances = findMaxInstances(ns, serv, scrp)
		if (int_max_instances > 0) {
			ns.exec(scrp, serv, int_max_instances, server_to_hack);
		}
	}
}
export async function main(ns) {
	// Array of all servers that don't need any ports opened
	// to gain root access. 
	var servers0Port = ["n00dles", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea",
		"harakiri-sushi", "foodnstuff"];

	// Array of all servers that only need 1 port opened
	// to gain root access. 
	var servers1Port = ["neo-net", "zer0", "max-hardware", "iron-gym"];

	// Array of all servers that only need 2 port opened
	// to gain root access. 
	var servers2Port = ["silver-helix", "phantasy", "omega-net", "crush-fitness", "avmnite-02h",
		"the-hub"];

	// Array of all servers that only need 2 port opened
	// to gain root access. 
	// TODO add more
	var servers3Port = ["rothman-uni", "I.I.I.I", "summit-uni", "catalyst", "rho-construction",
		"millenium-fitness", "netlink"];
	//4 port servers
	var servers4Port = ["aevum-police", "global-pharm", "unitalife", "univ-energy", "alpha-ent",
		"lexo-corp", "run4theh111z", "."];

	var servers5Port = ["zb-institute", "omnia", "solaris", "microdyne", "fulcrumtech", "helios",
		"vitalife", "powerhouse-fitness", "blade", "omnitek", "titan-labs"];


	let script_to_run = "hack-template.js";
	let to_hack = ns.args[0];

	await hackServer(ns, script_to_run, servers0Port, to_hack);

	// Wait until we have BruteSSH beforewe kick off the 1 ports
	while (!ns.fileExists("BruteSSH.exe")) {
		await ns.sleep(60000);
	}
	await hackServer(ns, script_to_run, servers1Port, to_hack);

	// Wait until we have FTPCrack beforewe kick off the 2 ports
	while (!ns.fileExists("FTPCrack.exe")) {
		await ns.sleep(60000);
	}
	await hackServer(ns, script_to_run, servers2Port, to_hack);

	// Wait until we have relaySMTP before we kick off the 3 ports
	while (!ns.fileExists("relaySMTP.exe")) {
		await ns.sleep(60000);
	}
	await hackServer(ns, script_to_run, servers3Port, to_hack);

	// Wait until we have HTTPWorm before we kick off the 4 ports
	while (!ns.fileExists("HTTPWorm.exe")) {
		await ns.sleep(60000);
	}
	await hackServer(ns, script_to_run, servers4Port, to_hack);

	// Wait until we have SQLInject before we kick off the 5 ports
	while (!ns.fileExists("SQLInject.exe")) {
		await ns.sleep(60000);
	}
	await hackServer(ns, script_to_run, servers5Port, to_hack);
}
