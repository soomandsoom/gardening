let answers = []; //세로 정답
let hanswers = []; //가로 정답
let boxes = []; //세로 칸
let hboxes = []; //가로 칸
let words = []; //세로 팝업 단어 (창 하단)
let hwords = []; //가로 팝업 단어 (창 하단)
let dess = []; //세로 설명
let hdess = []; //가로 설명
let nums = []; //세로 숫자 (칸 좌측 상단)
let hnums = []; //가로 숫자 (칸 좌측 상단)

let imgs = []; //이미지
let size = 100; //칸 크기
let frameDelay = 3; // 이미지 변경 간격

let count = 0; //틀린 횟수
let correct = 0; //맞힌 횟수

let fontstyle;
let w, h, margin;
let pointx, pointy;
let category;
let boxW, boxH;
let gameover = false;
let countimgs = [];
let countimg, countdeadimg, answerimg, cursorimg;
let waiting = true; //시작 화면

let soundPlayed = false;
let resultSoundPlayed = false;
let wrongsound, correctsound, changesound, successsound, failsound;



//이미지 불러올 때 폴더명에 변수 2개 넣는 방법 챗지피티 참고
function preload() {
	for (let k = 0; k < 3; k++) { 
		let sequence = [];
		for (let i = 0; i < 72; i++) {
			sequence.push(loadImage(`./asset/set${k}/img_${i}.jpg`));
		}
		imgs.push(sequence);
	}
	for (let k = 3; k < 5; k++) { 
		let sequence = [];
		for (let i = 0; i < 33; i++) {
			sequence.push(loadImage(`./asset/set${k}/img_${i}.jpg`));
		}
		imgs.push(sequence);
	}
	for (let k = 5; k < 7; k++) { 
		let sequence = [];
		for (let i = 0; i < 72; i++) {
			sequence.push(loadImage(`./asset/set${k}/img_${i}.jpg`));
		}
		imgs.push(sequence);
	}
	for (let k = 7; k < 8; k++) {
		let sequence = [];
		for (let i = 0; i < 33; i++) {
			sequence.push(loadImage(`./asset/set${k}/img_${i}.jpg`));
		}
		imgs.push(sequence);
	}
	for (let k = 8; k < 11; k++) {
		let sequence = [];
		for (let i = 0; i < 72; i++) {
			sequence.push(loadImage(`./asset/set${k}/img_${i}.jpg`));
		}
		imgs.push(sequence);
	}


	fontstyle = loadFont("./asset/gothic.otf");
	countimg = loadImage("./asset/count.svg");
	countdeadimg = loadImage("./asset/countdead.svg");
	answerimg = loadImage("./asset/answer.png");
  	cursorimg = loadImage("./asset/cursor.png");

	wrongsound = loadSound("./asset/wrong.mp3");
	correctsound = loadSound("./asset/correct.mp3");
	changesound = loadSound("./asset/changing.mp3");
	successsound = loadSound("./asset/success.mp3");
	failsound = loadSound("./asset/fail.mp3");
}


