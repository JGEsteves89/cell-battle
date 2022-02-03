export default class Timer {
	public fps: number;
	public toStop: boolean = false;
	constructor() {
		this.fps = 0.0;
		this.toStop = false;
	}

	setFps(value: number) {
		this.fps = value;
	}

	startTimer(callbackFunction: (totalTime: number) => void) {
		let now = new Date().getTime();
		let lastTime = now;
		const setFps = this.setFps.bind(this);
		const that = this;
		function update(totalTime: number) {
			if (that.toStop) {
				return;
			}
			now = totalTime;
			const deltaTime = now - lastTime;
			lastTime = now;
			setFps((60 * 1000) / deltaTime);
			//document.getElementById('debug').innerText = `Version C024 - ${Math.floor((60 * 1000) / deltaTime)} FPS`;
			callbackFunction(deltaTime);
			requestAnimationFrame(update);
		}
		update(0);
	}
	stop() {
		this.toStop = true;
	}
}
