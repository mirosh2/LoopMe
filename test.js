	const range = document.getElementById("range");
	const animation = document.getElementById("animation");
	const advText = document.getElementById("advText");
	const video = document.getElementById("video_container");
	const flash = document.getElementById("flash");
	const sim = document.getElementById("sim");
	
	let youTubeVideo,
	rainDrops = [],
	isRaining,
	rainCount = 0;
	
	range.value = 0;
	flash.style.display = 'none';
	sim.style.display = 'none';

	function onYouTubeIframeAPIReady() {
		youTubeVideo = new YT.Player('video', {
			height: '200',
			width: '380',
			playerVars: { 'autoplay': 0, 'controls': 1, 'showinfo': 0, 'rel': 0},
			videoId: '9xKR8Vcjias',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerFinished
			}
		});
	}

	function onPlayerReady() {
		youTubeVideo.mute();
		youTubeVideo.playVideo();
	}

	function onPlayerFinished(state) {
		if(state.data === 0)
			youTubeVideo.playVideo();
	}


	function startRain() {
		rainDrops = [];
		for (let i=0;i<60; i++) {
			const randomDrop = Math.floor(Math.random()*4+1);

			let style = {};
			switch (randomDrop) {
				case 1: {
					style.width =  "30px";
					style.heigth = "28px";
					break;
				}
				case 2: {
					style.width = "15px";
					style.heigth = "23px";
					break;
				}
				case 3: {
					style.width = "22px";
					style.heigth = "19px";
					break;
				}
				case 4: {
					style.width = "15px";
					style.heigth = "24px";
					break;
				}
			}
			const rainDrop = {
				element: document.createElement('div'),
			}
			rainDrop.element.style.width = style.width;
			rainDrop.element.style.height = style.heigth;
			rainDrop.element.style.position = "absolute";
			rainDrop.element.style.top = Math.floor(Math.random()*221+1)+ "px";
			rainDrop.element.style.left = Math.floor(Math.random()*514+1)+ "px";
			rainDrop.element.style.backgroundImage = `url('images/raindrop_${randomDrop}.png')`;
			rainDrop.element.className = "drop";
			rainDrops.push(rainDrop);
		}
		rainCount = 0;
		isRaining = setInterval(function() {
			if (rainCount < rainDrops.length)
				animation.appendChild(rainDrops[rainCount].element);
			rainCount++;
			if (rainCount > 20 && rainDrops[rainCount])
				animation.removeChild(rainDrops[rainCount-20].element);
			if (rainCount === rainDrops.length)
				while (animation.firstChild)
					animation.removeChild(animation.firstChild);
			}, 350)


	}

	function stopRain() {
		rainCount = rainDrops.length;
		clearInterval(isRaining);
		while (animation.firstChild)
			animation.removeChild(animation.firstChild);
	}

	const handleRangeChange = function() {
		const currentView = range.value;

		if (currentView == 0 ) { 
			video.style.display = 'block';
			youTubeVideo.playVideo();
		}
		else { 
			video.style.display = 'none';
			youTubeVideo.pauseVideo();
		}

		if (currentView < 4 || currentView > 15) {
			stopRain();
		}

		if (currentView >= 0 && currentView <=15 ) {
			advText.src = "images/T_Text1.png";
			if (currentView == 4 || currentView == 15)
				startRain();
		}

		if (currentView > 15 && currentView <=30 ) {
			advText.src = "images/T_Text2.png";
			if (currentView > 20 && currentView <=25 )
				flash.style.display = 'block';
			else flash.style.display = 'none';
		}

		if (currentView > 30 && currentView <=45 )
			advText.src = "images/T_Text3.png";

		if (currentView > 45 && currentView <=58 )
			advText.src = "images/T_Text4.png";

		if (currentView == 59 )
			sim.style.display = 'block';
		else sim.style.display = 'none';

		animation.style.backgroundPositionY = (-range.value * 221) + "px";

}

range.addEventListener("input", function() {
	handleRangeChange();
	range.addEventListener("change", handleRangeChange);

});
range.addEventListener("change", function() {
	handleRangeChange();
	range.removeEventListener("input", handleRangeChange);

});


