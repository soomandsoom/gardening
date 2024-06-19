class Box {
	constructor(x, y, w, h, id) {
		this.x = x * size;
		this.y = y * size;
		this.w = w * size;
		this.h = h * size;
		this.c = color("#ffffe9");
		this.idx = id;

		this.imgSequence = imgs[id];
		this.imgIndex = 0; // 현재 재생 중인 이미지 번호

		this.playing = false; //이미지 재생 on/off
		this.lastplaying = false; //sketch.js의 313 참고

		this.hover = false;
		this.again = false;

		if (this.w < this.h) {
			//세로
			this.style = 1;
		} else {
			//가로
			this.style = 2;
		}

		this.startFrame = 0;
		this.middleFrame = 33;
		this.endFrame = 72;
	}

	display() {
        this.over();

		//이미지 재생 안 할 때 보여지는 칸
		fill(this.c);
		rect(this.x, this.y, this.w, this.h);
		if (this.style == 1) {
			//세로칸
			for (let i = 0; i < this.h / size; i++) {
				line(this.x, this.y + size * i, this.x + size, this.y + size * i);
			}
		} else {
			//가로칸
			for (let i = 0; i < this.w / size; i++) {
				line(this.x + size * i, this.y, this.x + size * i, this.y + size);
			}
		}
	}

    //this.playing = true 만드는 함수
	play() { 
		this.playing = true;
		correct++;
		correctsound.play();
		//print("correct: ", correct);
	}

    //this.lastplaying = true 만드는 함수
	letsgo() {
		this.lastplaying = true;
	}

    //이미지 재생
	playimg() {
		if (this.style == 1) { //세로
			if (this.playing == true) {
				let img = this.imgSequence[this.imgIndex];
				image(img, this.x, this.y, this.w, this.h);

				// 이미지 변경 간격 조정 챗지피티에게 물어봄
                // 프레임 멈췄다가 재생하게 하는 코드 구조는 혼자 고민
				if (
					frameCount % frameDelay === 0 &&
					this.imgIndex >= this.startFrame &&
					this.imgIndex <= this.endFrame
				) {
					this.imgIndex++;

					if (this.imgIndex >= this.middleFrame) {
						if (this.lastplaying == false) { //세로칸만 채워지면
							this.imgIndex = this.middleFrame - 1; // 중간 프레임에서 중지
							this.check(0);
						} else { //가로칸까지 채워지면
							if (this.imgIndex >= this.endFrame) { //마지막 프레임 유지
								this.imgIndex = this.endFrame - 1;
                                this.check(0);
							}
						}
					}
				}
			}
		} else { //가로
			if (this.playing == true) {
				let img = this.imgSequence[this.imgIndex];
				image(img, this.x, this.y, this.w, this.h);

				if (frameCount % frameDelay === 0) {
					this.imgIndex++;
					if (this.imgIndex >= this.imgSequence.length) {
						this.imgIndex = this.imgSequence.length - 1; // 마지막 프레임 유지
						this.check(0);
					}
				}
			}
		}

		//이미지 위에 칸 라인만 덮기
		noFill();
		rect(this.x, this.y, this.w, this.h);
		if (this.style == 1) {
			//세로칸
			for (let i = 0; i < this.h / size; i++) {
				line(this.x, this.y + size * i, this.x + size, this.y + size * i);
			}
		} else {
			//가로칸
			for (let i = 0; i < this.w / size; i++) {
				line(this.x + size * i, this.y, this.x + size * i, this.y + size);
			}
		}
	}

    //호버 감지
	over() { 
		if (
			mouseX > this.x &&
			mouseX < this.x + this.w &&
			mouseY > this.y &&
			mouseY < this.y + this.h
		) {
			this.hover = true;
		} else {
			this.hover = false;
			this.again = false;
		}
	}

    //호버 시 이미지 다시 재생하는 함수
	check(frame) { 
		if (this.hover == true && this.again == false) {
			this.imgIndex = frame;
			print(this.imgIndex);
			this.again = true;
		}
	}
}
