$(document).ready(function () {
    $(document).foundation();
    $('#va-accordion').vaccordion({
		accordionW		: $(window).width(),
		accordionH		: $(window).height(),
		visibleSlices	: 3,
		expandedHeight	: 750,
		animOpacity		: 1,
		contentAnimSpeed: 100
	});
});