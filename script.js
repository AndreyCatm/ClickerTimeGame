let coins = 0;
let clickValue = 1;
let autoClickerSpeed = 1000; // Initial auto-clicker speed in ms
let autoClickerInterval = null;
let farmerInterval = null;
let marmerInterval = null;
let sarmerInterval = null;
let carmerInterval = null;
let sessionClicks = 0;
let isModerator = false;
let isAdmin = false;
let isFarmer = false;
let isWhat = false;
let isIdk = false;


let isAutoClickerPurchased = false;

document.getElementById('clickerBtn').addEventListener('click', () => {
    coins += clickValue;
    sessionClicks += 1;
    updateCoinCount();
    updateSessionClicks();
});

document.getElementById('addClick').addEventListener('click', () => {
    if (coins >= 50) {
        coins -= 50;
        clickValue += 1;
        updateCoinCount();
    }
});

document.getElementById('autoClicker').addEventListener('click', () => {
    if (!isAutoClickerPurchased && coins >= 500) {
        coins -= 500;
        isAutoClickerPurchased = true;
        autoClickerInterval = setInterval(() => {
            coins += clickValue;
            updateCoinCount();
        }, autoClickerSpeed);
        document.getElementById('autoClicker').disabled = true;
        updateCoinCount();
    }
});

document.getElementById('farmer').addEventListener('click', () => {
    if (!isFarmer && coins >= 2000) {
        coins -= 2000;
        farmerInterval = setInterval(() => {
            coins += 3000;
            updateCoinCount();
        }, 60000); // 1 minute interval
        isFarmer = true;
        updateCoinCount();
    }
});

document.getElementById('moderator').addEventListener('click', () => {
    if (!isModerator && coins >= 10000) {
        coins -= 10000;
        clickValue += 50; // Increase click value by 50
        isModerator = true;
        document.getElementById('moderator').disabled = true;
        updateCoinCount();
    }
});

document.getElementById('admin').addEventListener('click', () => {
    if (!isAdmin && coins >= 20000) {
        coins -= 20000;
        marmerInterval = setInterval(() => {
            coins += 7000;
            updateCoinCount();
        }, 60000); // 1 minute interval
        isAdmin = true;
        updateCoinCount();
    }
});

document.getElementById('What').addEventListener('click', () => {
    if (!isWhat && coins >= 50000) {
        coins -= 50000;
        sarmerInterval = setInterval(() => {
            coins += 10000;
            updateCoinCount();
        }, 60000); // 1 minute interval
        isWhat = true;
        updateCoinCount();
    }
});

document.getElementById('Idk').addEventListener('click', () => {
    if (!isIdk && coins >= 100000) {
        coins -= 1000000;
        carmerInterval = setInterval(() => {
            coins += 1000000000;
            updateCoinCount();
        }, 5000); // 1 minute interval
        isIdk = true;
        updateCoinCount();
    }
});

document.getElementById('settingsBtn').addEventListener('click', () => {
    document.getElementById('settingsModal').style.display = 'flex';
});

document.getElementById('closeSettings').addEventListener('click', () => {
    document.getElementById('settingsModal').style.display = 'none';
});

document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

document.getElementById('resetGame').addEventListener('dblclick', () => {
    localStorage.clear();
    location.reload();
});

function updateCoinCount() {
    document.getElementById('coinCount').textContent = coins;
    saveGame();
}

function updateSessionClicks() {
    document.getElementById('sessionClicks').textContent = sessionClicks;
}

function saveGame() {
    const gameState = {
        coins,
        clickValue,
        sessionClicks,
        isModerator,
        isAdmin,
        isFarmer,
        isWhat,
        isIdk,
        isAutoClickerPurchased
    };
    localStorage.setItem('clickerGameState', JSON.stringify(gameState));
}

function loadGame() {
    const savedState = JSON.parse(localStorage.getItem('clickerGameState'));
    if (savedState) {
        coins = savedState.coins;
        clickValue = savedState.clickValue;
        sessionClicks = savedState.sessionClicks;
        isModerator = savedState.isModerator;
        isAdmin = savedState.isAdmin;
        isFarmer = savedState.isFarmer;
        isWhat = savedState.isWhat;
        isAutoClickerPurchased = savedState.isAutoClickerPurchased;

        if (isAutoClickerPurchased) {
            autoClickerInterval = setInterval(() => {
                coins += clickValue;
                updateCoinCount();
            }, autoClickerSpeed);
            document.getElementById('autoClicker').disabled = true;
        }
        if (isModerator) {
            document.getElementById('moderator').disabled = true;
        }
        if (isAdmin) {
            document.getElementById('admin').disabled = true;
        }
        if (isFarmer) {
            document.getElementById('farmer').disabled = true;
        }
        if (isWhat) {
            document.getElementById('What').disabled = true;
        }
        if (isIdk) {
            document.getElementById('Idk').disabled = true;
        }
        updateCoinCount();
        updateSessionClicks();
    }
}

loadGame();
