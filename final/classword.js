class Word {
	constructor(text) {
		this.x = width / 2;
		this.y = height - size - 50;
		this.text = text;
	}

	display() {
		push();
		fill("#ffff9a");
		rectMode(CENTER);
		rect(this.x, this.y, 130, 50);
		fill(0);
		textAlign(CENTER);
		text(this.text, this.x, this.y + 8);
		pop();
	}
}
