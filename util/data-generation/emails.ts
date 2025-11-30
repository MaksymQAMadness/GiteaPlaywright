//create method for unique mail generation based on maktre@qamadness.com
export function generateUniqueEmail(): string {
    return `maktre+${Date.now()}@qamadness.com`;
}