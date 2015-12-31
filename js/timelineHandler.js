var dataSize = 0;

function setTimelineViewType() {
	var type = document.getElementById('viewType').value;
	
	var range = timeline.getWindow();
	var interval = range.end - range.start;
	
	var today = new Date();
	
	var day = document.getElementById('viewDay').value;
	
	if (type=="month") {
		var zoomOption = {
			zoomMin : 1000 * 60 * 60 * 24 * 30 * 12,
			zoomMax : 1000 * 60 * 60 * 24 * 30 * 12
		};
		timeline.setOptions(zoomOption);
		if (!day) timeline.moveTo(today, {}); else timeline.moveTo(new Date(day));
	}
	else if (type=="day") {
		var zoomOption = {
			zoomMin : 1000 * 60 * 60 * 24 * 7,
			zoomMax : 1000 * 60 * 60 * 24 * 7
		};
		timeline.setOptions(zoomOption);
		if (!day) timeline.moveTo(today, {}); else timeline.moveTo(new Date(day));
	}
	else if (type=="hour") {
		var zoomOption = {
			zoomMin : 1000 * 60 * 60 * 24,
			zoomMax : 1000 * 60 * 60 * 24
		};
		timeline.setOptions(zoomOption);
		if (!day) timeline.moveTo(today, {}); else timeline.moveTo(new Date(day));
	}
	else {
		var zoomOption = {
			zoomMin : 10,
			zoomMax : 1000 * 60 * 60 * 24 * 365 * 10000
		};
		timeline.setOptions(zoomOption);
		if (!day) timeline.moveTo(today, {}); else timeline.moveTo(new Date(day));
	}
}

function setTimelineViewDay() {
	var day = document.getElementById('viewDay').value;
	if (day) {
		var date = new Date(day);
		timeline.moveTo(date, {});
	}
}

function generateRandomString(length, format) {
	var charSet = '';
	if (format.indexOf('a') > -1) charSet += 'abcdefghijklmnopqrstuvwxyz';
	if (format.indexOf('A') > -1) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (format.indexOf('1') > -1) charSet += '0123456789';
	if (format.indexOf('#') > -1) charSet += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
	
	var result = '';
	for (var i = 0; i < length; ++i) result += charSet[Math.round(Math.random() * (charSet.length - 1))];
	
	return result;
}

function generateRandomContent() {
	var contentArray = [
		'Low traffic',
		'Medium traffic',
		'High traffic'
	];
	var randomIndex = Math.floor(Math.random() * contentArray.length);
	
	return contentArray[randomIndex];			
}

function generateRandomGroup() {
	var contentArray = [
		'low',
		'medium',
		'high'
	];
	var randomIndex = Math.floor(Math.random() * contentArray.length);
	
	return contentArray[randomIndex]; 
}

function generateRandomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateTimelineData() {
	dataSize += 1;

	items.add([{
		id: dataSize,
		content: generateRandomContent(),
		start: new Date(),//generateRandomDate(new Date(2015, 0, 1), new Date()),
		end: new Date(new Date().getTime() + 1000),
		type: 'background',
		className: generateRandomGroup()
	}]);
	
	console.log(items);
	
	timeline.setItems(items);
	
	timeline.moveTo(new Date(), {});
}

/*function updateTimelineData() {
	$.ajax({
		url: 'resources/TimelineData.json',
		success: function (data) {
			timeline.setItems(new vis.DataSet(data));
		},
		error: function (err) {
			console.log('Error', err);
			if (err.status === 0) {
				alert('Failed to load data/basic.json.\nPlease run this example on a server.');
			}
			else {
				alert('Failed to load data/basic.json.');
			}
		}		
	});
}*/