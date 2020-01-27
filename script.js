var mailLinkText = "hello@tommycohn.com";
var githubLinkText = "github.com/cohnt";
var linkedinLinkText = "linkedin.com/in/thomas-cohn-hello/";
var dimmedOpacity = "0.65";
var normalOpacity = "1.0";

var page = {};

function setup() {
	page.links = {};
	page.links.mail = document.getElementById("mail");
	page.links.github = document.getElementById("github");
	page.links.linkedin = document.getElementById("linkedin");
	page.linkText = document.getElementById("linkText");

	page.links.mail.addEventListener("mouseenter", function() { displayLinkText(mailLinkText, -1); });
	page.links.mail.addEventListener("mouseenter", function() { dimElement(this); });
	page.links.mail.addEventListener("mouseleave", hideLinkText);
	page.links.mail.addEventListener("mouseleave", function() { undimElement(this); });
	page.links.github.addEventListener("mouseenter", function() { displayLinkText(githubLinkText, 0); });
	page.links.github.addEventListener("mouseenter", function() { dimElement(this); });
	page.links.github.addEventListener("mouseleave", hideLinkText);
	page.links.github.addEventListener("mouseleave", function() { undimElement(this); });
	page.links.linkedin.addEventListener("mouseenter", function() { displayLinkText(linkedinLinkText, 1); });
	page.links.linkedin.addEventListener("mouseenter", function() { dimElement(this); });
	page.links.linkedin.addEventListener("mouseleave", hideLinkText);
	page.links.linkedin.addEventListener("mouseleave", function() { undimElement(this); });

	setupResumeSection()
}
function displayLinkText(text, pos) {
	page.linkText.innerHTML = text;
	page.linkText.style.display = "block";
	var align;
	switch(pos) {
		case -1:
			align = "left";
			break;
		case 1:
			align = "right";
			break;
		default:
			align =  "center";
			break;
	}
	page.linkText.style.textAlign = align;
}
function hideLinkText() {
	page.linkText.innerHTML = "";
	page.linkText.style.display = "none";
}
function dimElement(el) {
	//
	el.style.opacity = dimmedOpacity;
}
function undimElement(el) {
	//
	el.style.opacity = normalOpacity;
}
function setupResumeSection() {
	width = document.getElementById("mainCont").clientWidth;
	document.getElementById("resumeContainer").setAttribute("width", 0.5*width)
	document.getElementById("resumeContainer").setAttribute("height", (11/8.5) * (0.5*width))
}

setup();
