$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list"),
		clicks = ASQ.csp.chan(),
		msgs = ASQ.csp.chan(),
		queuedClick;

	$btn.click(listenToClicks);

	// run the two go routines
	ASQ().runner(
		ASQ.csp.go(sampleClicks),
		ASQ.csp.go(logClick)
	);

	function listenToClicks(evt) {
		if(!queuedClick) {
			// don t want any more clicks until
			// i'll process the previous ones (back pressure)
			queuedClick = ASQ.csp.putAsync(clicks, evt);
			queuedClick.then(function () {
				queuedClick = null;
            });
		}
    }

	// setup sampling go-routine and
	// channel, populate $list
	function* sampleClicks() {
		while (true) {
			yield ASQ.csp.take(ASQ.csp.timeout(1000));
			yield ASQ.csp.take(clicks);
			yield ASQ.csp.put(msgs, "clicked!");
		}
    }

    function* logClick() {
		while (true) {
			var msg = yield ASQ.csp.take(msgs);
			$list.append($("<div>" + msg + "</div>"));
		}
    }
});
