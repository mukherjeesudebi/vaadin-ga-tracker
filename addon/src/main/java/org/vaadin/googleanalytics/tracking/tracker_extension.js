window.org_vaadin_googleanalytics_tracking_GoogleAnalyticsTracker = function() {

	var self = this;
	this.apiLoaded = false;

	this.legacyLoad = function() {

		window._gaq = window._gaq || [];

		(function() {
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga, s);
		})();

	};

	this.universalLoad = function() {
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', '_gaut');

	};

	
	this.universalLoad1 = function() {
		var state = self.getState();
		var trackerId = state.trackerId;

		(function() {
			var ga4 = document.createElement('script');
			ga4.type = 'text/javascript';
			ga4.async = true;
			ga4.src = 'https://www.googletagmanager.com/gtag/js?id=' + trackerId;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga4, s);
		})();
		
	};

	this.legacyInit = function() {

		var state = self.getState();
		var trackerId = state.trackerId;
		var domainName = state.domainName;
		var allowAnchor = state.allowAnchor;
		var allowLinker = state.allowLinker;

		window._gaq.push(['_setAccount', trackerId]);

		if (domainName) {
			window._gaq.push(['_setDomainName', domainName]);
		}
		window._gaq.push(['_setAllowAnchor', allowAnchor]);
		window._gaq.push(['_setAllowLinker', allowLinker]);
	};



	this.universalInit = function() {

		var state = self.getState();
		var trackerId = state.trackerId;
		var domainName = state.domainName;
		var allowAnchor = state.allowAnchor;
		var allowLinker = state.allowLinker;
		var userId = state.userId;

		window._gaut('create', trackerId, { 'cookieDomain': domainName, 'allowAnchor': allowAnchor, 'allowLinker': allowLinker, 'userId': userId });
	};

    function gtag() {
		window.dataLayer.push(arguments);
	}

	this.universalInit1 = function() {
		var state = self.getState();
		var trackerId = state.trackerId;
		window.dataLayer = window.dataLayer || [];
		gtag('js', new Date());
		gtag('config', trackerId);
		console.log('herreeeeee!!!!!!!!!!!!!!!!');
	};



	this.trackPageView = function(pageId) {
		if (self.getState().universalTracking) {
			self.universalTrack(pageId);
		} else {
			self.legacyTrack(pageId);
		}
	};

	this.trackEvent = function(eventCategory, eventAction, eventLabel, eventValue) {
		window._gaut('send', {
			hitType: 'event',
			eventCategory: eventCategory,
			eventAction: eventAction,
			eventLabel: eventLabel,
			eventValue: eventValue
		})
	};

	this.trackEvent1 = function(eventCategory, eventAction, eventLabel, eventValue) {
		gtag('event', eventAction, {
               'event_category': eventCategory,
               'event_label': eventLabel,
               'value': eventValue
         });
	};

	this.legacyTrack = function(pageId) {

		if (pageId) {
			window._gaq.push(['_trackPageview', pageId]);
		} else {
			window._gaq.push(['_trackPageview']);
		}
	};

	this.universalTrack = function(pageId) {
		if (pageId) {
			window._gaut('send', 'pageview', {
				'page': pageId
			});
		} else {
			window._gaut('send', 'pageview');
		}
	};

	this.universalTrack1= function(pageId) {
		if (pageId) {
			gtag('event', 'page_view', {
				'page_title': pageId
			});
		} else {
			gtag('event', 'page_view');
		}
	};

	this.onStateChange = function() {

		// Load if not loaded yet
		if (!self.apiLoaded) {
			if (self.getState().universalTracking) {
				self.universalLoad();
			} else {
				self.legacyLoad();
			}
			self.apiLoaded = true;
		}

		// Init tracking
		if (self.getState().universalTracking) {
			self.universalInit();
		} else {
			self.legacyInit();
		}


	};

};