function setup() {
	wrongsound.setVolume(0.2);
	correctsound.setVolume(1);
	changesound.setVolume(0.4);

	createCanvas(windowWidth, windowHeight);

	textFont(fontstyle);
	textSize(25);

  //좌측 박스 크기 정의
	boxW = 7 * size;
	boxH = 8 * size;
	pointx = width / 2 - boxW - size;
	pointy = height / 2 - boxH / 2 + size;

	margin = (boxW - 130 * 4) / 5;

  //정답들 위치값
	let col = [];
	for (let i = 0; i < 4; i++) {
		col[i] = pointx + (i + 1) * margin + i * 130;
	}

	let rows = [];
	for (let j = 0; j < 4; j++) {
		rows[j] = pointy + (j + 1) * margin + j * 40;
	}

	//세로 정답 (w, y, text, id)
	answers.push(new Answer(col[0], rows[2], "관수", 0)); //관수
	answers.push(new Answer(col[1], rows[3], "수생식물", 1)); //수생식물
	answers.push(new Answer(col[2], rows[0], "모종", 2)); //모종
	answers.push(new Answer(col[3], rows[3], "가지치기", 3)); //가지치기
	answers.push(new Answer(col[0], rows[1], "분갈이", 4)); //분갈이
	answers.push(new Answer(col[2], rows[3], "보수성", 5)); //보수성
	answers.push(new Answer(-500, -500, "", 6)); //null

	//세로 페이크
	answers.push(new Answer(col[2], rows[1], "보비성", 7));
	answers.push(new Answer(col[3], rows[1], "삽목", 7));
	answers.push(new Answer(col[0], rows[0], "토종", 7));
	answers.push(new Answer(col[1], rows[2], "관실식물", 7));
	answers.push(new Answer(col[2], rows[2], "관엽식물", 7));
	answers.push(new Answer(col[3], rows[2], "솎아내기", 7));
	answers.push(new Answer(col[0], rows[3], "흡비력", 7));
	answers.push(new Answer(col[1], rows[0], "광합성", 7));
	answers.push(new Answer(col[1], rows[1], "발아", 7));
	answers.push(new Answer(col[3], rows[0], "굴광성", 7));

	//가로 정답 (w, y, text, id)
	hanswers.push(new Answer(col[0], rows[0], "덩이줄기", 0)); //덩이줄기
	hanswers.push(new Answer(col[2], rows[3], "저면관수", 1)); //저면관수
	hanswers.push(new Answer(col[0], rows[2], "관엽식물", 2)); //관엽식물
	hanswers.push(new Answer(col[3], rows[2], "상록수", 3)); //상록수
	hanswers.push(new Answer(col[1], rows[0], "파종", 4)); //파종
	hanswers.push(new Answer(-500, -500, "", 5)); //null

	//가로페이크
	hanswers.push(new Answer(col[2], rows[0], "덩이뿌리", 7));
	hanswers.push(new Answer(col[3], rows[0], "관실식물", 7));
	hanswers.push(new Answer(col[1], rows[1], "엽면시비", 7));
	hanswers.push(new Answer(col[1], rows[2], "부엽토", 7));
	hanswers.push(new Answer(col[1], rows[3], "관목", 7));
	hanswers.push(new Answer(col[2], rows[1], "낙엽수", 7));
	hanswers.push(new Answer(col[0], rows[1], "귀화식물", 7));
	hanswers.push(new Answer(col[2], rows[2], "발아", 7));
	hanswers.push(new Answer(col[3], rows[1], "출아법", 7));
	hanswers.push(new Answer(col[0], rows[3], "액비", 7));
	hanswers.push(new Answer(col[3], rows[3], "목질화", 7));

	//세로칸 (x, y, w, h, img)
	w = (pointx + boxW) / size + 2;
	h = pointy / size - 1;

	boxes.push(new Box(w + 2, h + 2, 1, 2, 0)); //관수
	boxes.push(new Box(w + 4, h + 0, 1, 4, 1)); //수생식물
	boxes.push(new Box(w + 6, h + 3, 1, 2, 2)); //모종
	boxes.push(new Box(w + 7, h + 5, 1, 4, 3)); //가지치기
	boxes.push(new Box(w + 5, h + 6, 1, 3, 4)); //분갈이
	boxes.push(new Box(w + 3, h + 4, 1, 3, 5)); //보수성

	//가로칸 (x, y, w, h, img)
	hboxes.push(new Box(w + 4, h + 8, 4, 1, 6)); //덩이줄기
	hboxes.push(new Box(w + 0, h + 5, 4, 1, 7)); //저면관수
	hboxes.push(new Box(w + 2, h + 2, 4, 1, 8)); //관엽식물
	hboxes.push(new Box(w + 0, h + 3, 3, 1, 9)); //상록수
	hboxes.push(new Box(w + 5, h + 4, 2, 1, 10)); //파종

	for (let i = 0; i < answers.length; i++) {
		answers[i].setBox(boxes[i]);
	}
	for (let i = 0; i < hanswers.length; i++) {
		hanswers[i].setBox(hboxes[i]);
	}

	//세로 단어
	words.push(new Word("관수"));
	words.push(new Word("수생식물"));
	words.push(new Word("모종"));
	words.push(new Word("가지치기"));
	words.push(new Word("분갈이"));
	words.push(new Word("보수성"));

	//가로 단어
	hwords.push(new Word("덩이줄기"));
	hwords.push(new Word("저면관수"));
	hwords.push(new Word("관엽식물"));
	hwords.push(new Word("상록수"));
	hwords.push(new Word("파종"));

	//세로 설명
	dess.push(new Des("[세로 1] 식물에 물을 주는 것.", 0));
	dess.push(new Des("[세로 2] 물에서 자라는 식물.", 1));
	dess.push(new Des("[세로 3] 옮겨심기 위하여 가꾼 씨앗의 싹. 모.", 2));
	dess.push(new Des("[세로 4] 나뭇가지를 잘라 내는 것.", 3));
	dess.push(new Des("[세로 5] 화분에 심은 풀이나 나무를 다른 화분에 갈아 심는 일.", 4));
	dess.push(new Des("[세로 6] 흙이 물을 오래 머금는 성질.", 5));

	//가로 설명
	hdess.push(new Des("[가로 1] 줄기의 일부분이 이상적으로 자란 것으로, 감자가 이에 해당.",6));
	hdess.push(new Des("[가로 2] 흙의 아래쪽부터 물을 공급함.", 7));
	hdess.push(new Des("[가로 3] 잎을 감상하기 위한 식물.", 8));
	hdess.push(new Des("[가로 4] 계절에 상관없이 늘 잎이 푸른 나무.", 9));
	hdess.push(new Des("[가로 5] 씨앗을 심는 일.", 10));

  //넘버링
	nums.push(new Num(w + 2, h + 2, "1"));
	nums.push(new Num(w + 4, h + 0, "2"));
	nums.push(new Num(w + 6, h + 3, "3"));
	nums.push(new Num(w + 7, h + 5, "4"));
	nums.push(new Num(w + 5, h + 6, "5"));
	nums.push(new Num(w + 3, h + 4, "6"));
	hnums.push(new Num(w + 4, h + 8, "1"));
	hnums.push(new Num(w + 0, h + 5, "2"));
	hnums.push(new Num(w + 2, h + 2, "3"));
	hnums.push(new Num(w + 0, h + 3, "4"));
	hnums.push(new Num(w + 5, h + 4, "5"));

	noCursor();
}

