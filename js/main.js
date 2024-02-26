// window.location.reload();
window.onload = () => {
    switchTab();
    navToggle();
    infoDescription();
    resetQuiz();
    quizSubmit();
    buttons();
    mapToggle();
    maxCharacter();
    sendComments();
    scrollHandle();
}

window.addEventListener("beforeunload", () => {
    scrollToCover();
});

function scrollToCover() {
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    header.style.height = "100%";
    main.style.height = "0%";
    header.scrollIntoView({behavior: "smooth"});
}

function scrollToMain() {
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    header.style.height = "0%";
    main.style.height = "100%";
    main.scrollIntoView({behavior: "smooth"});
}

function switchTab() {
    const tabB_switchers = document.querySelectorAll("button[data-switcher]");

    const tabN_switchers = document.querySelectorAll("a[data-switcher]");

    for (let x = 0; x < tabB_switchers.length; x++) {
		const tabB_switcher = tabB_switchers[x];
		const page_id = tabB_switcher.dataset.tab;
        const relatedTabN = document.querySelector(`main ul li a[data-tab = "${page_id}"]`);

		tabB_switcher.addEventListener("click", () => {

            window.onresize = () => {
                document.querySelector("main").scrollIntoView(true);
            }
            relatedTabN.parentNode.classList.add("active");
            switchContentPage(page_id);
            scrollToMain();

            const sections = document.querySelectorAll("section");
            sections.forEach(function(section) {
                section.scrollTop = 0;
            });
		});
	}

    for (let y = 0; y < tabN_switchers.length; y++) {
		const tabN_switcher = tabN_switchers[y];
		const page_id = tabN_switcher.dataset.tab;
        const list = document.querySelector("nav ul");

		tabN_switcher.parentNode.addEventListener("click", () => {
            document.querySelector("main ul li.active").classList.remove("active");
            tabN_switcher.parentNode.classList.add("active");
            list.classList.remove("active");
            switchContentPage(page_id);
		});
	}
}

function switchContentPage(page_id) {
    const currentPages = document.querySelectorAll("section.active");
	const nextPage = document.querySelector(`section[data-page = "${page_id}"]`);

    if (currentPages.length > 0) {
        currentPages.forEach(function(node) {
            node.classList.remove("active");
        });
    }

	nextPage.classList.add("active");
}

function navToggle() {
    const logo = document.querySelector("div.logo");
    const list = document.querySelector("nav ul");
    logo.addEventListener("click", () => {
        list.classList.toggle("active");
    });
}

function scrollHandle() {
    const info = document.querySelector(".info");
    
    info.addEventListener("scroll", () => {
        const infoArticles = document.querySelectorAll(".info.active article:not(.abstract)");

        for (let i = 0; i < infoArticles.length; i++) {
            const infoArticle = infoArticles[i];
    
            if (isInViewport(infoArticle)) {
                scrollEnter(infoArticle);
            }

            else {
                scrollOut(infoArticle);
            }
        }
    });  
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    var visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

    return visibleHeight >= 1 * element.offsetHeight;
}

function scrollEnter(infoArticle) {
    const pic = infoArticle.querySelector(".pic");
    const description = infoArticle.querySelector(".description");
    pic.classList.add("active");
    description.classList.add("active");
}

function scrollOut(infoArticle) {
    const pic = infoArticle.querySelector(".pic");
    const description = infoArticle.querySelector(".description");
    pic.classList.remove("active");
    description.classList.remove("active");
}

function infoDescription() {
    const des = document.querySelectorAll(".description p");
    for (let i = 0; i < des.length; i++) {
        const de = des[i];
        de.addEventListener("click", () => {
            de.classList.toggle("active");
        });
    }
}

function quizSubmit() {
    const submitButton = document.getElementById("submitQuiz");
    const resultPage = document.querySelector(".resultPage");

    submitButton.addEventListener("click", () => {
        checkOptions();
        resultPage.style.height = "100%";
        resultPage.scrollIntoView({behavior: "smooth"});
    });
}

function checkOptions() {
    const correctAnswers = document.querySelectorAll("input.correct");
    let count = 0;

    for (let i = 0; i < correctAnswers.length; i++) {
        const correctAnswer = correctAnswers[i];

        if (correctAnswer.checked) {
            count++;
        }
    }

    accuracyCal(count);
}

function accuracyCal(count) {
    const progressBar = document.getElementById("progressBar");
    progressBar.setAttribute("value", count);

    let accuracy = count/5 * 100;
    const progressText = document.getElementById("progressText");
    progressText.innerHTML = accuracy + "%";
}

function resetQuiz() {
    const questionPage = document.querySelector(".questionPage");
    const resultPage = document.querySelector(".resultPage");

    const inputs = questionPage.querySelectorAll("input");
    inputs.forEach(function(node) {
        node.checked = false;
    });

    resultPage.style.height = "0%";
}

