const loadTools = async (dataLimit) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayTools(data.data.tools, dataLimit);
}

const displayTools = (tools, dataLimit) => {

    // console.log(tools);
    const toolsContainer = document.getElementById('tools-container');

    const showAll = document.getElementById('show-more');
    // display 6 tools
    if (dataLimit && tools.length > 6) {
        tools = tools.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    tools.forEach(tool => {
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
        <div class="card">
            <img src="${tool.image}"class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold">Features</h5>
                <p class="card-text">1. ${tool.features[0]}</p>
                <p class="card-text">2. ${tool.features[1]}</p>
                <p class="card-text">3. ${tool.features[2]}</p>
                <p> 
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="text-muted fw-bold">${tool.name} </h5>
                    <div class= "d-flex">
                    <i class="fa-regular fa-calendar-days"></i>
                    <h6 class="text-muted ms-2">${tool.published_in} </h6>
                    </div>

                </div>
                <div>
                <button onclick="loadToolDetails('${tool.id}')" type="button" class="fa-solid fa-arrow-right bg-danger bg-opacity-25 p-3 rounded-circle border-0 text-danger" data-bs-toggle="modal" data-bs-target="#toolDetailsModal"></button>  
                </div>
                
            </div>
        </div>
        `
        toolsContainer.appendChild(toolDiv);
        toggleSpinner(false);
    });
}

// loading function........................
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// Show More button click
document.getElementById('btn-show-all').addEventListener('click', function () {
    // toggleSpinner(true);
    loadTools();
})

const loadToolDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayToolDetails(data.data);
}

const displayToolDetails = tool => {
    console.log(tool);
    const description = document.getElementById('description');
    description.innerText = tool.description;
    const modImage = document.getElementById('modalImage');
    modImage.innerHTML = `<img src="${tool.image_link[0]}" class="card-img-top" alt="...">`
    // const toolDetails = document.getElementById('tool-details');
    // console.log(tool.mainFeatures.sensors[0]);
    // toolDetails.innerHTML = `
    //     <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    //     <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
    //     <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    //     <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    // `
}



loadTools(6);