const dataLimit = 6;
const loadData = async (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
}

const displayData = (tools, dataLimit) => {
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
                        <p><i class="fa-solid fa-calendar-days mr-1 text-secondary"></i> ${tool.published_in}</p>
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
    // console.log(data.features[1].feature_name);
    const modalCards = document.getElementById('modal-cards-container');
    const cardOne = document.createElement('div');
    cardOne.classList.add('card', 'w-96', 'bg-bgPrimary', 'shadow-xl', 'border', 'border-[#EB5757]');
    cardOne.innerHTML = `
    <!-- card 1 -->
    <div class="px-7 py-7">
        <h2 class="card-title">${data.description}</h2>
    </div>

    <div class="flex gap-3 px-7 text-center">
        <div class="bg-white px-4 py-3 text-green-600 font-semibold rounded-xl">
            <p>$10 / month Basic</p>
        </div>
        <div class="bg-white px-4 py-3 text-orange-600 font-semibold rounded-xl">
            <p>$10 / month Basic</p>
        </div>
        <div class="bg-white px-4 py-3 text-rose-600 font-semibold rounded-xl">
            <p>$10 / month Basic</p>
        </div>
    </div>

    <div class="card-body p-7 text-left">
        <div class="flex justify-between gap-5">
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
    modalIntegration(data.integrations, data.id);
    modalFeature(data.features, data.id);

    const cardTwo = document.createElement('div');
    cardTwo.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'border');
    cardTwo.innerHTML = `
    <!-- card 2 -->
    <figure class="px-7 pt-7">
        <img src="${data.image_link[0]}" alt="picture" class="rounded-xl" />
    </figure>
    <div class="card-body p-7 items-center text-center">
        <h2 class="card-title">${data.input_output_examples ? data.input_output_examples[0].input : 'Can you give any example?'}</h2>
        <p>${data.input_output_examples ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
    </div>
    `;
    modalCards.appendChild(cardTwo);
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

const emptyModalContainer = () => {
    const modalCards = document.getElementById('modal-cards-container');
    modalCards.innerHTML = '';
}

const processModal = (id) => {
    emptyModalContainer();
    loadDetailsModal(id);
}

processData(dataLimit);