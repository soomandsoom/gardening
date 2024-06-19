class Answer {
	//daneil shiffman - draggable class 코드 참고 (https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88)
	constructor(x, y, text, id) {
        //초기 위치값
		this.firstx = x; 
		this.firsty = y;
    
		this.x = this.firstx;
		this.y = this.firsty;
		this.text = text;
		this.index = id;

        //표지판 크기
		this.w = 130;
		this.h = 50;

		this.dragging = false; //드래그 중인가?
		this.dragged = false; //드래그된 적 있는가?
		this.hover = false;

		this.box = null;
		this.boxLeft, this.boxRight, this.boxTop, this.boxBottom;
	}

	// 다른 클래스의 값 불러오는 방법 챗지피티 참고함
	setBox(box) {
		this.box = box;
	}

	display() {
		if (this.box) {
			this.boxLeft = this.box.x - 20; //+-20은 오차 보정
			this.boxRight = this.box.x + this.box.w + 20;
			this.boxTop = this.box.y - 20;
			this.boxBottom = this.box.y + this.box.h + 20;
		}

		push();
		fill("#ffff9a");
		rect(this.x, this.y, this.w, this.h);
		rect(this.x + this.w / 2 - 5, this.y + this.h, 10, 26);

		fill(0);
		textAlign(CENTER);
		textSize(22);
		text(this.text, this.x, this.y + 30, this.w, this.h);
		pop();
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
		}
	}
	
    //클릭 감지
	pressed() {
		if (
			mouseX > this.x &&
			mouseX < this.x + this.w &&
			mouseY > this.y &&
			mouseY < this.y + this.h
		) {
			this.dragging = true;
			this.dragged = true;

			this.offsetX = this.x - mouseX;
			this.offsetY = this.y - mouseY;
		}
	}

    //드래그하는 중
	update() {
		if (this.box) { //호버하면 색 바뀜
			if (
				mouseX > this.boxLeft &&
				mouseX < this.boxRight &&
				mouseY > this.boxTop &&
				mouseY < this.boxBottom
			) {
				this.box.c = "#ffff9a";
			} else {
				this.box.c = "#ffffe9";
			}
		}
        
		if (this.dragging) {
			this.x = mouseX + this.offsetX;
			this.y = mouseY + this.offsetY;
		}
	}

    //드래그 끝, 정답 드롭
	released() {
		this.dragging = false;

		if (this.box) {
			if (
				this.x > this.boxLeft &&
				this.x < this.boxRight &&
				this.y > this.boxTop &&
				this.y < this.boxBottom
			) {
                // 정답이 맞는 경우, 정답 표지판을 없앰
				// 배열 인덱스 그대로 유지하기 위해 다음 인덱스에 null을 추가하고 해당 요소 삭제함
				if (this.box.style == 1) {
					//세로
					answers.splice(this.index + 1, 0, answers[6]);
					answers.splice(this.index, 1);
					//print(answers);
				} else {
					//가로
					hanswers.splice(this.index + 1, 0, answers[5]);
					hanswers.splice(this.index, 1);
				}

				this.box.play(); //박스 클래스의 이미지 재생하는 함수

			} else if (this.x > pointx + boxW + size && this.dragged == true) { //오답인 경우 (십자말풀이 시작되는 x좌표부터 감지)
				count++;
				wrongsound.play();
				//print("wrong: ", count);
				this.dragged = false;

				//위치 초기화
				this.x = this.firstx;
				this.y = this.firsty;
			}
			
		} else { //페이크 정답 드롭한 경우 
			if (this.x > pointx + boxW + size && this.dragged == true) {
				count++;
				wrongsound.play();

				//print("wrong: ", count);
				this.dragged = false;

				//위치 초기화
				this.x = this.firstx;
				this.y = this.firsty;
			}
		}
	}
}
