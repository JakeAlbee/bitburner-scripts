/** @param {NS} ns **/
export async function main(ns) {
	var purchasedServersList = ns.getPurchasedServers()

	//Utilize our hacking template
	var script_to_run = "hack-template.js";
	//run restart_servers.js "comptek" etc.
	var hack_target = ns.args[0];

	for (var i = 0; i < purchasedServersList.length; ++i) {
		var serv = purchasedServersList[i];
		await ns.scp(script_to_run, serv);

		//Kill our threads and make sure they're dead
		ns.killall(serv);
		while ((ns.getServerUsedRam(serv) + ns.getServerMaxRam(serv)) < ns.getServerMaxRam(serv)) {
			await ns.sleep(1000);
		}
		var ram_usage = ns.getScriptRam(script_to_run, serv);
		var max_ram = ns.getServerMaxRam(serv);
		var str_max_instances = max_ram / ram_usage;
		var int_max_instances = parseInt(str_max_instances);

		ns.exec(script_to_run, serv, int_max_instances, hack_target);

	}
}
