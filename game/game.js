export class Game {
    htmlDivId;
    #rootDiv;
    #money = 0;
    #resources = {};
    #miners = {};
    constructor(htmlDivId) {
        this.htmlDivId = htmlDivId;
        this.#rootDiv = document.getElementById(htmlDivId);
        console.log(this); // Debug
    }
    run() {
        const money = document.createElement("div");
        money.textContent = "$";
        money.id = "money";
        this.#rootDiv.append(money);
        this.#addResource("stone");
        this.#addResource("copper");
        // Update
        console.log(1);
        setInterval(() => {
            console.log(2);
            for (const resourceName in this.#miners) {
                this.#money += this.#miners[resourceName];
            }
        }, 1000);
        this.#render(1);
    }
    #render(a) {
        const _this = this;
        console.log(3);
        requestAnimationFrame(() => {
            console.log(4);
            document.getElementById("money").textContent = `$${_this.#money}`;
            document.getElementById("miners-stone").textContent = `$${_this.#miners["stone"]}/s`;
            console.log(arguments.length, "xd");
            requestAnimationFrame(this.#render);
        });
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