function draw() {
	background("#ff7771");

	bg();
	push();

	push();
	translate(pointx, pointy - size + 30);
	rotate(radians(-10));

	beginShape();
	fill("#00ceff");
	rect(0, 0, 130, 50);
	rect(60, 50, 10, 40);

	fill(0);
	textAlign(CENTER);
	text(category, 65, 33);

	endShape();
	pop();

	fill("#ffffe9");
	rect(pointx, pointy, boxW, boxH);
	line(
		pointx + margin,
		pointy + 76 * 4 + 2 * margin,
		pointx + boxW - margin,
		pointy + 76 * 4 + 2 * margin
	);
	pop();


	//설명
	for (let des of dess) {
		des.display();
	}

	//이미지
	for (let hbox of hboxes) {
		hbox.display();
		hbox.playimg(); // 이미지 재생 메소드 호출
	}

	for (let box of boxes) {
		box.display();
		box.playimg();
	}


	if (correct >= 6) { //가로 모드 on
    category = "가로칸";

		if (!soundPlayed) {
			changesound.play();
			soundPlayed = true;
		}

		for (let hanswer of hanswers) {
			hanswer.display();
			hanswer.over();
			hanswer.update();
		}
		for (let hdes of hdess) {
			hdes.display();
		}
		for (let hnum of hnums) {
			hnum.display();
		}

	} else { //초기(세로) 모드
    category = "세로칸";

		for (let answer of answers) {
			answer.display();
			answer.over();
			answer.update();
		}
		for (let num of nums) {
			num.display();
		}
	}

  //인접한 칸 채워질 때 트리거
  //중간 프레임까지 재생됐던 세로 칸 이미지들이 마저 재생됨
	if (hboxes[1].playing == true) {
		boxes[5].letsgo();
	}
	if (hboxes[2].playing == true) {
		boxes[1].letsgo();
	}
	if (hboxes[3].playing == true) {
		boxes[0].letsgo();
	}
	if (hboxes[4].playing == true) {
		boxes[2].letsgo();
	}

	//이미지가 채워진 상태에서 호버 시 단어 뜸
	for (let word of words) {
		for (let i = 0; i < boxes.length; i++) {
			if (boxes[i].playing == true && boxes[i].hover == true) {
				words[i].display();
				dess[i].c = color("#ff7771");
			} else if (boxes[i].playing == true && boxes[i].hover == false) {
				dess[i].c = color(150);
			}
		}
	}

	for (let hword of hwords) {
		for (let i = 0; i < hboxes.length; i++) {
			if (hboxes[i].playing == true && hboxes[i].hover == true) {
				hwords[i].display();
				hdess[i].c = color("#ff7771");
			} else if (hboxes[i].playing == true && hboxes[i].hover == false) {
				hdess[i].c = color(150);
			}
		}
	}

	// for (let i = 0; i < counts.length; i++){
	//   counts[i] = image(countimg, pointx + boxW/1.5 + 50*i, pointy - 50, 30, 30);
	// }

	for (let i = 0; i < 5; i++) {
		countimgs[i] = image(
			countimg,
			pointx + boxW / 1.5 + 50 * i,
			pointy - 50,
			30,
			30
		);
	}
	for (let j = 0; j < count; j++) {
		countimgs[j] = image(
			countdeadimg,
			pointx + boxW / 1.5 + 50 * j,
			pointy - 50,
			30,
			30
		);
	}

	if (count >= 5 || correct == 11) {
		gameover = true;
		result();
	}

	if (waiting) {
		push();
		fill("#ff7771");
		rect(0, 0, width, height);
		fill(0);
		textAlign(CENTER);

		text("나의 가드닝 지식을 점검해봅시다!", width / 2, height / 2 - 100);
		text("헷갈리기 쉬운 가드닝 단어들을 모았어요.", width / 2, height / 2 - 50);
		text(
			"단어가 적힌 표지판을 십자말풀이의 빈칸으로 드래그하여 정답을 맞혀보세요.",
			width / 2,
			height / 2
		);
		text("기회는 다섯번이에요.", width / 2, height / 2 + 50);

		if (mouseIsPressed) {
			waiting = false;
			changesound.play();
		}
		pop();
	}
	push();
	fill(0);
	textAlign(CENTER);
	text("[가드닝 단어 퀴즈]", width / 2, 50);
	pop();

	image(cursorimg, mouseX, mouseY, 40, 40);
}

