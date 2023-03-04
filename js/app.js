const loadData = async (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
}

let lastDisplayedTools;
let lastDataLimit;

const displayData = (tools, dataLimit) => {
    lastDisplayedTools = tools;
    lastDataLimit = dataLimit;
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
        const pubDate = new Date(tool.published_in);
        const formattedDate = pubDate.toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'});
        const card = document.createElement('div');
        card.innerHTML = `
        <!-- card -->
        <div class="card w-80 sm:w-96 bg-base-100 shadow-xl border h-full">
            <figure class="px-7 pt-7">
                <img src="${tool.image}" alt="${tool.name}"
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
                        <p><i class="fa-solid fa-calendar-days mr-1 text-secondary"></i> ${formattedDate}</p>
                    </div>
                    <div>
                        <label onclick="processModal('${tool.id}')" for="my-modal-5"><i class="fa-solid fa-arrow-right p-4 rounded-full text-primary bg-bgPrimary"></i></label>
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

const sorting = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    if (dateA > dateB) {
        return 1;
    }
    else if (dateA < dateB) {
        return -1;
    }
    else {
        return 0;
    }
}

document.getElementById('btn-sort-by').addEventListener('click', function () {
    emptyDataContainer();
    progressBar(true);
    const sortedData = lastDisplayedTools.sort(sorting);
    if (lastDataLimit) {
        displayData(sortedData, lastDataLimit);
    }
    else {
        displayData(sortedData);
    }
});

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

// show data in modal
const loadDetailsModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetailsModal(data.data);
}

const displayDetailsModal = (data) => {
    const modalCards = document.getElementById('modal-cards-container');
    const cardOne = document.createElement('div');
    cardOne.classList.add('card', 'mx-auto', 'w-72', 'sm:w-[450px]', 'bg-bgPrimary', 'shadow-xl', 'border', 'border-[#EB5757]');
    cardOne.innerHTML = `
    <!-- card 1 -->
    <div class="px-7 py-7">
        <h2 class="card-title text-center sm:text-left">${data.description}</h2>
    </div>

    <div id="price-list-${data.id}" class="sm:flex gap-3 px-7 text-center">
        <div class="bg-white px-4 py-3 text-green-600 font-semibold rounded-xl flex justify-center items-center mb-4 sm:mb-0">
            <p>${data.pricing ? data.pricing[0].price : 'Free Of Cost/ '} Basic</p>
        </div>
        <div class="bg-white px-4 py-3 text-orange-600 font-semibold rounded-xl flex justify-center items-center mb-4 sm:mb-0">
            <p>${data.pricing ? data.pricing[1].price : 'Free Of Cost/ '} Pro</p>
        </div>
        <div class="bg-white px-4 py-3 text-rose-600 font-semibold rounded-xl flex justify-center items-center mb-4 sm:mb-0">
            <p>${data.pricing ? data.pricing[2].price : 'Free Of Cost/ '} Enterprise</p>
        </div>
    </div>

    <div class="card-body p-7 text-left">
        <div class="sm:flex justify-between gap-5">
            <div class="w-full">
                <h2 class="card-title mb-2">Features</h2>
                <ul id="ul-features-${data.id}" class="list-disc text-secondary">
                    
                </ul>
            </div>
            <div class="w-full">
                <h2 class="card-title mb-2">Integrations</h2>
                <ul id="integrations-${data.id}" class="list-disc text-secondary">
                    
                </ul>
            </div>
        </div>
    </div>
    `;
    modalCards.appendChild(cardOne);
    modalFeature(data.features, data.id);
    modalIntegration(data.integrations, data.id);

    const cardTwo = document.createElement('div');
    cardTwo.classList.add('card', 'mx-auto', 'w-72', 'sm:w-[450px]', 'bg-base-100', 'shadow-xl', 'border');
    cardTwo.innerHTML = `
    <!-- card 2 -->
    <figure class="px-7 pt-7 relative">
        <img src="${data.image_link[0]}" alt="picture" class="rounded-xl" />
        <div id="accuracy-badge-${data.id}">
            
        </div>
        </figure>
    <div class="card-body p-7 items-center text-center">
        <h2 class="card-title">${data.input_output_examples ? data.input_output_examples[0].input : 'Can you give any example?'}</h2>
        <p>${data.input_output_examples ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
    </div>
    `;
    modalCards.appendChild(cardTwo);
    displayAccuracy(data.accuracy, data.id);
}

const modalFeature = (features, id) => {
    const ul = document.getElementById(`ul-features-${id}`);
    if (features) {
        for (const key in features) {
            const li = document.createElement('li');
            li.classList.add('ml-5');
            li.innerText = features[key].feature_name;
            ul.appendChild(li);
        }
    }
    else {
        ul.innerHTML = `<p>No Data Found</p>`;
    }
}

const modalIntegration = (integrations, id) => {
    const ul = document.getElementById(`integrations-${id}`);
    if (integrations) {
        integrations.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('ml-5');
            li.innerText = item;
            ul.appendChild(li);
        });
    }
    else {
        ul.innerHTML = `<p>No Data Found</p>`;
    }
}

const displayAccuracy = (accuracy, id) => {
    if (accuracy.score) {
        const badgeContainer = document.getElementById(`accuracy-badge-${id}`);
        const accuracyBadge = document.createElement('div');
        accuracyBadge.classList.add('badge', 'bg-primary', 'border-none', 'absolute', 'top-9', 'right-9', 'py-3');
        accuracyBadge.innerText = `${accuracy.score * 100}% accuracy`;
        badgeContainer.appendChild(accuracyBadge);
    }
}

const emptyModalContainer = () => {
    const modalCards = document.getElementById('modal-cards-container');
    modalCards.innerHTML = '';
}

const processModal = (id) => {
    emptyModalContainer();
    loadDetailsModal(id);
}

processData(6);