function buttons() {
    const quiz = document.querySelector("section.quiz");
    const tryAgain = document.getElementById("again");
    const backStart1 = document.getElementById("backStart1");
    const backStart2 = document.getElementById("backStart2");
    const afterSend = document.querySelector(".afterSend");
    const tabN_switchers = document.querySelectorAll("a[data-switcher]");

    tryAgain.addEventListener("click", () => {
        resetQuiz();
        quiz.scrollTop = 0;
    });

    backStart1.addEventListener("click", () => {
        scrollToCover();
        tabN_switchers.forEach(function(node) {
            node.parentNode.classList.remove("active");
        });
    });

    backStart2.addEventListener("click", () => {
        scrollToCover();
        afterSend.style.height = "0";
        tabN_switchers.forEach(function(node) {
            node.parentNode.classList.remove("active");
        });
    });
}

function mapToggle() {
    const clickButtons = document.querySelectorAll(".click");

    for (let i = 0; i < clickButtons.length; i++) {
        const clickButton = clickButtons[i];
        clickButton.addEventListener("click", () => {
            clickButton.classList.toggle("active");
            clickButton.querySelector("img").classList.toggle("active");
            clickButton.querySelector("p").classList.toggle("active");
            clickButton.nextElementSibling.classList.toggle("active");
            randomDelay();

            const mapCons = document.querySelectorAll(".mapCon.active");
            const imgs = document.querySelectorAll(".click img");
            const pars = document.querySelectorAll(".click p");

            if (mapCons.length > 1) {
                clickButtons.forEach(function(node) {
                    node.classList.remove("active");
                });

                mapCons.forEach(function(node) {
                    node.classList.remove("active");
                });

                imgs.forEach(function(node) {
                    node.classList.remove("active");  
                });

                pars.forEach(function(node) {
                    node.classList.remove("active");
                });

                clickButton.classList.add("active");
                clickButton.nextElementSibling.classList.add("active");
                clickButton.querySelector("img").classList.add("active");
                clickButton.querySelector("p").classList.add("active");
            }

            var mediaQuery = window.matchMedia("(min-width: 1000px)");
            if (!mediaQuery.matches) {
                dimensionCalc(clickButton, imgs, pars, mapCons);
            }

            window.addEventListener("resize", () => {
                if (!mediaQuery.matches) {
                    dimensionCalc(clickButton, imgs, pars, mapCons);
                }

                else {
                    imgs.forEach(function (node) {
                        node.style.left = "";
                    });

                    pars.forEach(function (node) {
                        node.style.right = "";
                    });
                }
            });
        });
    }
}

function dimensionCalc(clickButton, imgs, pars, mapCons) {
    var clickWidth = clickButton.offsetWidth;
    var textWidth = clickButton.querySelector("p").offsetWidth;
    var imgWidth = clickButton.querySelector("img").offsetWidth;

    var imgPosition = clickWidth - imgWidth / 6 * 6.5;
    var textPosition = clickWidth - textWidth - imgWidth / 6;

    const imgActive = clickButton.querySelectorAll("img.active");
    if (imgActive.length > 0) {

        imgs.forEach(function(node) {
            node.style.left = imgWidth / 6 * 0.5 + "px";
        });

        imgActive.forEach(function(node) {
            node.style.left = imgPosition + "px";
        });
    }

    else {
        clickButton.querySelector("img").style.left = imgWidth / 6 * 0.5 + "px";
    }

    const textActive = clickButton.querySelectorAll("p.active");
    if (textActive.length > 0) {

        pars.forEach(function(node) {
            node.style.right = imgWidth / 6 + "px";
        });

        textActive.forEach(function(node) {
            node.style.right = textPosition + "px";
        });
    }

    else {
        clickButton.querySelector("p").style.right = imgWidth / 6 + "px";
    }

    const map = clickButton.nextElementSibling.querySelector(".worldMap");
    const mapConOri = document.querySelectorAll('.mapCon:not(.active)');
    var mapHeight = map.offsetHeight;

    mapCons.forEach(function(node) {
        node.style.height = mapHeight + "px";
    });

    mapConOri.forEach(function(node) {
        node.style.height = 0;
    });
}

function randomDelay() {
    const mapPoints = document.querySelectorAll(".mapCon.active .position svg path");
    const start = 0.15;
    var interval = 0.05;

    for (let i = 0; i < mapPoints.length; i++) {
        const mapPoint = mapPoints[i];
        const delayTime = start + i * interval;
        mapPoint.style.setProperty("animation-delay", delayTime + "s");
    }
}

function maxCharacter() {
    const textarea = document.getElementById("message");
    const usedCharacter = document.getElementById("usedCharacter");
    var textLength = textarea.value.length;
    usedCharacter.textContent = textLength;

    textarea.addEventListener("input", () => {
        var textLength = textarea.value.length;
        let maxLength = 1000;

        usedCharacter.textContent = textLength;

        if (textLength >= maxLength) {
            textarea.value = textarea.value.slice(0, maxLength);
            usedCharacter.textContent = maxLength;
        }
    });
}

function sendComments() {
    const sendButton = document.getElementById("submitMessage");
    const afterSend = document.querySelector(".afterSend");
    const inputs = document.querySelectorAll("article.form input");
    const textarea = document.querySelector("article.form textarea");

    sendButton.addEventListener("click", () => {
        afterSend.style.height = "100%";
        afterSend.scrollIntoView({behavior: "smooth"});
        inputs.forEach(function(node) {
            node.value = "";
        });
        textarea.value = "";
        maxCharacter();
    });
}