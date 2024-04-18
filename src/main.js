(function() {
    let shorks = 0;
    let autoShorks = 0;

    const shorkCounter = document.getElementById("ShorksCount");
    const sharkImg = document.getElementById("Shark");
    const formatting = document.getElementById("formatting");
    const body = document.getElementById("Content");
    const title = document.getElementById("Title");
    const about = document.getElementById("About");
    const aboutPanel = document.getElementById("AboutDiv");
    const close = document.getElementById("Close");
    const save = document.getElementById("Save");
    const load = document.getElementById("Load");
    const clear = document.getElementById("Clear");
    const saveTimer = document.getElementById("SaveTimer");

    let hook = true;

    let formattingMode = 0;
    let lastSave = Date.now();
    let saveInterval = 30;

    var illions = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion", "unvigintillion", "duovigintillion", "trevigintillion", "quattuorvigintillion", "quinvigintillion", "sexvigintillion", "septenvigintillion", "octovigintillion", "nonvigintillion", "trigintillion", "untrigintillion", "duotrigintillion", "tretrigintillion", "quattuortrigintillion", "quintrigintillion", "sextrigintillion", "septentrigintillion", "octotrigintillion", "novemtrigintillion", "quadragintillion", "unquadragintillion", "duoquadragintillion", "trequadragintillion", "quattuorquadragintillion", "quinquadragintillion", "sexquadragintillion", "septenquadragintillion", "octoquadragintillion", "novemquadragintillion", "quinquagintillion", "unquinquagintillion", "duoquinquagintillion", "trequinquagintillion"];
    var illionsAbbr = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "Ud", "DuD", "TrD", "QaD", "QiD", "SxD", "SpD", "OD", "ND", "V", "UnV", "DuV", "TrV", "QaV", "QiV", "SxV", "SpV", "OV", "NV", "Tg", "UnT", "DuT", "TrT", "QaT", "QiT", "SxT", "SpT", "OT", "NT", "Dg", "UnD", "DuDg", "TrDg", "QaDg", "QiDg", "SxDg", "SpDg", "ODg", "NDg", "Sg", "UnSg", "DuSg", "TrSg", "QaSg", "QiSg", "SxSg", "SpSg", "OSg"];



    // funny message in the console when the game is loaded to confuse the player if they open the console
    document.addEventListener('DOMContentLoaded', function() {

        console.log('Shork Clicker loaded!');
        console.log('Why are you looking at the console?');
        console.log('Theres nothing to see here!');
    });

    function handleBeforeUnload(event) {
        if (hook) {
            event.preventDefault();
            event.returnValue = 'Warning: Game does not autosave. Use download button.';
        }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    sharkImg.addEventListener("click", addShorks);
    formatting.addEventListener("click", updateFormatting);
    about.addEventListener("click", openAbout);
    close.addEventListener("click", closeAbout);

    // Add event listeners to load the game save when the load button is clicked
    load.addEventListener("click", loadGame);

    // Add event listeners to save the game when the save button is clicked
    save.addEventListener("click", saveGame);

    // Add event listeners to clear the cookies
    clear.addEventListener("click", clearCookies);


    /**
     * Updates the formatting mode of the application.
     *
     * This function increments the formatting mode by 1, and wraps
     * it around to 0 if it exceeds 3.
     *
     * @return {void} This function does not return anything.
     */
    function updateFormatting() {
        // Increment the formatting mode and wrap it around to 0 if it exceeds 3
        formattingMode = (formattingMode + 1) % 4;
    }

    function addShorks() {
        shorks += 1;
    }

    function addShorksAuto() {
        // add shorks dependant on number of auto shorks, if the number of auto shorks is over 10 add them to the shork counter over a few seconds
        if (autoShorks > 10) {
            for (var i = 0; i < autoShorks; i++) {
                setTimeout(function() {
                    addShorks();
                }, i * 10);
            }
        }
        else {
            for (var i = 0; i < autoShorks; i++) {
                addShorks();
            }
        }
    };


    function updateUI() {
        if (formattingMode == 0) {
            shorkCounter.textContent = shorks.toLocaleString() + " Shorks";
        } else if (formattingMode == 1) {
            shorkCounter.textContent = formatInt(shorks);
        } else if (formattingMode == 2) {
            shorkCounter.textContent = formatIntAbbr(shorks);
        } else if (formattingMode == 3) {
            shorkCounter.textContent = shorks.toExponential(2) + " Shorks";
        }
        // update the save timer
        saveTimer.textContent = "Next save in " + (saveInterval - (Date.now() - lastSave) / 1000).toFixed(0) + " seconds.";
    }

    function formatInt(number) {
        var temp = number;
        var illion = 1;
        while (temp >= 1000) {
            temp = temp / 1000;
            illion++;
        }
        return temp + " " + illions[illion - 1] + " Shorks";
    }

    function formatIntAbbr(number) {
        var temp = number;
        var illion = 1;
        while (temp >= 1000) {
            temp = temp / 1000;
            illion++;
        }
        return temp + illionsAbbr[illion - 1] + " Shorks";
    }

    // a function that opens the about page by dimming the background and making the about panel div visible
    function openAbout() {
        body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        aboutPanel.style.visibility = "visible";
    }

    // a function that closes the about page by undimming the background and making the about panel div invisible
    function closeAbout() {
        body.style.backgroundColor = "rgba(0, 0, 0, 0)";
        aboutPanel.style.visibility = "hidden";
    }
    function logger() {
        console.log("clicked");
    }

    // a function that saves the shork counter and formatting mode to a browser cookie when the save button is clicked
    function saveGame() {
        document.cookie = "shorkCounter=" + shorks;
        document.cookie = "formattingMode=" + formattingMode;
        hook = false;
        lastSave = Date.now();
        // tell the user that their save has been saved
        console.log("saved");
    }

    // a function that loads the shork counter and formatting mode from a browser cookie when the load button is clicked
    function loadGame() {
        // get the shork counter and formatting mode from the cookie using their names
        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split("=");
            if (cookie[0] == "shorkCounter") {
                shorks = parseInt(cookie[1]);
            } else if (cookie[0] == "formattingMode") {
                formattingMode = parseInt(cookie[1]);
            }
        }
        updateUI();
        // set hook to true so that the game will not want the user to save before they close the page
        hook = true;
        // tell the user that their save has been loaded
        console.log("loaded");
    }

    // a function that clears all cookies when the clear button is clicked
    function clearCookies() {
        // warn the user that their cookies will be cleared and cancel the clear if they don't want to continue
        if (!confirm("Are you sure you want to clear your save data? This action cannot be undone.")) {
            return;
        }
        // clear all cookies
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            // set all cookies to an empty string
            document.cookie = cookies[i].split("=")[0] + "=";
            // refresh the page to clear progress
            hook = false;
            location.reload();
        }
        // tell the user that their cookies have been cleared
        alert("Your save data has been cleared!");
        console.log("cleared");
    }

    // a function that calls the save function every 60 seconds
    setInterval(saveGame, saveInterval * 1000); // multiply by 1000 to convert seconds to milliseconds

    const everyTick = () => {
        updateUI();
        addShorksAuto();
    }

    setInterval(everyTick, 50); // Every 50ms = 1/20th of a second
    
})()