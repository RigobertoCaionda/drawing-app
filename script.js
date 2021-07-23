//Initial Data
let currentColor = 'black';
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');//Permite que desenhemos em 2d, uma vez que nos so vamos trabalhar com largura e altura
let canDraw = false;
let mouseX = 0;//PosicaoX do mouse no momento do clique
let mouseY = 0;//PosicaoY do mouse no momento do clique
//Events
document.querySelectorAll('.colorArea .color').forEach((item)=>{
	item.addEventListener('click', colorClickEvent);
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);
//Functions
function colorClickEvent(e) {
	let color = e.target.getAttribute('data-color');
	currentColor = color;
	document.querySelector('.color.active').classList.remove('active');
	e.target.classList.add('active');
}

function mouseDownEvent (e) {
	canDraw = true;
	mouseX = e.pageX - screen.offsetLeft;/*O pageX pega a posicao do mouse na horizontal, so que
			essa posicao e em relacao ao body todo e para desenhar nos precisamos da posicao no canvas
			somente, por isso fizemos menos o offset da tela pois o offsetLeft conta a distancia que o
			elemento esta da esquerda da pagina.
		*/
	mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent (e) {
	if (canDraw) {
		draw(e.pageX, e.pageY);
	}
}

function mouseUpEvent () {
	canDraw = false;
}
function draw (x, y) {
	let pointX = x - screen.offsetLeft;//Pegando a Posicao onde devo desenhar
	let pointY = y - screen.offsetTop;//Pegando a Posicao onde devo desenhar

	ctx.beginPath();//Comecar a desenhar
	ctx.lineWidth = 5;//largura da linha
	ctx.lineJoin = "round";//O formato da linha que vai escrever
	ctx.moveTo(mouseX, mouseY);//Para onde vai mover
	ctx.lineTo(pointX, pointY);//Faca uma linha ate
	ctx.closePath();//Finalizando o desenho
	ctx.strokeStyle = currentColor;// A cor do desenho
	ctx.stroke();//Para finalizar o processo todo.

	mouseX = pointX;//Salvando a posicao X anterior e continuando o desenho
	mouseY = pointY;//Salvando a posicao Y anterior e continuando o desenho
}

function clearScreen () {
	ctx.setTransform(1,0,0,1,0,0);//Para zerar o processo de criacao do desenho. Esses sao os parametros que ele recebe
	ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);//Essa sim e a funcao que limpa tudo. Vai limpar do zero ate a largura do canvas e a altura
}