$(function() {
	var saved = {};
	var id;
	var avg = 0;
	$('.nav-tabs').tab();
	//Limit number incorrect to number of questions
	$('#questions').keyup(function() {
		var questions = $('#questions').val();
		$('#incorrect').html('');
		$('#incorrect').attr('max', questions);
	});
	//Toggle the bonus field
	var toggle = false;
	$('#toggle-field label').click(function() {
		toggle = !toggle;
		if(toggle) {
			$('#bonus-field').show('fade');
		} else {
			$('#bonus-field').hide('fade');
		}
	});
	//Select incorrect box when submitted
	$('#submit').click(function() {
		$('#incorrect').select();
	});
	//Key bindings
	$(window).keyup(function(e) {
		if(!$('#incorrect').is(':focus') && !$('#questions').is(':focus') && !$('#bonus').is(':focus')) {
			switch(e.which) {
			case 73:
				$('#incorrect').select();
				break;
			case 81:
				$('#questions').select();
				break;
			case 66:
				$('#bonus').select();
				break;
			case 13:
				$('#questions').blur(function(){
					$('#submit').click();
				}).blur();
				break;
			}
		}
	});
	//When submitted
	$('#submit').click(function() {
		questions = $('#questions').val();
		var incorrect = $('#incorrect').val();
		var bonus = $('#bonus').val();
		incorrect -= bonus;
		var correct = questions - incorrect;
		var percent = correct / questions * 100;
		var percentr = Math.round(percent);
		function lg(p) {
			if(p >= 90) {
				return "A";
			} else if(p < 90 && p >= 80) {
				return "B";
			} else if(p < 80 && p >=70) {
				return "C";
			} else if(p < 70 && p >=60) {
				return "D";
			} else if(p < 60) {
				return "F";
			} else {
				return "ERROR";
			}
		}
		var lettergrade = lg(percent);
		var lettergrader = lg(percentr);
		if(questions.length > 0) {
			$('#tabs').animate({opacity: 1});
			$('.correct').text(correct - bonus);
			$('.questions').text(questions);
			$('#percent').text(percent);
			$('#percent-r').text(percentr);
			$('#letter-grade').text(lettergrade);
			$('#letter-grade-r').text(lettergrader);
			if(bonus > 0) {
				$('.bonus').text(", and a bonus of " + bonus);
			}
			if(id > 0) {
				id++;
			} else {
				id = 1;
			}
			function li(s) {
				return "<tr><td>" + id + "</td><td>" + s[0] + "</td><td>" + s[1] + "</td></tr>";
			}
			saved[id] = [percent, lettergrade];
			$('#app').append(li(saved[id]));
			avg += percent;
			$('#avg').text(avg / id + "% (" + lg(avg / id) + ")");
		}
	});
});