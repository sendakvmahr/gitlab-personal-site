window.addEventListener ? 
window.addEventListener("load",startLoading,false) : 
window.attachEvent && window.attachEvent("onload",startLoading);

function startLoading() {

	var assetUrls = [ "https://github.githubassets.com/images/modules/site/home-illo-team.svg" ];
	var assets = {};
	var assetsLoading = assetUrls.length;

	for (let a in assetUrls) {
		var i = new Image;
		i.onload = imageCountdown;
	  	i.crossOrigin = "";
		i.src = assetUrls[a];
	}

	function main() {
		console.log("all pics loaded");
	}

	function imageCountdown() {
		assetsLoading--;
		if (assetsLoading === 0) {
			main();
		}
	}
}