
export function getPillarFrequencies(tasks) {
    return tasks.reduce((acc, t) => {
        if (t.pillar) {
            const name = t.pillar.trim().toLowerCase();
            acc[name] = (acc[name] || 0) + 1;
        }
        return acc;
    }, {});
}

//Calculate unique count from the keys of our tally
export function getActivePillarsCount(tasks) {
    return Object.keys(getPillarFrequencies(tasks)).length;
}