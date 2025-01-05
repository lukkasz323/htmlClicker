export class Game {
    htmlDivId;
    #rootDiv;
    #startDate;
    #lastProcessDate;
    #processDateDelta;
    #money = 0;
    #resources = {};
    #miners = {};
    constructor(htmlDivId) {
        this.htmlDivId = htmlDivId;
        this.#rootDiv = document.getElementById(htmlDivId);
        console.log(this); // Debug
    }
    run() {
        this.#startDate = Date.now();
        this.#lastProcessDate = this.#startDate;
        const money = document.createElement("div");
        money.textContent = "$";
        money.id = "money";
        this.#rootDiv.append(money);
        this.#addResource("stone");
        this.#addResource("copper");
        setInterval(() => this.#update());
        requestAnimationFrame(() => this.#render());
    }
    #process() {
        for (const resourceName in this.#miners) {
            this.#money += this.#miners[resourceName] * 0.001;
        }
    }
    #update() {
        const now = Date.now();
        this.#processDateDelta = now - this.#lastProcessDate;
        this.#lastProcessDate = now;
        for (let i = 0; i < this.#processDateDelta; i++) {
            this.#process();
        }
    }
    #render() {
        document.getElementById("money").textContent = `$${this.#money.toFixed(2)} Time: ${(Date.now() - this.#startDate) / 1000}`;
        for (const resourceName in this.#miners) {
            document.getElementById(`miners-${resourceName}`).textContent = `$${this.#miners[resourceName]}/s`;
        }
        requestAnimationFrame(() => this.#render());
    }
    #addResource(resourceName) {
        this.#resources[resourceName] = 0;
        this.#miners[resourceName] = 0;
        const miners = document.createElement("span");
        miners.textContent = "$/s";
        miners.id = `miners-${resourceName}`;
        const buy = document.createElement("button");
        buy.textContent = `Buy ${resourceName} miner`;
        buy.id = `buyminer-${resourceName}`;
        this.#rootDiv.appendChild(miners);
        this.#rootDiv.appendChild(buy);
        this.#rootDiv.appendChild(document.createElement("br"));
        buy.addEventListener("click", (event) => this.#onClickBuy(event, this.#miners));
    }
    #onClickBuy(event, miners) {
        const button = event.target;
        if (button.id.substring(0, 8) === "buyminer") {
            this.#miners[button.id.substring(9)] += 1;
        }
    }
}
