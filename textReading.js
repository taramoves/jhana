document.addEventListener("DOMContentLoaded", function() {
    const generateReadingButton = document.getElementById('generate-reading');
    generateReadingButton.addEventListener('click', setup);
});

function setup() {
    const readingContainer = document.getElementById('reading-container');
    const seed = 12345; // Fixed seed for simplicity
    const reading = generateReadingFromSeed(seed);
    readingContainer.innerText = reading;
}

function generateReadingFromSeed(seed) {
    const seed1 = seed;
    const seed2 = seed + 1;

    const attributes = generateRandomAttributes(seed1, seed2);

    return generateReading(
        attributes.border,
        attributes.flower,
        attributes.sky,
        attributes.phase,
        attributes.clouds,
        attributes.architecture,
        attributes.symbol
    );
}

function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function getRandomElement(arr, seed) {
    const randomIndex = Math.floor(seededRandom(seed) * arr.length);
    return arr[randomIndex];
}

function generateRandomAttributes(seed1, seed2) {
    const borderColors = Object.keys(borderElements.colors);
    const flowers = Object.keys(borderElements.flowers);
    const skies = Object.keys(backgroundElements.sky);
    const moonPhases = Object.keys(backgroundElements.moonPhases);
    const sunPositions = Object.keys(backgroundElements.sunPositions);
    const clouds = Object.keys(backgroundElements.clouds);
    const architectures = ["internal", "external", "relationship"];
    const symbolKeys = Object.keys(symbols);

    return {
        border: getRandomElement(borderColors, seed1),
        flower: getRandomElement(flowers, seed1 + 1),
        sky: getRandomElement(skies, seed1 + 2),
        phase: getRandomElement(seed1 % 2 === 0 ? moonPhases : sunPositions, seed1 + 3),
        clouds: getRandomElement(clouds, seed2),
        architecture: getRandomElement(architectures, seed2 + 1),
        symbol: getRandomElement(symbolKeys, seed2 + 2)
    };
}

const symbols = {
    lightning: { meanings: ["chaos"], trait: "negative" },
    handsTogether: { meanings: ["intimacy"], trait: "positive" },
    handsApart: { meanings: ["distance"], trait: "negative" },
    book: { meanings: ["wisdom"], trait: "positive" },
    closedBook: { meanings: ["naivety"], trait: "negative" },
    swordUp: { meanings: ["strength"], trait: "positive" },
    swordDown: { meanings: ["authority"], trait: "neutral" },
    swordsCrossed: { meanings: ["conflict"], trait: "negative" },
    treeBaby: { meanings: ["new growth", "beginnings"], trait: "positive" },
    treeFull: { meanings: ["abundance", "maturity"], trait: "positive" },
    deadTree: { meanings: ["endings", "decay"], trait: "negative" },
    rose: { meanings: ["love"], trait: "positive" },
    roseWithThorns: { meanings: ["love with challenges"], trait: "neutral" },
    eyes: { meanings: ["awareness", "perception"], trait: "neutral" },
    road: { meanings: ["freedom"], trait: "positive" },
    flowerOpen: { meanings: ["openness", "blossoming"], trait: "positive" },
    flowerClosed: { meanings: ["protection", "potential"], trait: "neutral" },
    scales: { meanings: ["balance"], trait: "positive" },
    scalesImbalance: { meanings: ["imbalance"], trait: "negative" },
    closedHand: { meanings: ["resistance"], trait: "negative" },
    tear: { meanings: ["grief", "sadness"], trait: "negative" },
    oliveBranch: { meanings: ["peace", "reconciliation"], trait: "positive" },
    butterfly: { meanings: ["transformation", "change"], trait: "positive" },
    openHand: { meanings: ["faith", "trust"], trait: "positive" },
    key: { meanings: ["security", "restriction"], trait: "neutral" }
};

const backgroundElements = {
    sky: {
        night: "a long-term journey",
        day: "a short-term phase"
    },
    moonPhases: {
        new: "new beginnings",
        wax: "building momentum",
        full: "culmination of efforts",
        wane: "letting go"
    },
    sunPositions: {
        sunrise: "new opportunities",
        noon: "maximum energy",
        sunset: "bringing things to a close"
    },
    clouds: {
        clear: "clarity",
        confusion: "uncertainty and confusion",
        storms: "intense turmoil"
    }
};

const borderElements = {
    colors: {
        red: "take action",
        blue: "seek wisdom",
        green: "embrace growth",
        yellow: "stay optimistic",
        purple: "explore spirituality",
        pink: "show compassion",
        turquoise: "communicate clearly",
        orange: "be creative"
    },
    flowers: {
        open: "an open heart and opportunities",
        closed: "protection and introspection"
    }
};

function generateReading(border, flower, sky, phase, clouds, architecture, symbol) {
    const symbolData = symbols[symbol];
    const symbolMeaning = getRandomElement(symbolData.meanings);
    const skyMeanings = ["a fleeting moment", "a brief encounter", "a passing phase"];
    const longTermMeanings = ["a lasting journey", "a prolonged path", "an enduring quest"];
    const skyMeaning = getRandomElement(sky === "night" ? longTermMeanings : skyMeanings);
    const phaseMeaning = sky === "night" ? backgroundElements.moonPhases[phase] : backgroundElements.sunPositions[phase];
    const cloudMeaning = backgroundElements.clouds[clouds];
    const borderMeaning = borderElements.colors[border];
    const flowerMeaning = borderElements.flowers[flower];
    const architectureMeanings = {
        internal: ["yourself", "your inner world", "your core being"],
        external: ["the world around you", "external influences", "your surroundings"],
        relationship: ["the balance between your inner and outer worlds", "harmony between yourself and others", "the connection between your heart and the environment"]
    };
    const architectureMeaning = getRandomElement(architectureMeanings[architecture]);

    let reading = "";

    if (clouds === "clear") {
        if (phase === "new") {
            reading += `Embrace new beginnings as the new phase of the moon marks the start of ${skyMeaning} towards ${symbolMeaning}. `;
        } else if (phase === "wax") {
            reading += `Begin your journey with confidence as the waxing phase of the moon illuminates ${skyMeaning} towards ${symbolMeaning}. `;
        } else {
            reading += `Reflect on what you’ve learned as the ${phase} phase of the moon illuminates the culmination of ${skyMeaning} towards ${symbolMeaning}. `;
        }
    } else if (clouds === "confusion") {
        reading += `Reflect on what you’ve learned as the ${phase} phase of the moon illuminates the challenges of ${skyMeaning} towards ${symbolMeaning}. Currently, there is ${cloudMeaning}, making it challenging to see the overcoming of challenges clearly. `;
    } else if (clouds === "storms") {
        reading += `This indicates ${skyMeaning} phase of ${cloudMeaning} towards ${symbolMeaning}. The card is dominated by ${cloudMeaning}, overshadowing the usual guidance from the ${sky === "night" ? "moon phases" : "sun positions"}. `;
    }

    reading += `By trusting ${architectureMeaning}, you will open yourself up to ${flowerMeaning}. ${borderMeaning}.`;

    return reading;
}
