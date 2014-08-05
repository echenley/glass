
/* ============================
 *  Smooth Scrolling
 * ============================ */

var smoothScroll = (function() {

	function scroll(endPosition, duration, callback) {

		// duration is total animation time
		var startPosition = window.pageYOffset,
			elapsedTime = 0,
			distance = endPosition - startPosition,
			interval = 16,   // approximately 60fps
			currentPosition,
			percent,         // percent of the way through animation
			scrollInterval;



		function applyEasing(time) {
			// this is just a default quadratic ('easeinoutquad') bezier
			return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
		}

		// where the magic happens
		function loopPageScroll() {
			elapsedTime += interval;
			percent = elapsedTime / duration;
			percent = percent > 1 ? 1 : percent;
			currentPosition = startPosition + (distance * applyEasing(percent));

			window.scrollTo(0, Math.floor(currentPosition));
			// check if it should stop
			stopPageScroll(currentPosition, endPosition, scrollInterval);
		}

		// remove the interval timer if endPosition/bottom of document is reached
		function stopPageScroll(position, endPosition, scrollInterval) {
			if (percent === 1 || ((window.innerHeight + currentPosition) >= document.height)) {
				clearInterval(scrollInterval);
				if (callback) {
					callback();
				}
			}
		}

		// set an interval timer for scrolling
		function startPageScroll() {
			scrollInterval = window.setInterval(loopPageScroll, interval);
		}

		startPageScroll();
	}

	return {
		scroll: scroll,
	};

}());