function bg() { //배경 줄무늬 넣는 함수
	push();
	stroke("#ffaaaa");
	if (correct >= 6) {
		for (let i = 0; i < height / 50; i++) {
			line(0, i * 50, width, i * 50);
		}
	} else {
		for (let i = 0; i < width / 50; i++) {
			line(i * 50, 0, i * 50, height);
		}
	}
	pop();
}

function result() { //결과창
	push();

	translate(width / 2, height / 2);
	rectMode(CENTER);
	fill(0, 100);
	rect(0, 0, width, height);

	fill("#ff7771");
	rect(0, 0, width / 2, height - height / 3);

	textAlign(CENTER);
	fill(0);
	text("[결과]", 0, -300);

	let resulttext;

  //생명
	for (let i = 0; i < 5; i++) {
		countimgs[i] = image(countimg, -115 + 50 * i, -280, 30, 30);
	}
	for (let j = 0; j < count; j++) {
		countimgs[j] = image(countdeadimg, -115 + 50 * j, -280, 30, 30);
	}

  //소리
	if (!resultSoundPlayed) { 
		if (correct >= 11) {
			successsound.play();
		} else {
			failsound.play();
		}
		resultSoundPlayed = true;
	}
  
  //텍스트
	if (correct >= 11) {
		imageMode(CENTER);
		image(answerimg, 0, -10, 320, 360);
		resulttext = "축하합니다! 모두 맞혔어요.";
	} else {
		text("앗, 꽃이 다 져버렸네요.", 0, 200);
		resulttext = `모두 ${correct}개의 단어를 맞혔어요.`;
	}

	text(resulttext, 0, 240);

	textSize(18);
	text("다시 하려면 아무 곳이나 클릭하세요.", 0, 330);

	if (mouseIsPressed) {
		f5();
	}

	pop();
}

function mousePressed() {
	for (let answer of answers) {
		answer.pressed();
	}

	for (let hanswer of hanswers) {
		hanswer.pressed();
	}

	if (mouseX > width / 2 - 130 && mouseX < width / 2 + 130 && mouseY < 70) { //타이틀 클릭 시 새로고침
		f5();
	}
}

function mouseReleased() {
	for (let answer of answers) {
		answer.released();
	}

	for (let hanswer of hanswers) {
		hanswer.released();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function f5() {
	location.reload();
}


//설명 클래스
class Des {
	constructor(text, idx) {
		this.x = pointx + margin;
		this.y = pointy + 76 * 4 + 3 * margin;
		this.idx = idx;
		this.text = text;

		this.c = color(0);
	}

	display() {
		push();
		fill(this.c);
		textSize(18);
		text(this.text, this.x, this.y + 33 * this.idx);
		pop();
	}
}

//넘버링 클래스
class Num {
	constructor(x, y, num) {
		this.x = x * size;
		this.y = y * size;
		this.num = num;
	}

	display() {
		push();
		fill("#ffff9a");
		circle(this.x, this.y, 30);
		fill(0);
		textSize(18);
		textAlign(CENTER);
		text(this.num, this.x, this.y + 5);
		pop();
	}
}
