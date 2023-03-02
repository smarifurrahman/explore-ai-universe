const dataLimit = 6;
const loadData = async (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
}

const displayData = (tools, dataLimit) => {
    // console.log(tools.length);
    const cardsContainer = document.getElementById('cards-container');
    const btnShowMore = document.getElementById('btn-see-more');
    if (dataLimit && dataLimit < tools.length) {
        tools = tools.slice(0, dataLimit);
        btnShowMore.classList.remove('hidden');
    }
    else {
        btnShowMore.classList.add('hidden');
    }
    tools.forEach(tool => {
        const card = document.createElement('div');
        card.innerHTML = `
        <!-- card -->
        <div class="card w-96 bg-base-100 shadow-xl border h-full">
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
                        <h2 class="card-title mb-1.5">${tool.name}</h2>
                        <p><i class="fa-solid fa-calendar-days mr-1 text-secondary"></i> ${tool.published_in}</p>
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
    progressBar(false);
}

const showFeatures = (features, id) => {
    const FeaturesDiv = document.getElementById(`feature-${id}`);
    features.forEach((feature, index) => {
        const p = document.createElement('p');
        p.innerText = `${index + 1}. ${feature}`;
        FeaturesDiv.appendChild(p);
    });
}

const emptyDataContainer = () => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
}

const progressBar = (isLoading) => {
    const processBar = document.getElementById('progress-bar');
    if (isLoading) {
        processBar.classList.remove('hidden');
    }
    else {
        processBar.classList.add('hidden');
    }
}

const processData = (dataLimit = false) => {
    emptyDataContainer();
    progressBar(true);
    loadData(dataLimit);
}

document.getElementById('btn-see-more').addEventListener('click', function () {
    processData();
});

processData(dataLimit);