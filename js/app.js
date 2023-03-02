const loadData = async () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools);
}

const displayData = (tools) => {
    // console.log(tools);
    const cardsContainer = document.getElementById('cards-container');
    tools.forEach(tool => {
        const card = document.createElement('div');
        card.innerHTML = `
        <!-- card -->
        <div class="card w-96 bg-base-100 shadow-xl border">
            <figure class="px-7 pt-7">
                <img src="${tool.image}" alt="Shoes"
                    class="rounded-xl" />
            </figure>
            <div class="card-body p-7 items-start text-left">
                <h2 class="card-title">Features</h2>
                <div id="feature-${tool.id}" class="w-full mb-2">

                </div>
                <hr class="w-full">
                <div class="card-actions w-full flex justify-between items-center mt-2">
                    <div>
                        <h2 class="card-title mb-1.5">ChatGPT</h2>
                        <p><i class="fa-solid fa-calendar-days mr-1 text-secondary"></i> 11/01/2022</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-arrow-right p-4 rounded-full text-primary bg-bgPrimary"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
        cardsContainer.appendChild(card);
        showFeatures(tool.features, tool.id);
    });
}

const showFeatures = (features, id) => {
    const FeaturesDiv = document.getElementById(`feature-${id}`);
    features.forEach((feature, index) => {
        const p = document.createElement('p');
        p.innerText = `${index + 1}. ${feature}`;
        FeaturesDiv.appendChild(p);
    });
}

loadData();