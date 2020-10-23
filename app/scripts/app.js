(function(document) {
	'use strict';

	// Grab a reference to our auto-binding template
	// and give it some initial binding values
	// Learn more about auto-binding templates at http://goo.gl/Dx1u2g
	var app = document.querySelector('#app');

	// Sets app default base URL
	app.baseUrl = '/';

	// app.displayInstalledToast = function() {
	// 	// Check to make sure caching is actually enabled—it won't be in the dev environment.
	// 	if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
	// 		Polymer.dom(document).querySelector('#caching-complete').show();
	// 	}
	// };

	// Listen for template bound event to know when bindings
	// have resolved and content has been stamped to the page
	app.addEventListener('dom-change', function() {
		// console.log('Our app is ready to rock!');
	});

// See https://github.com/Polymer/polymer/issues/1381
	window.addEventListener('WebComponentsReady', function() {
		var scrollHeaderPanel = document.querySelector('paper-scroll-header-panel');
		var scrollThreshold = document.querySelector('#scrollThreshold');
		var arrowUp = document.querySelector('#arrowUp');
		var firebaseLogin = document.querySelector("#firebaseLogin");
		var container = document.querySelector('.container');

		/* background for toolbar when it is at its full size */
		var header = document.querySelector('#headerBg');
		var condensedHeader = document.querySelector('#condensedHeaderBg');

		header.style.backgroundImage='url'+'('+app.baseUrl+'images/header.jpg'+')';
		condensedHeader.style.backgroundImage='url'+'('+app.baseUrl+'images/header2.jpg'+')';
		scrollThreshold.scrollTarget = scrollHeaderPanel.scroller;
		arrowUp.hidden = true;
		scrollHeaderPanel.addEventListener('content-scroll', function() {
			if (scrollThreshold._scrollTop > 192) {
				arrowUp.hidden = false;
			} else {
				arrowUp.hidden = true;
			}
		});
	});

	// Main area's paper-scroll-header-panel custom condensing transformation of
	// the appName in the middle-container and the bottom title in the bottom-container.
	// The appName is moved to top and shrunk on condensing. The bottom sub title
	// is shrunk to nothing on condensing.
	window.addEventListener('paper-header-transform', function(e) {
		var appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
		var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
		var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
		var detail = e.detail;
		var heightDiff = detail.height - detail.condensedHeight;
		var yRatio = Math.min(1, detail.y / heightDiff);
		// appName max size when condensed. The smaller the number the smaller the condensed size.
		var maxMiddleScale = 0.50;
		var auxHeight = heightDiff - detail.y;
		var auxScale = heightDiff / (1 - maxMiddleScale);
		var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
		var scaleBottom = 1 - yRatio;
		// Move/translate middleContainer
		//Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);
		Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', middleContainer);
		middleContainer.style.opacity=1-yRatio;

		// Scale bottomContainer and bottom sub title to nothing and back
		//Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

		// Scale middleContainer appName
		Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
	});

	app.closeDrawer = function() {
		app.$.paperDrawerPanel.closeDrawer();
	};

	app.refreshApp = function() {
		location.reload();
	};

	// Scroll page to top and expand header
	app.scrollPageToTop = function() {
		app.$.headerPanelMain.scrollToTop(true);
	};

	app.showArrow = function() {
		this.async(function () {
			scrollThreshold.clearTriggers();
		});
	}

	app.openSearchDialog = function() {
		app.$.searchDialog.open();
	}

// Polymerfire
	app.error = null;

	app.signIn = function() {
		this.error = null;
		this.$.auth.signInWithPopup();
	};

	app.signOut = function() {
		this.error = null;
		this.$.auth.signOut();
	}
	app.showError = function(e) {
		this.error = e.detail;
		app.toggleAuthErrorToast();
	};
// End Polymerfire

	app.loginTap = function(e) {
		if (app.user) {
			app.signOut();
		} else {
			app.signIn();
		}
	};

	app.toggleAuthErrorToast = function() {
		this.$.authErrorToast.fitInto = this.$.pagesContainer;
		this.$.authErrorToast.toggle();
	}

	app._loadMoreData = function() {
		// this.limitToFirst += 1;
		// console.log('startAt -> ', this.startAt, 'limitToFirst -> ', this.limitToFirst, 'endAt -> ', this.endAt, 'limitToLast -> ', this.limitToLast);
		// document.$.ajax.generateRequest();
	};

})(document);
