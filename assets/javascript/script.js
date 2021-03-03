const FC = $(".floating-container");
const ITEMS = FC.find(".head .item");
const FORMS = FC.find("form");
const TABS = FC.find(".body");
const OPTIONS = $(".options .option");
const FORMDATA = {};
const DONE = [];

let PAYMENTOPTION = null;

ITEMS.on("click", function () {
	showContent(this.getAttribute("data-content"));
});

OPTIONS.on("click", function () {
	const parent = $(this).parent();
	const options = parent.find(".option");
	const valuesParent = parent.parent().find(".values");
	const values = valuesParent.find(".value");
	const value = $(this).attr("value");
	options.removeClass("selected");
	$(this).addClass("selected");

	values.hide();
	valuesParent.find(`.${value}`).show();
	PAYMENTOPTION = value;
});

FORMS.on("submit", function (event) {
	event.preventDefault();
	const classList = $(this).find(".body")[0].classList;
	DONE.push(classList[classList.length]);
});

function showContent(content) {
	const element = $(`.floating-container .body.${content}`);
	let targetIndex = 0;

	const isEmpty = function () {
		const key = Object.keys(FORMDATA).length === 0;
		const isObject = FORMDATA.constructor === Object;
		return FORMDATA && key && isObject;
	};

	$(".floating-container .body").each(function (index) {
		if (!$(this).hasClass(content)) {
			// if (!DONE.includes(content)) return;
			$(this).hide();
		} else {
			targetIndex = index;
		}
	});

	element.show();

	ITEMS.each(function (index) {
		if (targetIndex < index) {
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
		}
	});

	if (targetIndex == ITEMS.length - 1) {
		if (!isEmpty()) alert("PAYMENT SUCCESS");
	}

	getCurrentFormValues();
}

function getActiveTab() {
	let activetab = null;
	TABS.each(function () {
		if ($(this).is(":visible")) {
			activetab = $(this);
		}
	});

	return activetab;
}

function getCurrentFormValues() {
	const ACTIVETAB = getActiveTab();
	const inputs = ACTIVETAB.find("input");

	inputs.each(function () {
		FORMDATA[$(this).attr("name")] = $(this).val();
	});
}
