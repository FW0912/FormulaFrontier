const form = document.getElementById('calculateEnemyDmgForm');
const errorContainer = document.getElementById('errorContainer');
const error = document.getElementById('error');
const output = document.getElementById('output');

function falseValidation(msg) {
    errorContainer.style.display = 'flex';
    error.innerHTML = msg;
    output.innerHTML = '';
}

function validateInputs(enemyDmg, IDR, armorAbsorption, armorDura, armorEnd, playerEnd) {
    if(enemyDmg <= 0 || enemyDmg > 9999) {
        falseValidation('Enemy damage must be between 1-9999');
        return false;
    }

    if(IDR > 75) {
        falseValidation('IDR is capped at 75%');
        return false;
    }

    if(armorAbsorption <= 0 || armorAbsorption > 100) {
        falseValidation('Armor absorption must be between 1-100%');
        return false;
    }

    if(armorDura < 0) {
        falseValidation('Armor durability cannot be less than 0');
        return false;
    }

    if(armorEnd < 0 || armorEnd > 24) {
        falseValidation('Armor endurance must be between 0-24');
        return false;
    }

    if(playerEnd < 25 || playerEnd > 100) {
        falseValidation('Player endurance must be between 25-100');
        return false;
    }

    errorContainer.style.display = 'none';
    error.innerHTML = '';
    return true;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let enemyDmg = form.elements['enemyDmg'].value;
    let IDR = form.elements['IDR'].value;
    let armorAbsorption = form.elements['armorAbsorption'].value;
    let armorDura = form.elements['armorDura'].value;
    let armorEnd = form.elements['armorEnd'].value;
    let playerEnd = form.elements['playerEnd'].value;

    if(!validateInputs(enemyDmg, IDR, armorAbsorption, armorDura, armorEnd, playerEnd)) {
        return false;
    }

    enemyDmg = parseInt(enemyDmg);
    IDR = parseInt(IDR);
    armorAbsorption = parseInt(armorAbsorption);
    armorDura = parseInt(armorDura);
    armorEnd = parseInt(armorEnd);
    playerEnd = parseInt(playerEnd);

    let dmg = enemyDmg;
    let absorbedDmg = Math.floor(enemyDmg * (IDR / 100));
    let armorDmg = Math.floor((dmg - absorbedDmg) * (armorAbsorption / 100));
    
    if(armorDmg > armorDura) {
        armorDmg = armorDura;
    }

    armorEndReduction = Math.floor((dmg - absorbedDmg - armorDmg) * (armorEnd / (armorEnd + playerEnd)));

    hpDmg = Math.floor(dmg - absorbedDmg - armorDmg - armorEndReduction);

    output.innerHTML = 'HP Damage : ' + hpDmg;

    return false;
})