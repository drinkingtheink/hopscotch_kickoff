(function (state, element_id, placement_direction, tour_title, tour_description) {
	var obsv_view_model = state.view_model;
	var placement_direction = placement_direction || "left";
	var tour_title = tour_title || "Check this out!"
	var tour_description = tour_description || "Pay attention to this feature, it is very useful."

	if (typeof (obsv_view_model) === 'function') {
		//view_model is available...do the things!

		var currentCookie = getCookie(tour_title);

		// Is there already a cookie for Subscribe to Question?
		if (currentCookie === null) {
			// cookie nonexistant, so DO TOUR -->

			// Subscribe to Questions Tour scaffold...
			var tour = {
				id: tour_title,
				steps: [{
					title: tour_title,
					content: tour_description,
					target: element_id,
					placement: placement_direction
				}]
			};

			// Start the tour
			hopscotch.startTour(tour);

			// Set cookie on DONE click
			var done_button = document.querySelector('.hopscotch-actions button');
			if (done_button) {
				done_button.addEventListener("click", function () {
					var now = new Date();
					now.setTime(now.getTime() + 1 * 3600 * 1000);
					document.cookie = tour_title + "=true; expires=" + now.toUTCString() + "; path=/";
				});
			}

			// Stop the tour if user doesn't close it...
			window.onbeforeunload = function () {
				hopscotch.endTour();
			};
			window.onpopstate = function () {
				hopscotch.endTour();
			};

			// Stop the tour if user clicks anchor (navigates away)...  
			var anchors = document.getElementsByTagName('a');
			for (var i = 0, len = anchors.length; i < len; i++) {
				anchors[i].onclick = function () {
					window.hopscotch.endTour();
				};
			}
		} else {
			// cookie exists so NO TOUR
		}

	} else {
		//view_model is not available...do no things
	}

	function getCookie(name) {
		var dc = document.cookie;
		var prefix = name + "=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) {
			begin = dc.indexOf(prefix);
			if (begin !== 0) return null;
		} else {
			begin += 2;
			var end = document.cookie.indexOf(";", begin);
			if (end == -1) {
				end = dc.length;
			}
		}
		return unescape(dc.substring(begin + prefix.length));
	}

})(window.state, element_id, placement_direction, tour_title, tour_description);
