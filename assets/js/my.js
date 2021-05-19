function computedHeight(elt) {
	return document.defaultView.getComputedStyle(elt).height;
}

function evenHeight(class_name) {
	var elts = document.getElementsByClassName(class_name);
	var heights = [];
	for(var i=0; i<elts.length; ++i) {
		heights.push(Number(computedHeight(elts[i]).slice(0,-2)));
	}

	var max_height = Math.max(...heights);
	for(var i=0; i<elts.length; ++i) {
		elts[i].style.height = max_height + "px";
	}
}

window.setTimeout(function() {
	evenHeight("published-research-title");
	evenHeight("major-project-title");
	evenHeight("other-project-title");
}, 0);