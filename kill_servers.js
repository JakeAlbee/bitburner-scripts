/** @param {NS} ns **/
export async function main(ns) {
	var purchased_servers = ns.getPurchasedServers();
	for (var i = 0; i < purchased_servers.length; ++i) {
		var psrv = purchased_servers[i];
		ns.killall(psrv);
		ns.deleteServer(psrv);
	}
}
