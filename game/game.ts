export class Game {
    #rootDiv: HTMLDivElement;
    #money = 0;
    #resources = {};
    #miners = {};

    constructor(public htmlDivId: string) {
        this.#rootDiv = <HTMLDivElement>document.getElementById(htmlDivId);

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
            document.getElementById("money").textContent = `$${_this.#money}`
            document.getElementById("miners-stone").textContent = `$${_this.#miners["stone"]}/s`;
            console.log(arguments.length, "xd");
            requestAnimationFrame(this.#render);
        });
    }

    #addResource(resourceName: string) {
        this.#resources[resourceName] = 0;
        this.#miners[resourceName] = 0;

        const miners: HTMLSpanElement = document.createElement("span");
        miners.textContent = "$/s";
        miners.id = `miners-${resourceName}`;
        
        const buy: HTMLButtonElement = document.createElement("button");
        buy.textContent = `Buy ${resourceName} miner`;
        buy.id = `buyminer-${resourceName}`;
        
        this.#rootDiv.appendChild(miners);
        this.#rootDiv.appendChild(buy);
        this.#rootDiv.appendChild(document.createElement("br"));

        buy.addEventListener("click", (event: PointerEvent) => this.#onClickBuy(event, this.#miners));
    }

    #onClickBuy(event: PointerEvent, miners: {}) {
        const button = <HTMLButtonElement>event.target;
        if (button.id.substring(0, 8) === "buyminer") {
            this.#miners[button.id.substring(9)] += 1;
        }
    }
}